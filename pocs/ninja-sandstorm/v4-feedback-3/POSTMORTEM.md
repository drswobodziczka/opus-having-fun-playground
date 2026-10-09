# v4: szczegóły rundy (postmortem)

> Dawny gruby `CHANGES.md` (do 2026-10-09). Krótki widok zmian: [`CHANGES.md`](CHANGES.md), brief tej wersji: [`BRIEF.md`](BRIEF.md).
> Runda 2026-10-07. Artefakt v4: https://claude.ai/code/artifact/f860679c-12f5-4d5a-a761-28fcb378472d · v3: https://claude.ai/code/artifact/b3b82263-0c8a-4856-b229-96069f5e3bd9
> Porównanie v3 | v4: [`compare-v3-v4.png`](compare-v3-v4.png) · arkusz S3: [`sheet-s3.png`](sheet-s3.png) · przegląd: [`sheet-story.png`](sheet-story.png) · rozpiska: [`TIMELINE.md`](TIMELINE.md) · rewizje decyzji: [`../BRIEF.md` §8](../BRIEF.md)

| # | Uwaga usera | Zmiana | Status |
|---|---|---|---|
| 1 | `[styl]` cały film w kresce pierwszej części, R2 nocą z piorunami | jedna kreska tuszu; noc: papier w ciemnym laserunku (multiply, włókna zostają), księżyc z papieru, nocne wydmy, jasne smugi burzy, **pioruny** (jasne pęknięcie + rozbłysk papieru + sylwetki), poświata na krawędziach postaci, jaśniejszy BISHUKIJ, HUD na pasku papieru, banery z obwódką papieru | ✅ |
| 2 | `@9` zamiast salta podcięcie z pełnym obrotem | `sweep`: kucnięcie pod wysokim kopnięciem (zwolnienie 0,35× przez 0,25 s), obrót 360° z nogą przy ziemi, trafienie w kostki → `swept`: ALAMANDRO pada na plecy (9,3–9,7 s) i wstaje. Kolejne ruchy S3 przesunięte | ✅ |
| 3 | `[muzyka]` chińska muzyka kung-fu zamiast pikania | sekwencer 32 kroki, pentatonika D: guzheng/pipa (Karplus-Strong), erhu (piła + wibrato + podjazd), tanggu, woodblock, gong co 64 kroki; intro wolniej (gong, erhu, rzadkie szarpnięcia) | ✅ (zmierzone, nieodsłuchane) |
| 4 | `[fatality]` kręgosłup zamiast serca (MK) | chwyt za głowę → wyrwanie głowy z kręgosłupem (łańcuch 10 kręgów kołyszący się jak wahadło, krew), ciało bez głowy pada; lektor „Spine of the storm!” (nowa kwestia `say` + ffmpeg) | ✅ |
| — | (znalezione) napisy końcowe nachodziły na siebie | „THE STORM CHOSE BLACK.” po zniknięciu „ALAMANDRO WINS” | ✅ |
| — | (proces) zmiana stylu bez odświeżenia briefu | BRIEF §8 „Rewizje” | ✅ |

## Weryfikacja
- Uprząż **40/40** (nowe: jeden styl przez cały film z nocną rundą 2, podcięcie przewracające ALAMANDRO).
- Skan klatka po klatce: brak przeskoków ≥ 60 px; największe to szybkie ciosy monsunu (45 px).
- Arkusze: S3 (16 klatek) i przegląd całego filmu (16 chwil). MP4 z dźwiękiem: średnio −25,4 dB, szczyt −4 dB, równo przez cały film (poza przejściem 27–30 s z samym wiatrem).
- **Nie sprawdziłem:** brzmienia nowej muzyki i tego, jak bardzo jest „chińska”. Model nie słyszy, więc ocena należy do usera.
