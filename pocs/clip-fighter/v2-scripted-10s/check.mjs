import puppeteer from 'puppeteer-core';
const exe = process.env.HOME + '/.cache/puppeteer/chrome-headless-shell/mac_arm-131.0.6778.204/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const browser = await puppeteer.launch({ executablePath: exe, headless: 'shell' });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => m.type() === 'error' && errors.push(m.text()));
await page.goto('file://' + process.cwd() + '/clip-fighter.html?t=0', { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
// state trace every 0.25 s
const trace = await page.evaluate(() => {
  const out = [];
  for (let t = 0; t < 10; t += 0.25) { window.clipFighter.seek(t); out.push(window.clipFighter.state()); }
  return out;
});
for (const s of trace) console.log(s.T.toFixed(2), s.phase.padEnd(6), 'GEM', s.gem.x, s.gem.y, s.gem.hp, s.gem.s.padEnd(7), '| OWL', s.owl.x, s.owl.y, s.owl.hp, s.owl.s.padEnd(7), 'staples', s.staples, s.winner || '');
// contact sheet
const times = [0.6, 1.5, 1.85, 2.32, 3.4, 4.12, 5.18, 5.75, 6.45, 7.05, 7.4, 7.9, 9.0, 9.6, 0.05, 1.4];
const png = await page.evaluate(async (times) => {
  const src = document.getElementById('screen');
  const cols = 4, w = 320, h = 180, pad = 4;
  const sheet = document.createElement('canvas');
  sheet.width = cols * (w + pad); sheet.height = Math.ceil(times.length / cols) * (h + 14 + pad);
  const c = sheet.getContext('2d');
  c.fillStyle = '#555'; c.fillRect(0, 0, sheet.width, sheet.height);
  times.forEach((t, i) => {
    window.clipFighter.seek(t);
    const x = (i % cols) * (w + pad), y = Math.floor(i / cols) * (h + 14 + pad);
    c.drawImage(src, x, y + 14);
    c.fillStyle = '#fff'; c.font = '11px monospace'; c.fillText('t=' + t, x + 2, y + 11);
  });
  return sheet.toDataURL('image/png');
}, times);
const fs = await import('fs');
fs.writeFileSync('sheet.png', Buffer.from(png.split(',')[1], 'base64'));
// one full-page shot at phone width
await page.setViewport({ width: 400, height: 900, deviceScaleFactor: 1 });
await page.evaluate(() => window.clipFighter.seek(5.75));
await page.screenshot({ path: 'phone.png', fullPage: true });
console.log('errors:', errors.length ? errors : 'none');
await browser.close();
