# v7.4: co się zmieniło względem v7.3

> Artefakt v7.4: https://claude.ai/code/artifact/5d99e16b-3314-468b-867d-3959189e6a8b · v7.3: https://claude.ai/code/artifact/a7422c7c-f502-416b-a86f-f3aa524aab8b
> Brief tej wersji: [`BRIEF.md`](BRIEF.md) · różnica briefów: `git diff --no-index ../v7.3-feedback-8/BRIEF.md BRIEF.md` · szczegóły: [`POSTMORTEM.md`](POSTMORTEM.md) · paski klatek: [`strip-devil.png`](strip-devil.png), [`strip-wind-gust.png`](strip-wind-gust.png) · rozpiska: [`TIMELINE.md`](TIMELINE.md)

| # | Uwaga usera | Zmiana | Status |
|---|---|---|---|
| 1 | wiry: fizyka leży, piasek nie krąży, „jakby się paliły” | obrót: ziarna na orbitach wokół osi rysowane jako łuki wzdłuż orbity, powolne wznoszenie, wciąganie piasku przy ziemi, odrywanie styczne u góry i opadanie; lejek szeroki przy ziemi; bez „dymu” | ✅ (pasek 16 klatek co 1/30 s) |
| 2 | podmuchy na wydmach jak wybuchy; ma być stały wiatr ciągnący drobinki, czasem mocniejszy | jedno pole wiatru dla wszystkich planów: stały ciąg drobinek, podmuch = przyspieszenie i zagęszczenie strumienia; bez pióropuszy | ✅ (spokój 18,5 s vs podmuch 20,2 s) |
| — | (proces) efekty ruchu sprawdzane na stopklatkach | nowe narzędzie [`tools/strip.mjs`](../../../tools/strip.mjs): pasek kolejnych klatek z powiększeniem; krok walidacji w `CLAUDE.md` | ✅ |

**Testy:** 41/41, zdarzenia jak w v7.3 (uprząż nie widzi efektów tła; ruch sprawdzony paskami klatek). **Niesprawdzone:** odbiór ruchu na żywo przy pełnej prędkości.
