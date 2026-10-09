// Frame strip: n consecutive frames from t0 every dt seconds, cropped to [x, y, w, h] (logical 480x270 px), scaled ×k.
// For checking MOTION of effects the harness cannot see (wind, dust devils, particles): read the strip, not single stills.
// Usage: node tools/strip.mjs <anim.html> <out.png> <t0> <n> <dt> <x> <y> <w> <h> [k=3] [cols=8]
import { openFilm } from '../kit/harness/harness.mjs';
import fs from 'node:fs';
import path from 'node:path';
const [html, out, t0, n, dt, x, y, w, h, k = 3, cols = 8] = process.argv.slice(2);
const { browser, page, errors } = await openFilm(path.resolve(html));
const data = await page.evaluate(async (t0, n, dt, x, y, w, h, k, cols) => {
  const c = document.createElement('canvas'); const rows = Math.ceil(n / cols); c.width = cols * (w * k + 2); c.height = rows * (h * k + 14); const g = c.getContext('2d'); g.fillStyle = '#333'; g.fillRect(0, 0, c.width, c.height); g.imageSmoothingEnabled = false;
  const src = document.getElementById('screen');
  window.anim.seek(t0);
  for (let i = 0; i < n; i++) { if (i) window.anim.step(Math.round(dt * 60)); const px = (i % cols) * (w * k + 2), py = Math.floor(i / cols) * (h * k + 14); g.drawImage(src, x, y, w, h, px, py + 12, w * k, h * k); g.fillStyle = '#fff'; g.font = '10px monospace'; g.fillText((t0 + i * dt).toFixed(3), px + 2, py + 10); }
  return c.toDataURL('image/png');
}, +t0, +n, +dt, +x, +y, +w, +h, +k, +cols);
fs.writeFileSync(out, Buffer.from(data.split(',')[1], 'base64')); console.log(errors); await browser.close();
