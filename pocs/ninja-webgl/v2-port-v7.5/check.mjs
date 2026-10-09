// WebGL v2 (port ninja v7.5) harness on kit/harness: the simulation must equal v7.5 (events, poses), the render must be
// real WebGL (GPU when available), non-blank, lightning visible, night darker than day; frame scan + replay; sheets v7.5 | v2.
// Usage: node check.mjs [--mp4] [--tc]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { cliArgs, openFilm, snapPoses, replayCheck, frameScan, sheet, renderMp4, report } from '../../../kit/harness/harness.mjs';

const here = path.dirname(fileURLToPath(import.meta.url)), out = f => path.join(here, f);
const refDir = path.join(here, '..', '..', 'ninja-sandstorm', 'v7.5-feedback-11');
const opt = cliArgs(), t0 = Date.now();
const POSE_T = [5.7, 9.6, 12.4, 21.1, 23.3, 24.1, 31.3, 33.5, 40.15, 45.4, 51.35, 57.5];
const REPLAY_T = [9.6, 21.1, 33.5, 45.4];

const { browser, page, errors, duration, gpuName } = await openFilm(out('storm-gl.html'), { gl: true, tc: opt.tc });
const firstRun = await snapPoses(page, REPLAY_T);
const info = await page.evaluate(() => window.anim.gl());
const ev = await page.evaluate(() => { window.anim.seek(59.9); return window.anim.events(); });
const evRef = JSON.parse(fs.readFileSync(path.join(refDir, 'events.json'), 'utf8'));
const ref = await openFilm(path.join(refDir, 'storm.html'));
const posesRef = await snapPoses(ref.page, POSE_T), posesGL = await snapPoses(page, POSE_T);
const poseDiff = POSE_T.filter((t, i) => posesRef[i] !== posesGL[i]);

const probe = ts => page.evaluate(async ts => {
  const res = [];
  for (const t of ts) {
    window.anim.seek(t); const t1 = performance.now(); const url = window.anim.capture(); const ms = performance.now() - t1;
    const im = await new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = url; });
    const c = document.createElement('canvas'); c.width = 160; c.height = 90; const x = c.getContext('2d'); x.drawImage(im, 0, 0, 160, 90);
    const d = x.getImageData(0, 0, 160, 90).data; let s = 0, s2 = 0; const n = d.length / 4;
    for (let i = 0; i < d.length; i += 4) { const l = (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255; s += l; s2 += l * l; }
    res.push({ t, mean: +(s / n).toFixed(3), sd: +Math.sqrt(s2 / n - (s / n) ** 2).toFixed(3), ms: Math.round(ms) });
  }
  return res;
}, ts);
const pr = await probe([1.5, 9.6, 23.3, 31.0, 31.42, 33.5, 45.4, 57.5]);
const at = t => pr.find(p => p.t === t);
const VIS = [[12.4, 'key'], [21.05, 'key'], [23.3, 'both'], [24.8, 'both'], [31.5, 'both'], [39.95, 'both'], [52.3, 'A'], [55.3, 'both']];
const vis = await page.evaluate(v => v.map(([t, mode]) => { window.anim.seek(t); return { t, mode, ...window.anim.view() }; }), VIS);

const checks = [
  [`Renderer is WebGL on ${/SwiftShader/.test(gpuName) ? 'software (SwiftShader)' : 'GPU'} (${gpuName.replace(/^ANGLE \(|\)$/g, '').slice(0, 60)}), 1280x720`, info.renderer === 'webgl' && info.size[0] === 1280],
  [`Simulation identical to v7.5: events (${ev.length} vs ${evRef.length})`, JSON.stringify(ev) === JSON.stringify(evRef)],
  ['Simulation identical to v7.5: poses at ' + POSE_T.join(', ') + ' s' + (poseDiff.length ? ` (diff at ${poseDiff})` : ''), poseDiff.length === 0],
  ['Frames are not blank (luminance spread > 0.05 in every probe)', pr.every(p => p.sd > 0.05)],
  [`Lightning 31.3 s brightens the frame (mean ${at(31.0).mean} -> ${at(31.42).mean})`, at(31.42).mean > at(31.0).mean + 0.04],
  [`Night is darker than day (${at(33.5).mean} < ${at(23.3).mean})`, at(33.5).mean < at(23.3).mean],
  ...vis.map(f => [`Visible @${f.t}s (${f.mode})`, f.mode === 'both' ? f.B.inFrame && f.A.inFrame : f.mode === 'key' ? f.B.keyIn && f.A.keyIn : f.A.keyIn]),
  ['No console/page errors (incl. shader compile)', errors.length === 0]
];
const scan = await frameScan(page, { duration, out: out('scan.txt'),
  cuts: [[2.95, 3.05, 'round reset'], [29.95, 30.05, 'round reset'], [45.05, 45.2, 'blink'], [45.55, 45.7, 'blink'], [46.05, 46.2, 'blink']] });
checks.push(...scan.checks, await replayCheck(page, REPLAY_T, firstRun, duration));
fs.writeFileSync(out('probe.json'), JSON.stringify(pr, null, 1));
fs.writeFileSync(out('events.json'), JSON.stringify(ev, null, 1));

// sheets: v7.5 (Canvas 2D) | v2 (WebGL) at the same moments, in two halves
const CMP = [[9.6, 'S3 podcięcie'], [12.4, 'S4 duszenie'], [20.2, 'S5 podmuch'], [23.3, 'S6 monsun'], [24.1, 'S6 K.O.'], [31.42, 'S8 piorun'],
  [33.5, 'S9 noc, wir'], [40.15, 'S10 rzut'], [45.4, 'S11 teleport'], [51.35, 'S12 fatality'], [57.5, 'S13 wygrana'], [11.95, 'S4 fala uderzeniowa']];
for (const [k, part] of [['a', CMP.slice(0, 6)], ['b', CMP.slice(6)]]) {
  await sheet(page, out(`.gl-${k}.png`), part.map(([t, n]) => [t, 'WebGL v2 · ' + n]), { cols: 1, cellW: 640 });
  await sheet(ref.page, out(`.ref-${k}.png`), part.map(([t, n]) => [t, 'v7.5 Canvas · ' + n]), { cols: 1, cellW: 640 });
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', out(`.ref-${k}.png`), '-i', out(`.gl-${k}.png`), '-filter_complex', 'hstack', out(`compare-v75-v2-${k}.png`)]);
  fs.rmSync(out(`.gl-${k}.png`)); fs.rmSync(out(`.ref-${k}.png`));
}
await ref.browser.close();
const msAvg = Math.round(pr.reduce((s, p) => s + p.ms, 0) / pr.length);
let extra = ` · render ${msAvg} ms/frame (${/SwiftShader/.test(gpuName) ? 'SwiftShader, no GPU' : 'GPU'})`;
if (opt.mp4) { const t1 = Date.now(); await renderMp4(page, out('storm-gl.mp4'), { duration, fps: 30, scale: 1 }); extra += ` · mp4 ${((Date.now() - t1) / 1000).toFixed(0)} s`; }
await browser.close();
report(checks, { errors, scan, events: ev, t0, extra });
