// Generates a second-by-second dope sheet (TIMELINE.md) from a PoC animation.
// Source of truth = the animation itself: window.anim.script(), .events(), .state().
// Usage: node tools/timeline.mjs <path/to/anim.html> [title]
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const html = path.resolve(process.argv[2]);
const title = process.argv[3] || path.basename(path.dirname(html));
function findChrome() {
  const root = path.join(os.homedir(), '.cache', 'puppeteer', 'chrome-headless-shell');
  for (const v of fs.readdirSync(root).filter(d => !d.startsWith('.')).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))) {
    const dir = fs.readdirSync(path.join(root, v)).find(d => d.startsWith('chrome-headless-shell'));
    const exe = dir && path.join(root, v, dir, 'chrome-headless-shell');
    if (exe && fs.existsSync(exe)) return exe;
  }
  throw new Error('No chrome-headless-shell in ~/.cache/puppeteer');
}
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: 'shell' });
const page = await browser.newPage();
await page.goto('file://' + html + '?t=0', { waitUntil: 'networkidle0' });
const data = await page.evaluate(() => {
  const a = window.anim, dur = a.duration;
  a.seek(dur - 0.05);
  const ev = a.events(), sc = a.script ? a.script() : [];
  const st = []; for (let s = 0; s < dur; s++) { a.seek(s + 0.5); st.push(a.state()); }
  return { dur, ev, sc, st };
});
await browser.close();

const pad = (n, w = 2) => String(n).padStart(w, '0');
const mmss = s => `${pad(Math.floor(s / 60))}:${pad(Math.floor(s % 60))}`;
const fighters = st => Object.entries(st).filter(([k, v]) => v && typeof v === 'object' && 'hp' in v);
const fmtScript = e => {
  if (e.who === 'SYS') return e.text ? `🎬 ${e.act} „${e.text}”` : `🎬 ${e.act}`;
  return `**${e.who}** ${e.act}${e.res ? ` → ${e.res}` : ''}${e.dmg ? ` (${e.dmg})` : ''}`;
};
const fmtEvent = e => {
  switch (e.type) {
    case 'hit': case 'chip': case 'slam': case 'impact': return `${e.by}→${e.to} ${e.type}${e.move ? ' ' + e.move : ''} −${e.dmg}${e.dist !== undefined ? ` @${e.dist}px` : ''}`;
    case 'block': case 'miss': return `${e.by}→${e.to} ${e.type}`;
    case 'ko': return `**K.O. ${e.to}**${e.by ? ' by ' + e.by : ''}`;
    case 'banner': return `📣 ${e.text}`;
    case 'camera': return `🎥 ${e.move}`;
    case 'scene': case 'style': case 'round': return `🎬 ${e.type} ${e.name || e.style || e.n}`;
    default: return [e.type, e.by && `${e.by}→${e.to || ''}`, e.move, e.who, e.text].filter(Boolean).join(' ');
  }
};
const rows = [];
for (let s = 0; s < data.dur; s++) {
  const sc = data.sc.filter(e => e.t >= s && e.t < s + 1);
  const ev = data.ev.filter(e => e.t >= s && e.t < s + 1 && !['scene', 'style', 'round', 'banner'].includes(e.type) || (e.t >= s && e.t < s + 1 && e.type === 'banner'));
  const st = data.st[s];
  const scene = [st.scene, st.style].filter(Boolean).join(' / ');
  const camv = st.cam ? Object.entries(st.cam).filter(([k]) => k !== 'x').map(([k, v]) => `${k} ${v}`).join(', ') : '';
  const hp = fighters(st).map(([k, v]) => `${k} ${v.hp}`).join(' · ');
  rows.push(`| ${mmss(s)} | ${scene} | ${camv} | ${sc.map(e => `\`${e.id}\` ${e.t.toFixed(2)} ${fmtScript(e)}`).join('<br>') || '·'} | ${ev.map(fmtEvent).join('<br>') || '·'} | ${hp} |`);
}
const md = `# TIMELINE: ${title}

> **Wygenerowane z animacji** (\`node tools/timeline.mjs ${path.relative(process.cwd(), html)}\`), nie pisane ręcznie, więc zawsze zgodne z kodem.
> Kolumny: **Scenariusz** = co reżyseruje kod (ID zdarzenia + czas startu), **Wynik** = co się faktycznie wydarzyło (log), stan kamery i HP w połowie sekundy.
> Poprawki zgłaszaj wg [\`docs/EDIT-PROTOCOL.md\`](../../../docs/EDIT-PROTOCOL.md), np. \`@41.2 rzut wyżej\` albo \`E087 wolniej\`.

| t | Scena | Kamera | Scenariusz | Wynik | HP |
|---|---|---|---|---|---|
${rows.join('\n')}
`;
const out = path.join(path.dirname(html), 'TIMELINE.md');
fs.writeFileSync(out, md);
console.log(`${path.relative(process.cwd(), out)}: ${data.dur} s, ${data.sc.length} script events, ${data.ev.length} log events`);
