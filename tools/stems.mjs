// Mix check without ears: renders audio stems (wind, music, vo, sfx, all) via anim.renderAudio(rate, { stem })
// and prints the mean level (dB) of each stem in the given time windows.
// Usage: node tools/stems.mjs <anim.html> "<name>:<from>:<dur>" ... [--reuse]   (WAVs in scratch/stems/)
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { openFilm } from '../kit/harness/harness.mjs';

const args = process.argv.slice(2), html = path.resolve(args[0]), dir = path.resolve('scratch/stems');
const wins = args.slice(1).filter(a => !a.startsWith('--')).map(w => { const [n, a, d] = w.split(':'); return [n, +a, +d]; });
const STEMS = ['wind', 'music', 'vo', 'sfx', 'all'];
fs.mkdirSync(dir, { recursive: true });
if (!args.includes('--reuse')) {
  const { browser, page } = await openFilm(html);
  for (const st of STEMS) {
    const r = await page.evaluate(async st => await window.anim.renderAudio(32000, st === 'all' ? {} : { stem: st }), st);
    fs.writeFileSync(path.join(dir, st + '.wav'), Buffer.from(r.wav, 'base64'));
  }
  await browser.close();
}
const level = (f, a, d) => (/mean_volume: ([-\d.]+)/.exec(spawnSync('ffmpeg', ['-hide_banner', '-ss', String(a), '-t', String(d), '-i', f, '-af', 'volumedetect', '-f', 'null', '-']).stderr.toString()) || [])[1] ?? '?';
console.log('okno'.padEnd(24), STEMS.map(s => s.padStart(7)).join(' '));
for (const [n, a, d] of wins) console.log(n.padEnd(24), STEMS.map(st => String(level(path.join(dir, st + '.wav'), a, d)).padStart(7)).join(' '));
