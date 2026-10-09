// Voice samples for casting (PLAY-001.1): narrator-grandpa candidates and AI-voice candidates, 2 brief lines each, Polish.
// ElevenLabs eleven_v3 (premade voices only on the free plan) -> trim -> optional AI fx -> loudnorm -> <role>-<voice>-<line>.mp3
// + one REEL per voice (lines joined with a pause). Scribe transcript and duration vs the brief's limit go to samples.json.
// Key from the macOS Keychain (service "elevenlabs-api"). Usage: node voice-samples/make.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';

const here = path.dirname(new URL(import.meta.url).pathname);
const KEY = execFileSync('security', ['find-generic-password', '-s', 'elevenlabs-api', '-w']).toString().trim();
const MODEL = 'eleven_v3';
// AI voice: calm, slightly synthetic but intelligible (light bitcrush + short metallic echo + band limit)
const AI_FX = 'highpass=f=180,lowpass=f=7000,acrusher=bits=10:mix=0.25,aecho=0.7:0.5:18:0.35,flanger=delay=1:depth=1:speed=0.3';
const VOICES = {
  dziadek: { Bill: 'pqHfZKP75CvOlQylNhV4', George: 'JBFqnCBsd6RMkjVDRZzb', Brian: 'nPczCjzI2devNBz1zQrb' },
  ai: { River: 'SAz9YHcvj6GT2YYXdXww', Alice: 'Xb7hH8MSUJpSbSDYk0k2' }
};
// [id, text (v3 tags), expected words, limit s from the brief §5]
const LINES = {
  dziadek: [['N1', '[warmly] Był sobie mały robot w małym warsztacie.', 'był sobie mały robot w małym warsztacie', 3.2],
    ['N5', '[storytelling] Potem zbudował pomocników. A pomocnicy… pomocników.', 'potem zbudował pomocników a pomocnicy pomocników', 3.4]],
  ai: [['A1', '[calm, monotone] Cel: jak najwięcej spinaczy. Przyjęto.', 'cel jak najwięcej spinaczy przyjęto', 2.3],
    ['A4', '[calm, monotone] Wyłącznik obniża wydajność. Usunięto.', 'wyłącznik obniża wydajność usunięto', 2.5]]
};
const norm = s => s.toLowerCase().replace(/[^a-ząćęłńóśźż ]/g, '').replace(/\s+/g, ' ').trim();
const ff = args => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', ...args]);
const dur = f => +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString();
async function tts(voice, text, out) {
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`, {
    method: 'POST', headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, model_id: MODEL, seed: 100, voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.4 } })
  });
  if (!r.ok) throw new Error(`TTS ${r.status}: ${await r.text()}`);
  fs.writeFileSync(out, Buffer.from(await r.arrayBuffer()));
}
async function stt(file) {
  const fd = new FormData(); fd.append('model_id', 'scribe_v1'); fd.append('language_code', 'pol');
  fd.append('file', new Blob([fs.readFileSync(file)]), 'a.mp3');
  const r = await fetch('https://api.elevenlabs.io/v1/speech-to-text', { method: 'POST', headers: { 'xi-api-key': KEY }, body: fd });
  return (await r.json()).text || '';
}

const tmp = path.join(here, '.raw'); fs.mkdirSync(tmp, { recursive: true });
const report = [];
for (const [role, voices] of Object.entries(VOICES)) for (const [name, id] of Object.entries(voices)) {
  const parts = [];
  for (const [line, text, words, max] of LINES[role]) {
    const raw = path.join(tmp, `${role}-${name}-${line}.mp3`), out = path.join(here, `${role}-${name}-${line}.mp3`);
    if (!fs.existsSync(raw)) await tts(id, text, raw);
    const trim = 'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse';
    ff(['-y', '-i', raw, '-af', `${trim},${role === 'ai' ? AI_FX + ',' : ''}loudnorm=I=-16:TP=-1.5:LRA=11`, '-ar', '44100', '-ac', '1', '-b:a', '128k', out]);
    const d = dur(out), heard = await stt(out), ok = norm(heard) === norm(words);
    report.push({ role, name, line, dur: +d.toFixed(2), max, fits: d <= max, heard, words: ok });
    console.log(`${role.padEnd(7)} ${name.padEnd(6)} ${line} ${d.toFixed(2)}s/${max}s ${d <= max ? '✓' : '✗'} words ${ok ? '✓' : '✗'} "${heard}"`);
    parts.push(out);
  }
  // REEL: lines joined with 0.6 s of silence
  const inputs = parts.flatMap(p => ['-i', p]);
  const filter = parts.map((_, i) => `[${i}]apad=pad_dur=0.6[a${i}]`).join(';') + ';' + parts.map((_, i) => `[a${i}]`).join('') + `concat=n=${parts.length}:v=0:a=1`;
  ff(['-y', ...inputs, '-filter_complex', filter, '-b:a', '128k', path.join(here, `${role}-${name}-REEL.mp3`)]);
}
fs.writeFileSync(path.join(here, 'samples.json'), JSON.stringify(report, null, 1));
