// Harness on kit/harness (assertions of this film; mechanics from the kit). Usage: node check.mjs [--mp4] [--fps=30] [--tc]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cliArgs, openFilm, snapPoses, replayCheck, frameScan, trace, sheet, range, renderMp4, report } from '../../../kit/harness/harness.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const opt = cliArgs(), t0 = Date.now();
const { browser, page, errors, duration } = await openFilm(path.join(here, 'storm.html'), { tc: opt.tc });
const REPLAY_T = [1, 5, 8, 12, 18, 21.1, 30, 45];
const firstRun = await snapPoses(page, REPLAY_T); // on a fresh page, before anything else

const ev = await page.evaluate(() => { window.anim.seek(59.9); return window.anim.events(); });
const first = pred => ev.find(pred);
const window_flips = (await page.evaluate(() => window.anim.script())).filter(e => e.who === 'B' && e.act === 'flip').map(e => e.t);
const within = (e, a, b) => !!e && e.t >= a && e.t <= b;
const count = (pred, a, b) => ev.filter(e => pred(e) && e.t >= a && e.t <= b).length;
const strikes = e => ['hit', 'block'].includes(e.type) || e.type === 'clash';

// twist triplets: [setup, moment, payoff]
// each frame: [time, mode] — 'both' = both full bodies in frame, 'key' = heads + striking hands, 'A' = ALAMANDRO key points only (fist close-up)
const TWISTS = [
  ['T1 chokehold', [[11.15, 'both'], [12.4, 'key'], [14.25, 'both']]],
  ['T2 monsoon', [[21.05, 'key'], [23.3, 'both'], [24.8, 'both']]],
  ['T3 throw', [[39.4, 'both'], [39.95, 'both'], [40.3, 'both']]],
  ['T4 heart', [[50.6, 'A'], [52.3, 'A'], [55.3, 'both']]]
];
const vis = await page.evaluate(tw => tw.map(([name, fr]) => [name, fr.map(([t, mode]) => { window.anim.seek(t); return { t, mode, ...window.anim.view() }; })]), TWISTS);

const checks = [
  ['Intro then fight scene at 3 s', within(first(e => e.type === 'scene' && e.name === 'fight'), 2.9, 3.1)],
  ['Air clash at ~5.6 s', within(first(e => e.type === 'clash'), 5.5, 5.8)],
  ['S3: high kick misses (B ducks) at 8.6-9.0 s', within(first(e => e.type === 'miss' && e.by === 'A'), 8.6, 9.0)],
  ['S3: slow two-hand sweep knocks ALAMANDRO down (sweep 9.4-9.6 s, down 9.85-10.05 s)', within(first(e => e.type === 'sweep'), 9.4, 9.6) && within(first(e => e.type === 'knockdown' && e.who === 'A'), 9.85, 10.05)],
  ['Every BISHUKIJ backflip is a dodge (an ALAMANDRO miss within 0.4 s)', (() => { const fl = window_flips; return fl.every(t => ev.some(e => e.type === 'miss' && e.by === 'A' && Math.abs(e.t - t) < 0.4)); })()],
  ['T1: chokehold grab at 11.6-12.2 s', within(first(e => e.type === 'grab' && e.move === 'choke'), 11.6, 12.2)],
  ['T1: choke drains HP (>= 4 chips)', count(e => e.type === 'chip' && e.move === 'choke', 11, 15) >= 4],
  ['T1: elbow breaks the choke at 14-14.5 s', within(first(e => e.type === 'choke-break'), 14, 14.5)],
  ['T2: arm lock after the catch', (() => { const c = first(e => e.type === 'catch'), l = first(e => e.type === 'armlock'); return c && l && l.t > c.t && l.t < 21.6; })()],
  ['T2: parry at 21.0-21.15 s, then catch', (() => { const p = first(e => e.type === 'parry'), c = first(e => e.type === 'catch'); return within(p, 21.0, 21.15) && c && c.t > p.t && c.t < 21.4; })()],
  ['T2: BLACK MONSOON lands 12 hits', count(e => e.by === 'A' && e.move === 'monsoon' && ['hit', 'ko'].includes(e.type), 22.5, 24.5) >= 12],
  ['T2: K.O. of BISHUKIJ at 24-24.5 s', within(first(e => e.type === 'ko' && e.to === 'B'), 24, 24.5)],
  ['R1 winner = ALAMANDRO', first(e => e.type === 'roundwin')?.who === 'A'],
  ['Round 2 in night ink at 30 s (one style for the whole film)', within(first(e => e.type === 'style' && e.style === 'a' && e.night), 29.9, 30.1) && !ev.some(e => e.type === 'style' && e.style === 'b')],
  ['T3: throw grab at 39.2-39.5 s', within(first(e => e.type === 'grab' && e.move === 'throw'), 39.2, 39.5)],
  ['T3: lift-over starts 39.55-39.65 s, head impact 40.1-40.25 s, dmg >= 40', (() => { const r = first(e => e.type === 'release'), e = first(e => e.type === 'throw-impact'), h = first(e => e.type === 'impact'); return within(r, 39.55, 39.65) && within(e, 40.1, 40.25) && h && h.dmg >= 40; })()],
  ['T3: victim topples onto his back at 40.6-40.9 s', within(first(e => e.type === 'topple'), 40.6, 40.9)],
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

const scan = await frameScan(page, { duration, out: path.join(here, 'scan.txt'),
  cuts: [[2.95, 3.05, 'round reset'], [29.95, 30.05, 'round reset'], [45.05, 45.2, 'blink'], [45.55, 45.7, 'blink'], [46.05, 46.2, 'blink']] });
checks.push(scan.checks[0], await replayCheck(page, REPLAY_T, firstRun, duration), scan.checks[1]);

await trace(page, duration, { out: path.join(here, 'trace.txt'),
  fmt: s => `${s.T.toFixed(1).padStart(5)} ${s.scene.padEnd(5)} ${s.style} cam ${s.cam.x},z${s.cam.zoom},r${s.cam.rot} | B ${s.B.x},${s.B.h} hp${s.B.hp} ${s.B.act.padEnd(9)} | A ${s.A.x},${s.A.h} hp${s.A.hp} ${s.A.act}` });
fs.writeFileSync(path.join(here, 'events.json'), JSON.stringify(ev, null, 1));

const out = f => path.join(here, f);
await sheet(page, out('sheet-twists.png'), TWISTS.flatMap(([n, fr]) => fr.map(([t], i) => [t, `${n} · ${['setup', 'moment', 'payoff'][i]}`])), { cols: 3 });
await sheet(page, out('sheet-s3.png'), range(8.5, 10.3, 16).map(t => [t, 'S3']));
await sheet(page, out('sheet-s6.png'), range(20.85, 21.75, 16).map(t => [t, 'S6']));
await sheet(page, out('sheet-s10.png'), range(39.25, 40.95, 16).map(t => [t, 'S10']));
await sheet(page, out('sheet-story.png'), [[1.6, 'intro'], [4.4, 'fight'], [5.62, 'air clash'], [7.5, 'exchange'], [9.7, 'jump kick'], [17.0, 'exchange 2'],
  [25.2, 'K.O.'], [27.6, 'sand wall'], [29.1, 'ink blot'], [30.5, 'night ink'], [33.5, 'exchange 3'], [37.4, 'lightning'],
  [44.3, 'laugh'], [45.4, 'blink'], [48.3, 'dizzy'], [58.8, 'end']]);
await page.setViewport({ width: 400, height: 900 });
await page.evaluate(() => window.anim.seek(40.3));
await page.screenshot({ path: out('phone.png'), fullPage: true });

const mp4 = opt.mp4 ? await renderMp4(page, out('storm.mp4'), { duration, fps: opt.fps, scale: 3 }) : null;
await browser.close();
for (const [name, frames] of vis) for (const f of frames) if (!(f.mode === 'A' ? f.A.keyIn : f.B.keyIn && f.A.keyIn)) console.log(`  ${name} @${f.t}: B ${JSON.stringify(f.B.box)} A ${JSON.stringify(f.A.box)}`);
report(checks, { errors, scan, events: ev, t0, extra: mp4 ? ` · mp4: storm.mp4 · audio cues ${mp4.cues}` : '' });
