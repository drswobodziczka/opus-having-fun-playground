# v7: co się zmieniło względem v6

> Artefakt v7: https://claude.ai/code/artifact/89d0d482-499c-4268-b6ce-5c3b47909a52 · v6: https://claude.ai/code/artifact/d33f1513-81fc-42a0-87b0-9215922a3fe4
> Brief tej wersji: [`BRIEF.md`](BRIEF.md) · różnica briefów: `git diff --no-index ../v6-feedback-5/BRIEF.md BRIEF.md` · szczegóły i lekcje: [`POSTMORTEM.md`](POSTMORTEM.md) · rozpiska: [`TIMELINE.md`](TIMELINE.md)

| # | Uwaga usera | Zmiana | Status |
|---|---|---|---|
| 1 | [bug] po powtórce BISHUKIJ z ręką w górze i wytrzeszczem | reset stanu postaci przy restarcie + nowy test powtórki | ✅ |
| 2 | więcej emocji w głosie (v3) | najbardziej ekspresyjne ustawienie, 2 ujęcia na kwestię, wybór po transkrypcji i głośności | ✅ (nieodsłuchane) |
| 3 | Harry = czarny, inny głos dla białego, lektor jak z MK | lektor Adam (obniżony, pogłos), ALAMANDRO Harry, BISHUKIJ Callum | ✅ (nieodsłuchane) |
| 4 | (znalezione) kwestie lektora nachodziły na siebie | limity czasu kwestii, dwie przyspieszone | ✅ |

**Testy:** 41/41 (nowy test powtórki), obraz bez zmian. **Niesprawdzone:** barwa głosów, czy lektor brzmi „jak MK”.
