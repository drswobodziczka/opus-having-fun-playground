// TIMELINE v2: a readable, scene-grouped dope sheet generated from the animation (source of truth = window.anim).
// Scenes (S1..Sn, times) come from anim.scenes(); their CO / JAK / PO CO descriptions and the cast from scenes.json
// (looked up next to the HTML, then in parent folders, or --scenes=path).
// Usage: node tools/timeline.mjs <anim.html> [title] [--gl] [--scenes=path/scenes.json]
import fs from 'node:fs';
import path from 'node:path';
import { openFilm } from '../kit/harness/harness.mjs';

const args = process.argv.slice(2), flags = args.filter(a => a.startsWith('--')), pos = args.filter(a => !a.startsWith('--'));
const html = path.resolve(pos[0]);
const title = pos[1] || path.basename(path.dirname(html));
const scenesArg = flags.find(f => f.startsWith('--scenes='))?.split('=')[1];
function findScenes() {
  if (scenesArg) return path.resolve(scenesArg);
  for (let d = path.dirname(html), i = 0; i < 4; i++, d = path.dirname(d)) if (fs.existsSync(path.join(d, 'scenes.json'))) return path.join(d, 'scenes.json');
  return null;
}
const scenesFile = findScenes();
const meta = scenesFile ? JSON.parse(fs.readFileSync(scenesFile, 'utf8')) : { cast: {}, scenes: {} };

const { browser, page } = await openFilm(html, { gl: flags.includes('--gl') });
const data = await page.evaluate(() => {
  const a = window.anim, dur = a.duration;
  a.seek(dur - 0.05);
  const ev = a.events(), sc = a.script ? a.script() : [], scenes = a.scenes ? a.scenes() : [];
  const st = []; for (let s = 0; s < dur; s++) { a.seek(s + 0.5); st.push(a.state()); }
  return { dur, ev, sc, st, scenes };
});
await browser.close();

/* ---------- words ---------- */
const NAME = id => id == null ? '' : String(meta.cast[id] || id).split(' (')[0];
const ACT = {
  run: 'biegnie', jump: 'skacze', jab: 'prosty', cross: 'prosty tylną ręką', kick: 'kopnięcie', highkick: 'wysokie kopnięcie',
  uppercut: 'podbródkowy', sweep: 'podcięcie', step: 'krok', getup: 'wstaje', choke: 'duszenie (SAND COBRA)', elbow: 'łokieć',
  flip: 'salto (unik)', knee: 'kolano', parry: 'parowanie', catch: 'łapie pięść', monsoon: 'BLACK MONSOON', laugh: 'śmieje się',
  throw: 'rzut (DUNE BREAKER)', blink: 'teleport z ciosem', heartrip: 'fatality (SPINE OF THE STORM)', collapse: 'osuwa się', winpose: 'poza zwycięzcy'
};
const RES = { hit: 'trafia', block: 'zablokowany', miss: 'pudło', stun: 'ogłusza' };
const SYS = {
  round: e => `🔔 runda`, banner: e => `📣 „${e.text || ''}”`, special: e => `💥 cios specjalny „${e.text || ''}”`, lightning: () => '⚡ piorun',
  transition: () => '🌫️ przejście (ściana piasku → noc)', style: () => '🎨 zmiana stylu/światła', roundwin: () => '🏆 runda wygrana',
  clash: () => '💢 zderzenie w powietrzu', bury: () => '⏳ piasek zasypuje', fade: () => '⬛ wyciemnienie', cue: () => null, music: () => null, scene: () => null
};
const fmtScript = e => {
  if (e.who === 'SYS') { const f = SYS[e.act]; const s = f ? f(e) : `🎬 ${e.act}`; return s && `\`${e.id}\` ${e.t.toFixed(2)} ${s}`; }
  const res = e.res ? ` → ${RES[e.res] || e.res}${e.dmg ? ` (−${e.dmg})` : ''}` : '';
  return `\`${e.id}\` ${e.t.toFixed(2)} **${NAME(e.who)}**: ${ACT[e.act] || e.act}${res}`;
};
const LOG = {
  knockdown: e => `${NAME(e.who)} leży`, grab: e => `chwyt ${NAME(e.by)} (${e.move || ''})`, 'choke-break': () => 'duszenie zerwane',
  parry: e => `${NAME(e.by)} paruje`, catch: e => `${NAME(e.by)} łapie pięść`, armlock: e => `dźwignia na rękę`,
  ko: e => `**K.O. ${NAME(e.to)}**`, stun: e => `${NAME(e.to)} ogłuszony`, impact: e => `uderzenie o ziemię (−${e.dmg})`,
  'throw-impact': () => 'lądowanie na głowie', topple: () => 'przewraca się na plecy', blink: e => `teleport${e.by || e.who ? ' ' + NAME(e.by || e.who) : ''}`,
  heart: () => 'kontakt: fatality', 'spine-out': () => 'głowa z kręgosłupem wyrwana', fall: () => 'ciało pada', winpose: () => 'lądowanie superbohatera',
  release: () => 'wyrzut nad głową', land: e => `${NAME(e.who)} ląduje`
};
const camWords = c => {
  if (!c) return '';
  const z = c.zoom, r = Math.abs(c.rot);
  const plan = z >= 1.9 ? `zbliżenie ×${z}` : z >= 1.35 ? `bliżej ×${z}` : z <= 1.05 ? 'szeroko' : `plan ×${z}`;
  return r > 0.05 ? `${plan} · obrót ${c.rot}` : plan;
};
const pad = (n, w = 2) => String(n).padStart(w, '0');
const mmss = s => `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}`;
const hpOf = st => ['B', 'A'].filter(k => st[k]).map(k => `${k} ${st[k].hp}`).join(' · ');

/* ---------- rows per second, grouped by scene, empty seconds collapsed ---------- */
const scenes = data.scenes.length ? data.scenes : [{ id: '—', t0: 0, t1: data.dur, name: title }];
const sec = s => {
  const sc = data.sc.filter(e => e.t >= s && e.t < s + 1).map(fmtScript).filter(Boolean);
  const lg = data.ev.filter(e => e.t >= s && e.t < s + 1 && LOG[e.type]).map(e => LOG[e.type](e));
  const chips = data.ev.filter(e => e.t >= s && e.t < s + 1 && e.type === 'chip').length;
  if (chips) lg.push(`duszenie odbiera HP ×${chips}`);
  return { s, what: sc, result: [...new Set(lg)], cam: camWords(data.st[s]?.cam), hp: hpOf(data.st[s] || {}) };
};
let toc = '', body = '';
for (const S of scenes) {
  const m = meta.scenes[S.id] || {};
  toc += `| [${S.id}](#${S.id.toLowerCase()}) | ${mmss(S.t0)}–${mmss(S.t1)} | ${S.name} | ${m.poco || '·'} |\n`;
  body += `\n## ${S.id}\n**${S.name}** · ${mmss(S.t0)}–${mmss(S.t1)} (${(S.t1 - S.t0).toFixed(1)} s)\n\n`;
  if (m.co || m.jak || m.poco) body += `- **CO:** ${m.co || '·'}\n- **JAK:** ${m.jak || '·'}\n- **PO CO:** ${m.poco || '·'}\n\n`;
  body += `| t | Co się dzieje (scenariusz) | Wynik (log) | Kamera | HP |\n|---|---|---|---|---|\n`;
  let empty = null;
  const flush = () => { if (empty) { body += `| ${mmss(empty.a)}${empty.b > empty.a ? '–' + mmss(empty.b) : ''} | · | · | ${empty.cam} | ${empty.hp} |\n`; empty = null; } };
  for (let s = Math.floor(S.t0); s < Math.ceil(S.t1) && s < data.dur; s++) {
    if (s < S.t0 - 0.001 && scenes.some(o => o !== S && s >= o.t0 && s < o.t1)) continue; // second belongs to the previous scene
    const r = sec(s);
    if (!r.what.length && !r.result.length) { if (empty && empty.hp === r.hp) empty.b = s; else { flush(); empty = { a: s, b: s, cam: r.cam, hp: r.hp }; } continue; }
    flush();
    body += `| ${mmss(s)} | ${r.what.join('<br>') || '·'} | ${r.result.join('<br>') || '·'} | ${r.cam} | ${r.hp} |\n`;
  }
  flush();
}
const cast = Object.entries(meta.cast).map(([k, v]) => `**${k}** = ${v}`).join(' · ');
const md = `# TIMELINE: ${title}

> **Wygenerowane z animacji** (\`node tools/timeline.mjs\`), więc zawsze zgodne z kodem. Opisy scen (CO / JAK / PO CO): [\`${path.relative(path.dirname(html), scenesFile || '') || 'brak scenes.json'}\`](${scenesFile ? path.relative(path.dirname(html), scenesFile) : ''}).
> Czytaj: scena → co ma się dziać i po co → sekunda po sekundzie. **Scenariusz** = co reżyseruje kod (\`E042\` = ID zdarzenia, do poprawek), **Wynik** = co faktycznie zaszło. Puste sekundy są zwinięte.
> Poprawki: \`S6 …\`, \`@41.2 …\` albo \`E087 …\` ([\`EDIT-PROTOCOL\`](../../../docs/EDIT-PROTOCOL.md)).${cast ? `\n> Obsada: ${cast}.` : ''}

| Scena | Czas | Nazwa | PO CO |
|---|---|---|---|
${toc}${body}`;
const out = path.join(path.dirname(html), 'TIMELINE.md');
fs.writeFileSync(out, md);
console.log(`${path.relative(process.cwd(), out)}: ${scenes.length} scenes, ${data.sc.length} script events, ${data.ev.length} log events${scenesFile ? '' : ' (no scenes.json)'}`);
