// score.mid -> music.wav (60 s, 44.1 kHz stereo) with the GeneralUser GS soundfont, in pure JS (spessasynth_core).
// Usage: node music/render.mjs [path/to/GeneralUser-GS.sf2]   (default: ~/.cache/soundfonts/GeneralUser-GS.sf2)
// Then: ffmpeg -i music/music.wav -af loudnorm=I=-18:TP=-1.5 -ac 1 -b:a 96k music/music.mp3
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { audioToWav, BasicMIDI, SoundBankLoader, SpessaSynthProcessor, SpessaSynthSequencer } from 'spessasynth_core';

const here = path.dirname(new URL(import.meta.url).pathname);
const sfPath = process.argv[2] || path.join(os.homedir(), '.cache', 'soundfonts', 'GeneralUser-GS.sf2');
const DUR = 60, RATE = 44100, BUF = 128;

const sf = fs.readFileSync(sfPath), mid = fs.readFileSync(path.join(here, 'score.mid'));
const synth = new SpessaSynthProcessor(RATE, { eventsEnabled: false });
synth.soundBankManager.addSoundBank(SoundBankLoader.fromArrayBuffer(sf.buffer.slice(sf.byteOffset, sf.byteOffset + sf.byteLength)), 'main');
await synth.processorInitialized;
synth.setSystemParameter('autoAllocateVoices', true);
const seq = new SpessaSynthSequencer(synth);
seq.loadNewSongList([BasicMIDI.fromArrayBuffer(mid.buffer.slice(mid.byteOffset, mid.byteOffset + mid.byteLength))]);
seq.play();

const n = DUR * RATE, L = new Float32Array(n), R = new Float32Array(n), t0 = Date.now();
for (let done = 0; done < n; done += BUF) { seq.processTick(); synth.process(L, R, done, Math.min(BUF, n - done)); }
fs.writeFileSync(path.join(here, 'music.wav'), new Uint8Array(audioToWav([L, R], RATE)));
console.log(`music.wav: ${DUR} s rendered in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
