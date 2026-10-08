// kit/harness: shared test-harness blocks for code-animated films (contract: window.anim in the page).
// A film's check.mjs keeps only its assertions and calls these blocks. Backbone: frameScan (every tick, every joint).
// Required window.anim: duration, seek(t), step(n), advance(n), joints(), state(), events()
// Optional: view(), script(), setTimecode(v), renderAudio(rate), capture() -> dataURL (WebGL canvases)
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

export function findChrome() {
  const root = path.join(os.homedir(), '.cache', 'puppeteer', 'chrome-headless-shell');
  const vers = fs.readdirSync(root).filter(d => !d.startsWith('.')).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  for (const v of vers) {
    const dir = fs.readdirSync(path.join(root, v)).find(d => d.startsWith('chrome-headless-shell'));
    const exe = dir && path.join(root, v, dir, 'chrome-headless-shell');
    if (exe && fs.existsSync(exe)) return exe;
  }
  throw new Error('No chrome-headless-shell in ~/.cache/puppeteer');
}

export function cliArgs(argv = process.argv.slice(2)) {
  return { mp4: argv.includes('--mp4'), tc: argv.includes('--tc'), fps: Number((argv.find(a => a.startsWith('--fps=')) || '--fps=30').split('=')[1]) };
}

// open the film in headless Chrome; collects page/console errors
export async function openFilm(html, { tc = false, chromeArgs = [] } = {}) {
  const browser = await puppeteer.launch({ executablePath: findChrome(), headless: 'shell', args: ['--autoplay-policy=no-user-gesture-required', ...chromeArgs] });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => m.type() === 'error' && errors.push(m.text()));
  await page.goto('file://' + html + '?t=0', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(v => window.anim.setTimecode && window.anim.setTimecode(v), tc); // explicit: films may show the timecode by default
  const duration = await page.evaluate(() => window.anim.duration);
  return { browser, page, errors, duration };
}

// poses at given seconds (JSON strings, for exact comparison)
export const snapPoses = (page, ts) => page.evaluate(ts => ts.map(t => { window.anim.seek(t); return JSON.stringify(window.anim.joints()); }), ts);

// replay: take firstRun on a FRESH page (before anything else), call this after other checks.
// Plays the whole film, seeks back and compares poses; catches state not cleared on restart.
export async function replayCheck(page, ts, firstRun, duration) {
  await page.evaluate(d => { window.anim.seek(0); window.anim.step(Math.round((d - 0.1) * 60)); }, duration);
  const again = await snapPoses(page, ts);
  const diff = ts.filter((t, i) => firstRun[i] !== again[i]);
  return ['Replay: poses after a full run match the first run' + (diff.length ? ` (diff at ${diff.join(', ')} s)` : ''), diff.length === 0];
}

// frame-by-frame scan: every tick, every joint of every actor in joints() (objects of [x, y]).
// jump > flagPx between consecutive ticks = flag; groups by 0.05 s + actor + action; cuts = [[t0, t1, reason]] are expected jumps.
export async function frameScan(page, { duration, cuts = [], flagPx = 14, contPx = 30, popPx = 60, out } = {}) {
  const scan = await page.evaluate((ticks, flagPx) => {
    const a = window.anim; a.seek(0); let prev = a.joints(); const flags = []; let nan = 0;
    const actors = Object.keys(prev).filter(k => prev[k] && typeof prev[k] === 'object' && Object.values(prev[k]).some(v => Array.isArray(v)));
    for (let i = 0; i < ticks; i++) {
      a.advance(1); const cur = a.joints();
      for (const id of actors) for (const k in cur[id]) {
        const p = cur[id][k], q = prev[id][k]; if (!Array.isArray(p) || !Array.isArray(q)) continue;
        if (!Number.isFinite(p[0]) || !Number.isFinite(p[1])) nan++;
        const d = Math.hypot(p[0] - q[0], p[1] - q[1]);
        if (d > flagPx) flags.push({ t: cur.T, who: id, joint: k, d: Math.round(d), act: cur['act' + id] || '' });
      }
      prev = cur;
    }
    return { flags, nan };
  }, Math.round(duration * 60) - 2, flagPx);
  const groups = {};
  for (const f of scan.flags) { const key = `${(Math.round(f.t * 20) / 20).toFixed(2)} ${f.who} ${f.act}`; (groups[key] ||= []).push(f); }
  const pops = Object.entries(groups).map(([k, fs]) => { const t = fs[0].t, cut = cuts.find(([a, b]) => t >= a && t <= b); return { k, t, max: Math.max(...fs.map(f => f.d)), joints: [...new Set(fs.map(f => f.joint))].join(','), cut: cut ? cut[2] : null }; });
  const unexpected = pops.filter(p => !p.cut && p.max >= contPx);
  if (out) fs.writeFileSync(out, pops.map(p => `${p.k.padEnd(28)} max ${String(p.max).padStart(3)} px  [${p.joints}]${p.cut ? '  (expected: ' + p.cut + ')' : ''}`).join('\n') + '\n');
  return {
    pops, unexpected, nan: scan.nan,
    checks: [['Frame scan: no NaN joints', scan.nan === 0], [`Frame scan: no pops >= ${popPx} px/frame outside known cuts`, !pops.some(p => !p.cut && p.max >= popPx)]]
  };
}

// sampled state every `step` seconds; fmt(state) -> line
export async function trace(page, duration, { step = 0.5, fmt = s => JSON.stringify(s), out } = {}) {
  const rows = await page.evaluate((d, st) => { const r = []; for (let t = 0; t < d; t += st) { window.anim.seek(t); r.push(window.anim.state()); } return r; }, duration, step);
  if (out) fs.writeFileSync(out, rows.map(fmt).join('\n') + '\n');
  return rows;
}

// frame grab of the current state (WebGL films may provide anim.capture())
const grabJs = `(() => window.anim.capture ? window.anim.capture() : (document.getElementById('screen') || document.querySelector('canvas')).toDataURL('image/png'))()`;

// contact sheet: moments = [[t, label]]; cells scaled to cellW (keeps aspect)
export async function sheet(page, file, moments, { cols = 4, cellW = 480 } = {}) {
  const data = await page.evaluate(async (moments, cols, cellW, grabJs) => {
    const load = src => new Promise(r => { const im = new Image(); im.onload = () => r(im); im.src = src; });
    const shots = [];
    for (const [t] of moments) { window.anim.seek(t); shots.push(await load(eval(grabJs))); }
    const w = cellW, h = Math.round(cellW * shots[0].height / shots[0].width), pad = 4, lh = 14;
    const c = document.createElement('canvas'); c.width = cols * (w + pad); c.height = Math.ceil(moments.length / cols) * (h + lh + pad);
    const x = c.getContext('2d'); x.fillStyle = '#333'; x.fillRect(0, 0, c.width, c.height); x.imageSmoothingEnabled = shots[0].width > w;
    moments.forEach(([t, name], i) => {
      const px = (i % cols) * (w + pad), py = Math.floor(i / cols) * (h + lh + pad);
      x.drawImage(shots[i], px, py + lh, w, h); x.fillStyle = '#fff'; x.font = '11px monospace'; x.fillText(`t=${t}  ${name}`, px + 2, py + 11);
    });
    return c.toDataURL('image/png');
  }, moments, cols, cellW, grabJs);
  fs.writeFileSync(file, Buffer.from(data.split(',')[1], 'base64'));
}
export const range = (a, b, n) => Array.from({ length: n }, (_, i) => +(a + (b - a) * i / (n - 1)).toFixed(2));

// MP4: frames via step() + audio via renderAudio() (if the film has it), ffmpeg; scale = integer upscale (pixel films) or 1
export async function renderMp4(page, out, { duration, fps = 30, scale = 3, from = 0, to = duration } = {}) {
  const dir = path.dirname(out), frames = path.join(dir, 'frames'), wavPath = path.join(dir, 'audio.wav');
  let cues = null;
  const hasAudio = await page.evaluate(() => !!window.anim.renderAudio);
  if (hasAudio) { const r = await page.evaluate(async () => await window.anim.renderAudio(32000)); fs.writeFileSync(wavPath, Buffer.from(r.wav, 'base64')); cues = r.cues; }
  fs.rmSync(frames, { recursive: true, force: true }); fs.mkdirSync(frames);
  await page.evaluate(t => window.anim.seek(t), from);
  const total = Math.round((to - from) * fps), per = Math.round(60 / fps);
  for (let i = 0; i < total; i++) {
    const data = await page.evaluate((n, js) => { window.anim.step(n); return eval(js); }, i === 0 ? 0 : per, grabJs);
    fs.writeFileSync(path.join(frames, `f${String(i).padStart(5, '0')}.png`), Buffer.from(data.split(',')[1], 'base64'));
  }
  const audio = hasAudio ? ['-ss', String(from), '-t', String(to - from), '-i', wavPath] : [];
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(frames, 'f%05d.png'), ...audio,
    '-vf', scale === 1 ? 'null' : `scale=iw*${scale}:ih*${scale}:flags=neighbor`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18',
    ...(hasAudio ? ['-c:a', 'aac', '-b:a', '160k', '-shortest'] : []), out]);
  fs.rmSync(frames, { recursive: true, force: true }); if (hasAudio) fs.rmSync(wavPath);
  return { out, cues };
}

// print PASS/FAIL, summary line, set exit code
export function report(checks, { errors = [], scan, events, t0, extra = '' } = {}) {
  let fail = 0;
  for (const [name, ok] of checks) { console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`); if (!ok) fail++; }
  if (errors.length) console.log('errors:', errors.slice(0, 5));
  if (scan) {
    console.log(`frame scan: ${scan.pops.length} pop groups, ${scan.unexpected.length} unexpected:`);
    for (const p of scan.unexpected.sort((a, b) => b.max - a.max).slice(0, 14)) console.log(`  ${p.k.padEnd(28)} max ${p.max}px [${p.joints}]`);
  }
  console.log(`${events ? `events: ${events.length} · ` : ''}${checks.length - fail}/${checks.length} checks passed${t0 ? ` · ${((Date.now() - t0) / 1000).toFixed(1)} s` : ''}${extra}`);
  process.exitCode = fail ? 1 : 0;
  return fail;
}
