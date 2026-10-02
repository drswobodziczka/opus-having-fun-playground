// Renders a labeled contact sheet of given moments, optionally BEFORE vs AFTER (git ref).
// Usage: node tools/frames.mjs <anim.html> <t1> [t2 ...] [--before=HEAD] [--out=file.png]
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const html = path.resolve(args[0]);
const times = args.slice(1).filter(a => !a.startsWith('--')).map(Number);
const before = (args.find(a => a.startsWith('--before=')) || '').split('=')[1];
const out = path.resolve((args.find(a => a.startsWith('--out=')) || `--out=${path.join(path.dirname(html), 'frames.png')}`).split('=')[1]);
function findChrome() {
  const root = path.join(os.homedir(), '.cache', 'puppeteer', 'chrome-headless-shell');
  for (const v of fs.readdirSync(root).filter(d => !d.startsWith('.')).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))) {
    const dir = fs.readdirSync(path.join(root, v)).find(d => d.startsWith('chrome-headless-shell'));
    const exe = dir && path.join(root, v, dir, 'chrome-headless-shell');
    if (exe && fs.existsSync(exe)) return exe;
  }
  throw new Error('No chrome-headless-shell in ~/.cache/puppeteer');
}
const sources = [['AFTER', html]];
if (before) {
  const repo = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: path.dirname(html) }).toString().trim();
  const old = execFileSync('git', ['show', `${before}:${path.relative(repo, html)}`], { cwd: repo, maxBuffer: 64 << 20 });
  const tmp = path.join(path.dirname(html), '.before.html'); fs.writeFileSync(tmp, old);
  sources.unshift([`BEFORE (${before})`, tmp]);
}
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: 'shell' });
const shots = [];
for (const [label, file] of sources) {
  const page = await browser.newPage();
  await page.goto('file://' + file + '?t=0', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  shots.push([label, await page.evaluate(ts => ts.map(t => { window.anim.seek(t); return document.getElementById('screen').toDataURL('image/png'); }), times)]);
  await page.close();
}
const page = await browser.newPage();
const sheet = await page.evaluate(async (shots, times) => {
  const imgs = await Promise.all(shots.map(([, list]) => Promise.all(list.map(src => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = src; })))));
  const w = imgs[0][0].width, h = imgs[0][0].height, lh = 16, pad = 4;
  const c = document.createElement('canvas'); c.width = shots.length * (w + pad); c.height = times.length * (h + lh + pad);
  const x = c.getContext('2d'); x.fillStyle = '#222'; x.fillRect(0, 0, c.width, c.height);
  times.forEach((t, r) => shots.forEach(([label], col) => {
    const px = col * (w + pad), py = r * (h + lh + pad);
    x.drawImage(imgs[col][r], px, py + lh); x.fillStyle = '#fff'; x.font = '12px monospace'; x.fillText(`${label}  t=${t}`, px + 3, py + 12);
  }));
  return c.toDataURL('image/png');
}, shots, times);
await browser.close();
fs.rmSync(path.join(path.dirname(html), '.before.html'), { force: true });
fs.writeFileSync(out, Buffer.from(sheet.split(',')[1], 'base64'));
console.log(`${path.relative(process.cwd(), out)}: ${times.length} moments × ${shots.length} version(s)`);
