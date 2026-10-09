// Voice-over: ElevenLabs eleven_v3, the most expressive setting (stability 0 = "Creative"), three voices (CAST).
// Per line: TAKES takes -> speech-to-text check (words must match) -> drop takes over the time slot -> keep the loudest raw take
// (shouting proxy; the model cannot hear) -> trim leading silence + loudnorm -> vo/<name>.mp3. Report: vo/takes.json.
// Key from the macOS Keychain (service "elevenlabs-api"). Usage: node vo/make.mjs [name ...]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';

const here = path.dirname(new URL(import.meta.url).pathname);
const KEY = execFileSync('security', ['find-generic-password', '-s', 'elevenlabs-api', '-w']).toString().trim();
const MODEL = 'eleven_v3', TAKES = 2;
// cast: announcer in the Mortal Kombat manner (deep, booming), ALAMANDRO (black) = Harry, BISHUKIJ (light) = Callum
const PITCH = 0.84; // announcer: about -3 semitones, tempo kept
const CAST = {
  announcer: { voice: 'pNInz6obpgDQGcFmaJgB', fx: `asetrate=44100*${PITCH},aresample=44100,atempo=${(1 / PITCH).toFixed(4)},aecho=0.8:0.55:70|140:0.3|0.18` }, // Adam
  alamandro: { voice: 'SOYHLrjzK2X1ezoPC6cr', fx: null }, // Harry - Fierce Warrior
  bishukij: { voice: 'N2lVS1w4EtoT3dr4eOWO', fx: null } // Callum - Husky Trickster
};
// name: [who, text with v3 audio tags, words expected in the transcript, max seconds (gap to the next VO line)]
const LINES = {
  round1: ['announcer', '[shouting] Round one!', 'round one', 1.15],
  fight: ['announcer', '[shouting] Fight!', 'fight', 1.2],
  ko: ['announcer', '[shouting] K.O.!', 'ko', 1.6],
  round2: ['announcer', '[shouting] Round two!', 'round two', 1.25],
  finish: ['announcer', '[shouting] Finish him!', 'finish him', 1.9],
  fatality: ['announcer', '[shouting] Fatality!', 'fatality', 2.2],
  wins: ['announcer', '[shouting] Alamandro wins!', 'alamandro wins', 1.5],
  storm: ['announcer', '[deep voice] The storm chose black.', 'the storm chose black', 1.65],
  monsoon: ['alamandro', '[shouting] Black Monsoon!', 'black monsoon', 1.9],
  spine: ['alamandro', '[shouting] Spine of the storm!', 'spine of the storm', 2.2],
  haha: ['alamandro', '[laughs] Ha ha ha!', null, 1.25],
  cackle: ['alamandro', '[laughs maniacally] Hahahahahaha! [crazy laugh] HA HA HA HA HAAA!', null, 5.0],
  cobra: ['bishukij', '[shouting] Sand Cobra!', 'sand cobra', 1.6],
  dune: ['bishukij', '[shouting] Dune Breaker!', 'dune breaker', 1.8]
};
const only = process.argv.slice(2);
const tmp = path.join(here, '.takes'); fs.mkdirSync(tmp, { recursive: true });
const norm = s => s.toLowerCase().replace(/[^a-z ]/g, '').replace(/\s+/g, ' ').trim();
const ff = (args) => execFileSync('ffmpeg', ['-hide_banner', ...args], { stdio: ['ignore', 'pipe', 'pipe'] });
function measure(f) {
  const err = spawnSync('ffmpeg', ['-hide_banner', '-i', f, '-af', 'volumedetect', '-f', 'null', '-']).stderr.toString(); // volumedetect reports on stderr
  const dur = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString();
  return { dur, mean: +(/mean_volume: ([-\d.]+)/.exec(err)?.[1] ?? -99) };
}
async function tts(voice, text, seed, out) {
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`, {
    method: 'POST', headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, model_id: MODEL, seed, voice_settings: { stability: 0.0, similarity_boost: 0.75, style: 0.6 } })
  });
  if (!r.ok) throw new Error(`TTS ${r.status}: ${await r.text()}`);
  fs.writeFileSync(out, Buffer.from(await r.arrayBuffer()));
}
async function stt(file) {
  const fd = new FormData(); fd.append('model_id', 'scribe_v1'); fd.append('file', new Blob([fs.readFileSync(file)]), 'a.mp3');
  const r = await fetch('https://api.elevenlabs.io/v1/speech-to-text', { method: 'POST', headers: { 'xi-api-key': KEY }, body: fd });
  return (await r.json()).text || '';
}

const report = fs.existsSync(path.join(here, 'takes.json')) ? JSON.parse(fs.readFileSync(path.join(here, 'takes.json'))) : {};
for (const [name, [who, text, words, max]] of Object.entries(LINES)) {
  const { voice, fx } = CAST[who];
  if (only.length && !only.includes(name)) continue;
  const takes = [];
  for (let k = 0; k < TAKES; k++) {
    const raw = path.join(tmp, `${name}-${k}.mp3`), trimmed = path.join(tmp, `${name}-${k}.trim.mp3`);
    await tts(voice, text, 100 + k, raw);
    ff(['-y', '-i', raw, '-af', 'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse' + (fx ? ',' + fx : ''), trimmed]);
    const m = measure(trimmed), heard = await stt(trimmed);
    const okWords = words ? norm(heard).replace(/ /g, '').includes(words.replace(/ /g, '')) : true;
    takes.push({ k, ...m, heard, words: okWords, ok: okWords && m.dur <= max });
  }
  // fallback: no take fits the slot -> the shortest take with the right words
  const best = takes.filter(t => t.ok).sort((a, b) => b.mean - a.mean)[0] || takes.filter(t => t.words).sort((a, b) => a.dur - b.dur)[0];
  if (!best) { console.log(`${name}: NO VALID TAKE`, takes); report[name] = { takes, picked: null }; continue; }
  const speed = best.dur > max ? Math.min(1.2, best.dur / max) : 1; // too long for its slot: speed up (pitch kept), at most 1.2x
  ff(['-y', '-i', path.join(tmp, `${name}-${best.k}.trim.mp3`), '-af', (speed > 1 ? `atempo=${speed.toFixed(3)},` : '') + 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '44100', '-ac', '1', '-b:a', '96k', path.join(here, `${name}.mp3`)]);
  report[name] = { who, voice, text, takes, picked: best.k, speed: +speed.toFixed(3) };
  console.log(`${name.padEnd(8)} pick #${best.k} ${best.dur.toFixed(2)}s ${best.mean} dB | ` + takes.map(t => `${t.ok ? '✓' : '✗'}${t.dur.toFixed(2)}s/${t.mean}dB "${t.heard}"`).join(' · '));
}
fs.writeFileSync(path.join(here, 'takes.json'), JSON.stringify(report, null, 1));
fs.rmSync(tmp, { recursive: true, force: true });
