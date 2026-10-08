// Spike harness (kit/harness): WebGL render on the v7 simulation.
// Simulation must be identical to v7 (events, poses); render must be real WebGL, non-blank, lightning visible.
// Usage: node check.mjs [--mp4] [--tc]   (--mp4: S6 and S8 segments at 720p + side-by-side with v7)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { cliArgs, openFilm, snapPoses, replayCheck, frameScan, sheet, range, renderMp4, report } from '../../../kit/harness/harness.mjs';

const here = path.dirname(fileURLToPath(import.meta.url)), out = f => path.join(here, f);
const v7dir = path.join(here, '..', '..', 'ninja-sandstorm', 'v7-feedback-6');
const opt = cliArgs(), t0 = Date.now();
const SEG = { S6: [20.6, 26.4], S8: [29.8, 34.0] };
const POSE_T = [21.1, 22.6, 23.5, 24.1, 30.5, 31.3, 33.5];

const { browser, page, errors, duration } = await openFilm(out('storm-gl.html'), { gl: true, tc: opt.tc });
const REPLAY_T = [21.1, 23.5, 31.3, 33.5];
const firstRun = await snapPoses(page, REPLAY_T);
const info = await page.evaluate(() => window.anim.gl());
const ev = await page.evaluate(() => { window.anim.seek(59.9); return window.anim.events(); });
const evV7 = JSON.parse(fs.readFileSync(path.join(v7dir, 'events.json'), 'utf8'));

// poses vs v7 (same simulation)
const v7 = await openFilm(path.join(v7dir, 'storm.html'));
const posesV7 = await snapPoses(v7.page, POSE_T), posesGL = await snapPoses(page, POSE_T);
const poseDiff = POSE_T.filter((t, i) => posesV7[i] !== posesGL[i]);

// render probes: mean luminance + spread of a downscaled frame, render time per frame
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
const pr = await probe([21.1, 23.3, 24.1, 31.0, 31.42, 33.5]);
const at = t => pr.find(p => p.t === t);

const visT = [[21.05, 'key'], [23.3, 'both'], [24.8, 'both'], [31.5, 'both'], [33.5, 'both']];
const vis = await page.evaluate(v => v.map(([t, mode]) => { window.anim.seek(t); return { t, mode, ...window.anim.view() }; }), visT);

const checks = [
  [`Renderer is WebGL (got ${info.renderer}), 1280x720`, info.renderer === 'webgl' && info.size[0] === 1280],
  [`Simulation identical to v7: events (${ev.length} vs ${evV7.length})`, JSON.stringify(ev) === JSON.stringify(evV7)],
  ['Simulation identical to v7: poses at ' + POSE_T.join(', ') + ' s' + (poseDiff.length ? ` (diff at ${poseDiff})` : ''), poseDiff.length === 0],
  ['Frames are not blank (luminance spread > 0.05 in every probe)', pr.every(p => p.sd > 0.05)],
  [`Lightning 31.3 s brightens the frame (mean ${at(31.0).mean} -> ${at(31.42).mean})`, at(31.42).mean > at(31.0).mean + 0.04],
  [`Night is darker than day (${at(33.5).mean} < ${at(23.3).mean})`, at(33.5).mean < at(23.3).mean],
  ...vis.map(f => [`Visible @${f.t}s (${f.mode})`, f.mode === 'both' ? f.B.inFrame && f.A.inFrame : f.B.keyIn && f.A.keyIn]),
  ['No console/page errors (incl. shader compile)', errors.length === 0]
];

const scan = await frameScan(page, { duration, out: out('scan.txt'),
  cuts: [[2.95, 3.05, 'round reset'], [29.95, 30.05, 'round reset'], [45.05, 45.2, 'blink'], [45.55, 45.7, 'blink'], [46.05, 46.2, 'blink']] });
checks.push(...scan.checks, await replayCheck(page, REPLAY_T, firstRun, duration));
fs.writeFileSync(out('probe.json'), JSON.stringify(pr, null, 1));

// sheets: GL dense S6 + night, and v7 | WebGL side by side at the same moments
const CMP = [[21.1, 'S6 parry'], [22.6, 'S6 monsoon start'], [23.3, 'S6 monsoon hits'], [24.1, 'S6 K.O. hit'], [31.42, 'S8 lightning'], [33.5, 'S9 night exchange']];
await sheet(page, out('sheet-s6-gl.png'), range(22.6, 24.2, 8).map(t => [t, 'S6 GL']), { cols: 4, cellW: 480 });
await sheet(page, out('.cmp-gl.png'), CMP.map(([t, n]) => [t, 'WebGL · ' + n]), { cols: 1, cellW: 640 });
await sheet(v7.page, out('.cmp-v7.png'), CMP.map(([t, n]) => [t, 'v7 Canvas 2D · ' + n]), { cols: 1, cellW: 640 });
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', out('.cmp-v7.png'), '-i', out('.cmp-gl.png'), '-filter_complex', 'hstack', out('compare-v7-gl.png')]);
fs.rmSync(out('.cmp-gl.png')); fs.rmSync(out('.cmp-v7.png'));
await v7.browser.close();

let extra = ` · render ${Math.round(pr.reduce((s, p) => s + p.ms, 0) / pr.length)} ms/frame (SwiftShader, no GPU)`;
if (opt.mp4) {
  for (const [k, [a, b]] of Object.entries(SEG)) {
    const f = out(`seg-${k.toLowerCase()}.mp4`), t1 = Date.now();
    await renderMp4(page, f, { duration, fps: 30, scale: 1, from: a, to: b });
    const v7mp4 = path.join(v7dir, 'storm.mp4');
    if (fs.existsSync(v7mp4)) execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(a), '-t', String(b - a), '-i', v7mp4, '-i', f, '-filter_complex',
      '[0:v]scale=960:540:flags=neighbor[l];[1:v]scale=960:540[r];[l][r]hstack[v]', '-map', '[v]', '-map', '1:a', '-c:v', 'libx264', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'copy', out(`side-${k.toLowerCase()}.mp4`)]);
    extra += ` · ${path.basename(f)} ${((Date.now() - t1) / 1000).toFixed(0)} s`;
  }
}
await browser.close();
report(checks, { errors, scan, events: ev, t0, extra });
