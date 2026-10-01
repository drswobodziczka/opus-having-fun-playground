# opus-having-fun-playground

Poligon do generowania animacji **kodem** przez agenta AI (Claude): temat i styl na wejściu, deterministyczna animacja HTML/Canvas na wyjściu, weryfikacja headless i publikacja jako artefakt Claude.

## Struktura
| Ścieżka | Co tam jest |
|---|---|
| `pocs/<temat>/<vN-opis>/` | kolejne PoC-e: animacja (`*.html`), uprząż testowa, wyniki testów, `POSTMORTEM.md` |
| `docs/toolbox.md` | narzędzia w użyciu + backlog warsztatowy (czego chcemy spróbować) |
| `.windsurf/project_tasks/PLAY-001_*` | zadanie: seria PoC-ów animacji |
| `.windsurf/project_tasks/ANIM-001_*` | zadanie: skill do tworzenia animacji (wyrasta z PoC-ów) |

## PoC-e
| PoC | Opis | Artefakt |
|---|---|---|
| [Clip Fighter v1](pocs/clip-fighter/v1-random-ai/) | 1-bit, dwa spinacze, losowe AI, mecz do 2 wygranych | [link](https://claude.ai/code/artifact/672d6377-e1c6-408c-8b70-f494e1560ff6) |
| [Clip Fighter v2](pocs/clip-fighter/v2-scripted-10s/) | scenariusz 10 s, determinizm, suwak, uprząż `check.mjs` | [link](https://claude.ai/code/artifact/c7b43edd-a1ff-49a2-b674-86631529a9f1) |

Artefakty są prywatne. Kod każdej animacji to samowystarczalny plik HTML, który otworzysz lokalnie w przeglądarce.

## Uruchom uprząż testową
```bash
npm install                       # puppeteer-core
cd pocs/clip-fighter/v2-scripted-10s && node check.mjs
```
Wymaga Chrome headless shell w `~/.cache/puppeteer` (`npx @puppeteer/browsers install chrome-headless-shell@stable`).
