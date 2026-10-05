// Harness v1: event-log assertions, state trace, story contact sheet, optional MP4 (ffmpeg).
// Usage: node check.mjs [--mp4] [--fps=30]
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const page_ = path.join(here, 'paper-cuts.html');
const args = process.argv.slice(2);
const wantMp4 = args.includes('--mp4');
const fps = Number((args.find(a => a.startsWith('--fps=')) || '--fps=30').split('=')[1]);

function findChrome() {
  const root = path.join(os.homedir(), '.cache', 'puppeteer', 'chrome-headless-shell');
  const vers = fs.readdirSync(root).filter(d => !d.startsWith('.')).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  for (const v of vers.reverse()) {
    const dir = fs.readdirSync(path.join(root, v)).find(d => d.startsWith('chrome-headless-shell'));
    const exe = dir && path.join(root, v, dir, 'chrome-headless-shell');
    if (exe && fs.existsSync(exe)) return exe;
  }
  throw new Error('No chrome-headless-shell in ~/.cache/puppeteer (npx @puppeteer/browsers install chrome-headless-shell@stable)');
}

const t0 = Date.now();
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: 'shell' });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => m.type() === 'error' && errors.push(m.text()));
await page.goto('file://' + page_ + '?t=0', { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);

// ---- event log + assertions ----
const ev = await page.evaluate(() => { window.anim.seek(119.9); return window.anim.events(); });
const first = (pred) => ev.find(pred);
const within = (e, a, b) => !!e && e.t >= a && e.t <= b;
const checks = [
  ['R1: GEM loses a hand (erase) at 32-34 s', within(first(e => e.type === 'erase'), 32, 34)],
  ['R1: HB K.O.s GEM at 43-44.5 s', within(first(e => e.type === 'ko' && e.by === 'HB' && e.to === 'GEM'), 43, 44.5)],
  ['R1 winner = HB', first(e => e.type === 'roundwin')?.who === 'HB'],
  ['R2: suplex grab before the camera roll', (() => { const g = first(e => e.move === 'suplex'), r = first(e => e.move === 'roll'); return g && r && g.t < r.t; })()],
  ['R2: camera roll at 63.5-64.5 s', within(first(e => e.move === 'roll'), 63.5, 64.5)],
  ['R2: HB tip SNAP at 70.5-71.5 s', within(first(e => e.type === 'snap'), 70.5, 71.5)],
  ['R2: GEM K.O.s HB at 85.5-87 s', within(first(e => e.type === 'ko' && e.by === 'GEM' && e.t > 80), 85.5, 87)],
  ['R2 winner = GEM', ev.filter(e => e.type === 'roundwin')[1]?.who === 'GEM'],
  ['R3: HB becomes SUPER SHARP at 94-95.5 s', within(first(e => e.type === 'sharpen'), 94, 95.5)],
  ['R3: HB super lands 8 chip hits', ev.filter(e => e.type === 'chip' && e.by === 'HB' && e.t > 95.5 && e.t < 98.5).length === 8],
  ['R3: camera orbit at 103.8-104.2 s', within(first(e => e.move === 'orbit'), 103.8, 104.2)],
  ['R3: HB lands in the cup at 110-111 s', within(first(e => e.type === 'cup'), 110, 111)],
  ['R3: double K.O. (both K.O. after 109 s)', ev.some(e => e.type === 'ko' && e.to === 'HB' && e.t > 109) && ev.some(e => e.type === 'ko' && e.to === 'GEM' && e.t > 109)],
  ['Banner DOUBLE K.O. then DRAW GAME', (() => { const a = first(e => e.text === 'DOUBLE K.O.'), b = first(e => e.text === 'DRAW GAME'); return a && b && a.t < b.t; })()],
  ['Every landed hit within 90 px', ev.filter(e => ['hit', 'chip'].includes(e.type)).every(e => e.dist <= 90)],
  ['No console/page errors', errors.length === 0]
];
const far = ev.filter(e => ['hit', 'chip'].includes(e.type) && e.dist > 90);

// ---- state trace (1 s) ----
const trace = await page.evaluate(() => {
  const out = [];
  for (let t = 0; t < 120; t += 1) { window.anim.seek(t); out.push(window.anim.state()); }
  return out;
});
const fmt = s => `${s.T.toFixed(1).padStart(5)} ${s.scene.padEnd(5)} cam ${String(s.cam.x).padStart(3)} r${s.cam.roll} o${s.cam.orbit} | GEM ${String(s.GEM.x).padStart(3)},${String(s.GEM.y).padStart(2)} hp${String(s.GEM.hp).padStart(3)} ${s.GEM.act.padEnd(9)} | HB ${String(s.HB.x).padStart(3)},${String(s.HB.y).padStart(2)} hp${String(s.HB.hp).padStart(3)} ${s.HB.act.padEnd(9)}${s.HB.blunt ? ' blunt' : ''}${s.HB.sharp ? ' SHARP' : ''}`;
fs.writeFileSync(path.join(here, 'trace.txt'), trace.map(fmt).join('\n') + '\n');
fs.writeFileSync(path.join(here, 'events.json'), JSON.stringify(ev, null, 1));

// ---- story contact sheet ----
const moments = [
  [3, 'title'], [8.5, 'vs'], [13.5, 'round 1'], [16.5, 'first slash'], [19.6, 'spring'], [23.8, 'lever'],
  [32.7, 'ERASE'], [36.35, 'combo'], [43.6, 'K.O.'], [46.9, 'regrow'], [55.6, 'lever R2'], [63.9, 'suplex'],
  [64.4, 'roll'], [65.2, 'slam'], [70.95, 'SNAP'], [72.0, 'panic'], [85.6, 'spin throw'], [93.8, 'sharpen'],
  [96.6, 'storm'], [104.5, 'orbit'], [107.3, 'unbend'], [108.3, 'wrap+stab'], [110.5, 'cup'], [114.5, 'draw']
];
const sheet = await page.evaluate(async (moments) => {
  const src = document.getElementById('screen'), cols = 4, w = 384, h = 224, pad = 4, lh = 14;
  const c = document.createElement('canvas');
  c.width = cols * (w + pad); c.height = Math.ceil(moments.length / cols) * (h + lh + pad);
  const x = c.getContext('2d'); x.fillStyle = '#333'; x.fillRect(0, 0, c.width, c.height); x.imageSmoothingEnabled = false;
  moments.forEach(([t, name], i) => {
    window.anim.seek(t);
    const px = (i % cols) * (w + pad), py = Math.floor(i / cols) * (h + lh + pad);
    x.drawImage(src, px, py + lh);
    x.fillStyle = '#fff'; x.font = '11px monospace'; x.fillText(`t=${t}  ${name}`, px + 2, py + 11);
  });
  return c.toDataURL('image/png');
}, moments);
fs.writeFileSync(path.join(here, 'sheet.png'), Buffer.from(sheet.split(',')[1], 'base64'));

// ---- phone-width page shot ----
await page.setViewport({ width: 400, height: 900 });
await page.evaluate(() => window.anim.seek(64.4));
await page.screenshot({ path: path.join(here, 'phone.png'), fullPage: true });

// ---- optional MP4 (silent) ----
let mp4 = null;
if (wantMp4) {
  const frames = path.join(here, 'frames');
  fs.rmSync(frames, { recursive: true, force: true }); fs.mkdirSync(frames);
  await page.evaluate(() => window.anim.seek(0));
  const total = Math.round(120 * fps), per = Math.round(60 / fps);
  for (let i = 0; i < total; i++) {
    const data = await page.evaluate(n => { window.anim.step(n); return document.getElementById('screen').toDataURL('image/png'); }, i === 0 ? 0 : per);
    fs.writeFileSync(path.join(frames, `f${String(i).padStart(5, '0')}.png`), Buffer.from(data.split(',')[1], 'base64'));
  }
  mp4 = path.join(here, 'paper-cuts.mp4');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(frames, 'f%05d.png'),
    '-vf', 'scale=iw*3:ih*3:flags=neighbor', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', mp4]);
  fs.rmSync(frames, { recursive: true, force: true });
}

await browser.close();
let fail = 0;
for (const [name, ok] of checks) { console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`); if (!ok) fail++; }
if (far.length) console.log('far hits:', far.map(e => `${e.t}s ${e.by}->${e.to} ${e.dist}px`).join(', '));
if (errors.length) console.log('errors:', errors);
console.log(`events: ${ev.length} · ${checks.length - fail}/${checks.length} checks passed · ${((Date.now() - t0) / 1000).toFixed(1)} s${mp4 ? ' · mp4: ' + path.basename(mp4) : ''}`);
process.exitCode = fail ? 1 : 0;
