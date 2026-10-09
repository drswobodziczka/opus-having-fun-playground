# WebGL v2: co się zmieniło względem v1 (spike S6 + S8)

> Artefakt v2: https://claude.ai/code/artifact/7bd123a7-1ca1-4dd6-a101-631cf04100d6 · v1 (spike): https://claude.ai/code/artifact/9a209cbf-154b-42cb-9f36-936ef317fba3
> Brief: [`BRIEF.md`](BRIEF.md) · szczegóły: [`POSTMORTEM.md`](POSTMORTEM.md) · porównania v7.5 | v2: [`compare-v75-v2-a.png`](compare-v75-v2-a.png), [`compare-v75-v2-b.png`](compare-v75-v2-b.png) · samouczek: [`docs/webgl-tutorial.md`](../../../docs/webgl-tutorial.md) · rozpiska: [`TIMELINE.md`](TIMELINE.md)

| # | Decyzja usera (2026-10-10) | Zmiana | Status |
|---|---|---|---|
| 1 | port całego filmu | symulacja, scenariusz, kamera i dźwięk = ninja v7.5 (z wiatrem, wirami, stopami, wichurą); render WebGL na całe 60 s | ✅ |
| 2 | 4 nowe efekty + samouczek z obrazkami | falowanie powietrza, promienie przez pył, grading LUT, fala uderzeniowa + rozmycie promieniste; samouczek z 12 parami „bez / z” | ✅ |
| 3 | piasek ładniejszy, ta sama mechanika | piasek GPU napędzany polem wiatru v7.5 (drobniejszy, 4000 ziaren, więcej w podmuchach, błyski) zamiast niezależnego piasku ze spike'a | ✅ (za dnia subtelny) |
| 4 | artefakt + arkusze porównań, MP4 później | 2 arkusze v7.5 | v2 (12 chwil), paski klatek; MP4 jako follow-up | ✅ |
| — | (narzędzia) uprząż na GPU | pełny Chrome headless przez Metal (M3 Pro): cała uprząż 14 s zamiast ~9 min | ✅ |

**Testy:** 18/18 (zdarzenia i pozy = v7.5 na całym filmie, WebGL na GPU, piorun, dzień/noc, widzialność, skan klatek, powtórka). **Niesprawdzone:** płynność na żywo, odbiór fali uderzeniowej w ruchu, MP4.
