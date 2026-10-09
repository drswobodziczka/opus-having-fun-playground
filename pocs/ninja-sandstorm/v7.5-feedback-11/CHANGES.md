# v7.5: co się zmieniło względem v7.4

> Artefakt v7.5: https://claude.ai/code/artifact/d6769840-da54-4228-a190-d7faa7ce8430 · v7.4: https://claude.ai/code/artifact/5d99e16b-3314-468b-867d-3959189e6a8b
> Brief tej wersji: [`BRIEF.md`](BRIEF.md) · różnica briefów: `git diff --no-index ../v7.4-feedback-9/BRIEF.md BRIEF.md` · szczegóły: [`POSTMORTEM.md`](POSTMORTEM.md) · rozpiska: [`TIMELINE.md`](TIMELINE.md)

| # | Uwaga usera | Zmiana | Status |
|---|---|---|---|
| 1 | czy słyszymy wichurę? szum stały, większy przy podmuchach, obecny, ale nie zagłuszający | wcześniej szum ok. 20 dB pod muzyką i bez podmuchów (praktycznie niesłyszalny). Teraz dźwięk wiatru z tego samego pola wiatru co obraz: stały szum, przy podmuchu głośniej i jaśniej + świst, „szuuu” przy każdym podmuchu na arenie | ✅ (zmierzone, nieodsłuchane) |

**Pomiar (`tools/stems.mjs`, poziom średni w oknie):** spokój: wiatr −33,5 dB vs muzyka −23,5 dB (10 dB pod) · najgłośniejszy podmuch: −25,6 vs −23,8 dB (1,8 dB pod) · walka 15–21 s: −28,3 vs −25,2 dB (3 dB pod) · kwestia FINISH HIM: wiatr 12 dB pod lektorem.
**Testy:** 41/41, obraz bez zmian. **Niesprawdzone:** barwa wiatru i świstu, odbiór miksu uchem.
