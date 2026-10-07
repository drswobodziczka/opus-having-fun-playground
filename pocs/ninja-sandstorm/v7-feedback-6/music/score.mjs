// Kung-fu score for v6 as code -> score.mid (Standard MIDI File, format 0).
// Deterministic: follows the scene table (same as SCENES in storm.html) and event times from ../events.json.
// Render: see render.sh (fluidsynth + GeneralUser GS soundfont -> music.mp3).
import fs from 'node:fs';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const EV = JSON.parse(fs.readFileSync(path.join(here, '..', 'events.json'), 'utf8'));

/* ---------- tiny MIDI writer (120 BPM, 480 PPQ -> 960 ticks per second) ---------- */
const TPS = 960;
const evs = []; // { tick, order, bytes }
const at = (t, bytes, order = 1) => evs.push({ tick: Math.max(0, Math.round(t * TPS)), order, bytes });
function note(ch, t, pitch, dur, vel) {
  if (pitch == null) return;
  vel = Math.max(1, Math.min(127, Math.round(vel)));
  at(t, [0x90 | ch, pitch, vel], 2); at(t + dur, [0x80 | ch, pitch, 0], 0);
}
const program = (ch, p) => at(0, [0xc0 | ch, p], 0);
const cc = (ch, t, c, v) => at(t, [0xb0 | ch, c, v], 1);
function writeMidi(file) {
  evs.sort((a, b) => a.tick - b.tick || a.order - b.order);
  const vlq = n => { const out = [n & 0x7f]; while ((n >>= 7)) out.unshift((n & 0x7f) | 0x80); return out; };
  const body = [0x00, 0xff, 0x51, 0x03, 0x07, 0xa1, 0x20]; // tempo 500000 us/quarter
  let last = 0;
  for (const e of evs) { body.push(...vlq(e.tick - last), ...e.bytes); last = e.tick; }
  body.push(0x00, 0xff, 0x2f, 0x00);
  const u32 = n => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255];
  const head = [0x4d, 0x54, 0x68, 0x64, ...u32(6), 0, 0, 0, 1, 0x01, 0xe0];
  fs.writeFileSync(file, Buffer.from([...head, 0x4d, 0x54, 0x72, 0x6b, ...u32(body.length), ...body]));
}

/* ---------- instruments (GM program numbers, 0-based) ---------- */
const KOTO = 0, FLUTE = 1, BASS = 2, TAIKO = 3, TOMS = 4, STR = 5, HIT = 6, SHAKU = 7, DR = 9;
program(KOTO, 107); program(FLUTE, 73); program(BASS, 106); program(TAIKO, 116);
program(TOMS, 117); program(STR, 44); program(HIT, 55); program(SHAKU, 77);
for (const [ch, vol, rev] of [[KOTO, 100, 50], [FLUTE, 96, 60], [BASS, 110, 20], [TAIKO, 120, 40], [TOMS, 100, 40], [STR, 80, 60], [HIT, 90, 50], [SHAKU, 100, 80], [DR, 110, 35]]) {
  cc(ch, 0, 7, vol); cc(ch, 0, 91, rev);
}
// drum kit notes (GM)
const KICK = 36, SNARE = 38, CRASH = 49, CHINA = 52, SPLASH = 55, WB_HI = 76, WB_LO = 77;
const hum = (i, amt = 8) => { const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return (s - Math.floor(s) - 0.5) * 2 * amt; };

/* ---------- scene map (copy of SCENES / SCENE_MODE from storm.html) ---------- */
const SCENES = [['S1', 0, 3], ['S2', 3, 5], ['S3', 5, 11], ['S4', 11, 15], ['S5', 15, 21], ['S6', 21, 26.4], ['S7', 26.4, 30],
  ['S8', 30, 33], ['S9', 33, 39], ['S10', 39, 44], ['S11', 44, 50], ['S12', 50, 56], ['S13', 56, 60]];
const TENSION = new Set(['S4', 'S6', 'S10', 'S11']);
const sceneAt = t => (SCENES.find(s => t >= s[1] && t < s[2]) || SCENES[SCENES.length - 1])[0];
const evT = (type, from = 0) => EV.find(e => e.type === type && e.t >= from)?.t;

/* ---------- material: E minor pentatonic (E G A B D) ---------- */
const SD = 0.1; // one 16th at 150 BPM
const PHRASE_A = [[76, 2], [74, 1], [71, 1], [74, 2], [76, 2], [79, 3], [76, 1], [74, 2], [71, 2], [69, 2], [71, 2], [74, 2], [71, 1], [69, 1], [67, 4], [64, 4]];
const PHRASE_B = [[79, 1], [81, 1], [83, 2], [81, 2], [79, 2], [76, 2], [79, 2], [81, 4], [83, 2], [86, 2], [83, 1], [81, 1], [79, 2], [76, 4], [null, 4]];
const RUN = [64, 67, 69, 71, 74, 76, 79, 81, 83, 81, 79, 76, 74, 71, 69, 67];
const ROOTS = [52, 55, 50, 57]; // E G D A, each with its fifth (B D A E): all inside the pentatonic

function phrase(ch, t0, ph, tr, vel, tEnd) {
  let t = t0;
  ph.forEach(([p, len], i) => { if (t < tEnd) note(ch, t, p == null ? null : p + tr, Math.min(len * SD * 0.92, tEnd - t), vel + hum(i, 6)); t += len * SD; });
}

// one fight section on a 16th grid anchored at t0, until t1; tr = transposition
function fight(t0, t1, tr) {
  const steps = Math.floor((t1 - t0) / SD + 1e-6);
  for (let s = 0; s < steps; s++) {
    const t = t0 + s * SD, k = s % 16, bar = Math.floor(s / 16), tense = TENSION.has(sceneAt(t)), r = ROOTS[bar % 4] + tr;
    // drums
    if (k === 0 || k === 8 || (tense && k === 10)) note(DR, t, KICK, 0.1, 100 + hum(s));
    if (k === 4 || k === 12) note(DR, t, SNARE, 0.1, (tense ? 92 : 78) + hum(s));
    if (k % 2 === 0 || tense) note(DR, t, k % 4 === 0 ? WB_LO : WB_HI, 0.05, (k % 4 === 0 ? 84 : 62) + hum(s + 3));
    if (k === 0 && (tense || bar % 4 === 0)) note(DR, t, tense ? CHINA : CRASH, 0.8, tense ? 88 : 78);
    if ([0, 6, 8, 11].includes(k) || (tense && [14, 15].includes(k))) note(TAIKO, t, k === 0 || k === 8 ? 45 : 50, 0.3, (k === 0 || k === 8 ? 118 : 96) + hum(s));
    if (bar % 4 === 3 && k >= 12) note(TOMS, t, [55, 52, 50, 47][k - 12], 0.15, 100); // fill
    // koto ostinato (8ths: root, fifth, octave, fifth) and shamisen bass
    if (k % 2 === 0) note(KOTO, t, r + [0, 7, 12, 7][(k / 2) % 4], 0.35, (k % 4 === 0 ? 92 : 74) + hum(s + 7));
    if ([0, 6, 8].includes(k)) note(BASS, t, r - 12, 0.2, 112);
    if ([3, 11, 14].includes(k)) note(BASS, t, r - 5, 0.15, 96);
    // tremolo strings carry the tension scenes
    if (tense && k === 0) { note(STR, t, r - 12, 16 * SD, 82); note(STR, t, r - 5, 16 * SD, 72); }
  }
  // flute: call/answer phrases in groove scenes, pentatonic runs in tension scenes (2-bar units)
  for (let b = 0; b * 32 * SD < t1 - t0; b++) {
    const t = t0 + b * 32 * SD, tense = TENSION.has(sceneAt(t)), end = Math.min(t1, t + 32 * SD);
    if (tense) RUN.concat(RUN).forEach((p, i) => { const ti = t + i * SD; if (ti < end) note(FLUTE, ti, p + tr + (i >= 16 ? 12 : 0), SD * 0.9, 80 + (i % 4 === 0 ? 18 : 0)); });
    else phrase(FLUTE, t, b % 2 ? PHRASE_B : PHRASE_A, tr, 92, end);
  }
}

function gliss(ch, t, from, to, dur, vel) { // pentatonic glissando (koto / guzheng sweep)
  const PENT = [0, 3, 5, 7, 10], notes = [];
  for (let p = Math.min(from, to); p <= Math.max(from, to); p++) if (PENT.includes(((p - 64) % 12 + 12) % 12)) notes.push(p);
  if (from > to) notes.reverse();
  notes.forEach((p, i) => note(ch, t + (i / notes.length) * dur, p, 0.6, vel));
}
function bigHit(t, lvl) { // stinger: orchestra hit + taiko (+ cymbal / gong-like china on bigger ones)
  note(HIT, t, 52, 0.5, 70 + 18 * lvl); note(HIT, t, 59, 0.5, 60 + 15 * lvl);
  note(TAIKO, t, 43, 0.6, 100 + 9 * lvl);
  if (lvl >= 2) { note(DR, t, CHINA, 2, 100 + 9 * lvl); note(DR, t, CRASH, 2, 90); }
  if (lvl >= 3) { note(TAIKO, t + 0.16, 41, 0.8, 120); note(STR, t, 40, 2.5, 90); }
}
function heartbeat(t0, t1, vel = 100) { for (let t = t0; t < t1 - 0.05; t += 0.6) { note(TAIKO, t, 41, 0.4, vel); note(TAIKO, t + 0.22, 41, 0.3, vel * 0.7); } }
function woodRoll(t0, t1) { // accelerating woodblock roll into a downbeat
  let t = t0, gap = 0.12, i = 0;
  while (t < t1 - 0.02) { note(DR, t, i % 2 ? WB_HI : WB_LO, 0.04, 60 + 50 * ((t - t0) / (t1 - t0))); t += gap; gap = Math.max(0.035, gap * 0.9); i++; }
}

/* ---------- the film ---------- */
const FIGHT1 = evT('banner', 4) ?? 4.3, KO = evT('ko') ?? 24.07, FIGHT2 = 32.0;
const HEART = evT('heart') ?? 51.28, SPINE = evT('spine-out') ?? 51.45, WIN = evT('winpose') ?? 56.58;

// S1 intro: china "gong", falling koto sweep, shakuhachi call over a low string pad
note(DR, 0.05, CHINA, 3, 110); note(TAIKO, 0.05, 41, 1, 120); note(STR, 0.05, 40, 4.2, 70); note(STR, 0.05, 47, 4.2, 60);
gliss(KOTO, 0.3, 88, 52, 0.9, 88);
note(SHAKU, 1.3, 71, 0.9, 96); note(SHAKU, 2.2, 76, 0.9, 104);
// S2 round one: heartbeat + woodblock roll into FIGHT!
heartbeat(3.0, FIGHT1 - 0.6); woodRoll(FIGHT1 - 0.7, FIGHT1); gliss(KOTO, FIGHT1 - 0.35, 64, 88, 0.3, 80);
bigHit(FIGHT1, 2);
fight(FIGHT1, KO, 0);
// KO: hard stop + big hit; S7 transition: lonely shakuhachi over a drone
bigHit(KO, 3);
note(STR, 26.4, 40, 3.6, 62);
[[26.6, 71, 0.8], [27.4, 69, 0.4], [27.8, 67, 0.4], [28.2, 64, 1.2], [29.4, 62, 0.3], [29.7, 64, 0.3]].forEach(([t, p, d], i) => note(SHAKU, t, p, d, 92 + hum(i, 6)));
note(KOTO, 26.5, 64, 1.5, 60); note(KOTO, 28.2, 59, 1.5, 55);
// S8 round two: heartbeat, lightning cymbal, roll into FIGHT!, then the whole groove a tone higher
heartbeat(30.0, FIGHT2 - 0.6, 110); note(DR, 31.3, CHINA, 1.5, 96); woodRoll(FIGHT2 - 0.7, FIGHT2); gliss(KOTO, FIGHT2 - 0.35, 66, 90, 0.3, 84);
bigHit(FIGHT2, 2);
fight(FIGHT2, 50.0, 2);
// S12 fatality: accelerating tom/snare roll up to the heart, silence, then a dark drone
for (let t = 50.0, gap = 0.2, i = 0; t < HEART - 0.03; t += gap, gap = Math.max(0.04, gap * 0.88), i++) {
  const p = (t - 50) / (HEART - 50); note(TOMS, t, 45 + Math.round(p * 10), 0.1, 60 + 60 * p); if (i % 2) note(DR, t, SNARE, 0.05, 50 + 60 * p);
}
note(STR, 50.0, 40, HEART - 50, 70); note(STR, 50.0, 47, HEART - 50, 64);
bigHit(HEART, 3); bigHit(SPINE, 2);
note(STR, 52.0, 28 + 12, 3.8, 66); note(SHAKU, 53.0, 70, 1.6, 84); note(SHAKU, 54.6, 64, 1.2, 80);
// S13 victory: gong-like china, rising koto sweep, flute phrase over a full chord
bigHit(WIN, 2); gliss(KOTO, WIN + 0.1, 52, 88, 0.8, 92);
note(STR, WIN, 43, 3.3, 80); note(STR, WIN, 50, 3.3, 72); note(STR, WIN, 55, 3.3, 72);
phrase(FLUTE, WIN + 0.4, PHRASE_B.slice(0, 8), 0, 96, 59.6);
note(TAIKO, 59.0, 41, 1, 110); note(DR, 59.0, CHINA, 1, 90);

// in-fight stingers on key events (first round and second round only; KO/heart/win handled above)
const LVL = { parry: 1, catch: 1, armlock: 1, grab: 1, sweep: 1, release: 1, 'throw-impact': 2 };
for (const e of EV) if (LVL[e.type]) bigHit(e.t, LVL[e.type]);

const out = path.join(here, 'score.mid');
writeMidi(out);
console.log(`score.mid: ${evs.length} MIDI events · fight1 ${FIGHT1}s · ko ${KO}s · heart ${HEART}s · win ${WIN}s`);
