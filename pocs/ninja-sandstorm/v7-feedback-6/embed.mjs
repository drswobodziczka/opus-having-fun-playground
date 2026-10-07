// Embeds vo/*.mp3 (VO object) and music/music.mp3 (MUSIC) into storm.html as data URIs.
// Usage: node embed.mjs
import fs from 'node:fs';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const file = path.join(here, 'storm.html');
const uri = f => 'data:audio/mpeg;base64,' + fs.readFileSync(f).toString('base64');
let html = fs.readFileSync(file, 'utf8');

const vo = fs.readdirSync(path.join(here, 'vo')).filter(f => f.endsWith('.mp3')).sort()
  .map(f => `    ${path.basename(f, '.mp3')}: '${uri(path.join(here, 'vo', f))}'`).join(',\n');
html = html.replace(/  const VO = \{\n[\s\S]*?\n  \};\n/, () => `  const VO = {\n${vo}\n  };\n`);
html = html.replace(/  const MUSIC = '[^']*';\n/, () => `  const MUSIC = '${uri(path.join(here, 'music', 'music.mp3'))}';\n`);

fs.writeFileSync(file, html);
console.log(`storm.html: ${(html.length / 1024).toFixed(0)} kB`);
