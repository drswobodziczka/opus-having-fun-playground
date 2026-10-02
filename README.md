# opus-having-fun-playground

Poligon do generowania animacji **kodem** przez agenta AI (Claude): temat i styl na wejściu, deterministyczna animacja HTML/Canvas na wyjściu, weryfikacja headless i publikacja jako artefakt Claude.

## Struktura
| Ścieżka | Co tam jest |
|---|---|
| `pocs/<temat>/<vN-opis>/` | kolejne PoC-e: animacja (`*.html`), uprząż testowa, wyniki testów, `POSTMORTEM.md` |
| `docs/toolbox.md` | narzędzia w użyciu + backlog warsztatowy (czego chcemy spróbować) |
| `docs/ideas-webgl.md` | backlog pomysłów na prawdziwe 3D |
| `docs/EDIT-PROTOCOL.md` | **szybkie poprawki:** `@41.2 co zmienić` → zmiana → asercje → arkusz PRZED/PO |
| `tools/timeline.mjs` | generuje `TIMELINE.md` (sekunda po sekundzie) z samej animacji |
| `tools/frames.mjs` | arkusz klatek w podanych sekundach, PRZED (git) obok PO |
| `pocs/GLOSSARY.md` | słowniczek (trace, arkusz klatek, paralaksa, rzuty aksonometryczne…) |
| `.windsurf/project_tasks/PLAY-001_*` | zadanie: seria PoC-ów animacji |
| `.windsurf/project_tasks/ANIM-001_*` | zadanie: skill do tworzenia animacji (wyrasta z PoC-ów) |

## PoC-e
| PoC | Opis | Artefakt |
|---|---|---|
| [Clip Fighter v1](pocs/clip-fighter/v1-random-ai/) | 1-bit, dwa spinacze, losowe AI, mecz do 2 wygranych | [link](https://claude.ai/code/artifact/672d6377-e1c6-408c-8b70-f494e1560ff6) |
| [Clip Fighter v2](pocs/clip-fighter/v2-scripted-10s/) | scenariusz 10 s, determinizm, suwak, uprząż `check.mjs` | [link](https://claude.ai/code/artifact/c7b43edd-a1ff-49a2-b674-86631529a9f1) |
| [Paper Cuts Super Turbo V v1](pocs/paperclip-vs-pencil/v1-pixel-120s/) | 2:00, spinacz vs ołówek, pixel 384×224, 4 zwroty, 2 obroty kamery, Web Audio, uprząż v1 + MP4 | [link](https://claude.ai/code/artifact/7d5a22e9-28d4-4f72-a1e0-b7b8db8180a0) |
| [The Storm Chose Black v1](pocs/ninja-sandstorm/v1-ink-pixel-60s/) | 1:00, dwóch ninja, tusz sumi-e → mroczny piksel, rig z IK, kamera z ujęciami, lektor `say`+ffmpeg, MP4 z dźwiękiem | [link](https://claude.ai/code/artifact/5dfacc58-2d7a-40aa-a5ae-83c6f9d9ee73) |

Artefakty są prywatne. Kod każdej animacji to samowystarczalny plik HTML, który otworzysz lokalnie w przeglądarce.

## Uruchom uprząż testową
```bash
npm install                       # puppeteer-core
cd pocs/paperclip-vs-pencil/v1-pixel-120s && node check.mjs --mp4   # asercje + arkusz + MP4 (ffmpeg)
```
Wymaga Chrome headless shell w `~/.cache/puppeteer` (`npx @puppeteer/browsers install chrome-headless-shell@stable`).
