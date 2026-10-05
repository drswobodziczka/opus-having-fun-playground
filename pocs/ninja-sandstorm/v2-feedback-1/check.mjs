// Harness v2: story + visibility assertions, twist sheet (setup/moment/payoff), story sheet,
// optional MP4 with audio rendered offline in the page (OfflineAudioContext -> WAV -> ffmpeg).
// Usage: node check.mjs [--mp4] [--fps=30] [--tc]   (--tc burns scene + second into sheets and MP4, for review)
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const html = path.join(here, 'storm.html');
const args = process.argv.slice(2);
const wantMp4 = args.includes('--mp4');
const fps = Number((args.find(a => a.startsWith('--fps=')) || '--fps=30').split('=')[1]);

function findChrome() {
  const root = path.join(os.homedir(), '.cache', 'puppeteer', 'chrome-headless-shell');
  const vers = fs.readdirSync(root).filter(d => !d.startsWith('.')).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  for (const v of vers) {
    const dir = fs.readdirSync(path.join(root, v)).find(d => d.startsWith('chrome-headless-shell'));
    const exe = dir && path.join(root, v, dir, 'chrome-headless-shell');
    if (exe && fs.existsSync(exe)) return exe;
  }
  throw new Error('No chrome-headless-shell in ~/.cache/puppeteer');
}

const t0 = Date.now();
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: 'shell', args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => m.type() === 'error' && errors.push(m.text()));
await page.goto('file://' + html + '?t=0', { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
const wantTC = args.includes('--tc');
await page.evaluate(v => window.anim.setTimecode(v), wantTC);

const ev = await page.evaluate(() => { window.anim.seek(59.9); return window.anim.events(); });
const first = pred => ev.find(pred);
const within = (e, a, b) => !!e && e.t >= a && e.t <= b;
const count = (pred, a, b) => ev.filter(e => pred(e) && e.t >= a && e.t <= b).length;
const strikes = e => ['hit', 'block'].includes(e.type) || e.type === 'clash';

// twist triplets: [setup, moment, payoff]
// each frame: [time, mode] — 'both' = both full bodies in frame, 'key' = heads + striking hands, 'A' = ALAMANDRO key points only (fist close-up)
const TWISTS = [
  ['T1 chokehold', [[11.15, 'both'], [12.4, 'key'], [14.25, 'both']]],
  ['T2 monsoon', [[21.05, 'key'], [23.3, 'both'], [24.8, 'both']]],
  ['T3 throw', [[39.4, 'both'], [39.8, 'both'], [40.95, 'both']]],
  ['T4 heart', [[50.6, 'A'], [52.3, 'key'], [55.3, 'both']]]
];
const vis = await page.evaluate(tw => tw.map(([name, fr]) => [name, fr.map(([t, mode]) => { window.anim.seek(t); return { t, mode, ...window.anim.view() }; })]), TWISTS);

const checks = [
  ['Intro then fight scene at 3 s', within(first(e => e.type === 'scene' && e.name === 'fight'), 2.9, 3.1)],
  ['Air clash at ~5.6 s', within(first(e => e.type === 'clash'), 5.5, 5.8)],
  ['S3: high kick misses (dodge) at 8.6-9.0 s', within(first(e => e.type === 'miss' && e.by === 'A'), 8.6, 9.0)],
  ['T1: chokehold grab at 11.6-12.2 s', within(first(e => e.type === 'grab' && e.move === 'choke'), 11.6, 12.2)],
  ['T1: choke drains HP (>= 4 chips)', count(e => e.type === 'chip' && e.move === 'choke', 11, 15) >= 4],
  ['T1: elbow breaks the choke at 14-14.5 s', within(first(e => e.type === 'choke-break'), 14, 14.5)],
  ['T2: parry at 21.0-21.15 s, then catch', (() => { const p = first(e => e.type === 'parry'), c = first(e => e.type === 'catch'); return within(p, 21.0, 21.15) && c && c.t > p.t && c.t < 21.4; })()],
  ['T2: BLACK MONSOON lands 12 hits', count(e => e.by === 'A' && e.move === 'monsoon' && ['hit', 'ko'].includes(e.type), 22.5, 24.5) >= 12],
  ['T2: K.O. of BISHUKIJ at 24-24.5 s', within(first(e => e.type === 'ko' && e.to === 'B'), 24, 24.5)],
  ['R1 winner = ALAMANDRO', first(e => e.type === 'roundwin')?.who === 'A'],
  ['Style switch to (b) at 30 s', within(first(e => e.type === 'style' && e.style === 'b'), 29.9, 30.1)],
  ['T3: throw grab at 39.2-39.5 s', within(first(e => e.type === 'grab' && e.move === 'throw'), 39.2, 39.5)],
  ['T3: release at 39.9-40.0 s, landing 40.45-40.6 s, dmg >= 40', (() => { const r = first(e => e.type === 'release'), e = first(e => e.type === 'throw-impact'), h = first(e => e.type === 'impact'); return within(r, 39.9, 40.0) && within(e, 40.45, 40.6) && h && h.dmg >= 40; })()],
  ['T3: skid stops at 41.3-41.6 s', within(first(e => e.type === 'skid-stop'), 41.3, 41.6)],
  ['Counter: 3 blink strikes', count(e => e.type === 'blink', 44.9, 46.6) === 3],
  ['BISHUKIJ stunned (dizzy) by 47.5 s', within(first(e => e.type === 'stun'), 46.9, 47.5)],
  ['FINISH HIM before FATALITY', (() => { const a = first(e => e.text === 'FINISH HIM!'), b = first(e => e.text === 'FATALITY'); return a && b && a.t < b.t; })()],
  ['T4: heart rip contact at 51.2-51.4 s', within(first(e => e.type === 'heart'), 51.2, 51.4)],
  ['T4: BISHUKIJ falls at 53.6-53.8 s', within(first(e => e.type === 'fall'), 53.6, 53.8)],
  ['S13: hero landing at 56.55-56.7 s', within(first(e => e.type === 'winpose'), 56.55, 56.7)],
  ['Winner banner ALAMANDRO WINS', !!first(e => e.text === 'ALAMANDRO WINS')],
  ['Dynamics: >= 36 strikes in the three exchanges', count(strikes, 5, 11) + count(strikes, 15, 21) + count(strikes, 32.5, 39) >= 36],
  ...vis.flatMap(([name, frames]) => frames.map((f, i) => {
    const ok = f.mode === 'both' ? f.B.inFrame && f.A.inFrame : f.mode === 'key' ? f.B.keyIn && f.A.keyIn : f.A.keyIn;
    return [`Visible: ${name} ${['setup', 'moment', 'payoff'][i]} @${f.t}s (${f.mode})`, ok];
  })),
  ['No console/page errors', errors.length === 0]
];

// trace
const trace = await page.evaluate(() => { const out = []; for (let t = 0; t < 60; t += 0.5) { window.anim.seek(t); out.push(window.anim.state()); } return out; });
fs.writeFileSync(path.join(here, 'trace.txt'), trace.map(s => `${s.T.toFixed(1).padStart(5)} ${s.scene.padEnd(5)} ${s.style} cam ${s.cam.x},z${s.cam.zoom},r${s.cam.rot} | B ${s.B.x},${s.B.h} hp${s.B.hp} ${s.B.act.padEnd(9)} | A ${s.A.x},${s.A.h} hp${s.A.hp} ${s.A.act}`).join('\n') + '\n');
fs.writeFileSync(path.join(here, 'events.json'), JSON.stringify(ev, null, 1));

async function sheet(file, moments, cols = 4) {
  const data = await page.evaluate(async (moments, cols) => {
    const src = document.getElementById('screen'), w = 480, h = 270, pad = 4, lh = 14;
    const c = document.createElement('canvas'); c.width = cols * (w + pad); c.height = Math.ceil(moments.length / cols) * (h + lh + pad);
    const x = c.getContext('2d'); x.fillStyle = '#333'; x.fillRect(0, 0, c.width, c.height);
    moments.forEach(([t, name], i) => {
      window.anim.seek(t);
      const px = (i % cols) * (w + pad), py = Math.floor(i / cols) * (h + lh + pad);
      x.drawImage(src, px, py + lh); x.fillStyle = '#fff'; x.font = '11px monospace'; x.fillText(`t=${t}  ${name}`, px + 2, py + 11);
    });
    return c.toDataURL('image/png');
  }, moments, cols);
  fs.writeFileSync(path.join(here, file), Buffer.from(data.split(',')[1], 'base64'));
}
await sheet('sheet-twists.png', TWISTS.flatMap(([n, fr]) => fr.map(([t], i) => [t, `${n} · ${['setup', 'moment', 'payoff'][i]}`])), 3);
await sheet('sheet-story.png', [[1.6, 'intro'], [4.4, 'fight'], [5.62, 'air clash'], [7.5, 'exchange'], [9.7, 'jump kick'], [17.0, 'exchange 2'],
  [25.2, 'K.O.'], [27.6, 'sand wall'], [29.1, 'ink blot'], [30.5, 'style b'], [33.5, 'exchange 3'], [37.4, 'lightning'],
  [44.3, 'laugh'], [45.4, 'blink'], [48.3, 'dizzy'], [57.9, 'end']]);

await page.setViewport({ width: 400, height: 900 });
await page.evaluate(() => window.anim.seek(40.3));
await page.screenshot({ path: path.join(here, 'phone.png'), fullPage: true });

let mp4 = null, audioInfo = '';
if (wantMp4) {
  const { wav, cues } = await page.evaluate(async () => await window.anim.renderAudio(32000));
  const wavPath = path.join(here, 'audio.wav'); fs.writeFileSync(wavPath, Buffer.from(wav, 'base64'));
  audioInfo = ` · audio cues ${cues}`;
  const frames = path.join(here, 'frames'); fs.rmSync(frames, { recursive: true, force: true }); fs.mkdirSync(frames);
  await page.evaluate(() => window.anim.seek(0));
  const total = Math.round(60 * fps), per = Math.round(60 / fps);
  for (let i = 0; i < total; i++) {
    const data = await page.evaluate(n => { window.anim.step(n); return document.getElementById('screen').toDataURL('image/png'); }, i === 0 ? 0 : per);
    fs.writeFileSync(path.join(frames, `f${String(i).padStart(5, '0')}.png`), Buffer.from(data.split(',')[1], 'base64'));
  }
  mp4 = path.join(here, 'storm.mp4');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(frames, 'f%05d.png'), '-i', wavPath,
    '-vf', 'scale=iw*3:ih*3:flags=neighbor', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-c:a', 'aac', '-b:a', '160k', '-shortest', mp4]);
  fs.rmSync(frames, { recursive: true, force: true }); fs.rmSync(wavPath);
}

await browser.close();
let fail = 0;
for (const [name, ok] of checks) { console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`); if (!ok) fail++; }
for (const [name, frames] of vis) for (const f of frames) if (!(f.mode === 'A' ? f.A.keyIn : f.B.keyIn && f.A.keyIn)) console.log(`  ${name} @${f.t}: B ${JSON.stringify(f.B.box)} A ${JSON.stringify(f.A.box)}`);
if (errors.length) console.log('errors:', errors.slice(0, 5));
console.log(`events: ${ev.length} · ${checks.length - fail}/${checks.length} checks passed · ${((Date.now() - t0) / 1000).toFixed(1)} s${mp4 ? ' · mp4: ' + path.basename(mp4) : ''}${audioInfo}`);
process.exitCode = fail ? 1 : 0;
