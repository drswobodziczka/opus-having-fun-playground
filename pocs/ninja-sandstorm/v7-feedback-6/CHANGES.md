# v7 (feedback 6): zmiany względem v6

> Runda 2026-10-07. Artefakt v7: https://claude.ai/code/artifact/89d0d482-499c-4268-b6ce-5c3b47909a52 · v6: https://claude.ai/code/artifact/d33f1513-81fc-42a0-87b0-9215922a3fe4
> Obraz bez zmian w pierwszym przebiegu (zdarzenia 110/110 jak w v5/v6), więc bez `compare-v6-v7.png`. Rozpiska: [`TIMELINE.md`](TIMELINE.md)

| # | Uwaga usera | Zmiana | Status |
|---|---|---|---|
| 1 | [bug] po pierwszym odegraniu BISHUKIJ ma cały czas wytrzeszcz i rękę w górze | przyczyna: `deflectT` (czas odbicia ręki przy parowaniu, 21,07 s) nie był zerowany w `resetFighters`, więc w kolejnym przebiegu warunek „odbicie < 0,16 s temu” był prawdziwy aż do 21,2 s (poza odbicia: ręka w górze, oczy `wide`). Zerowane teraz także `lastHitT` (licznik kombinacji) i `lagWait` (pasek życia). **Nowy test uprzęży „Replay”**: pozy w 8 chwilach na świeżej stronie = pozy po pełnym przebiegu (na v6: FAIL w 5, 8, 12, 18 s; na v7: PASS) | ✅ |
| 2 | „czy na pewno v3? zostało tu i ówdzie v2” | pliki v6 były v3 (bajt w bajt), ale v3 daje inne ujęcie przy każdym wywołaniu, a `stability 0.5` dało kilka spokojnych. Teraz [`vo/make.mjs`](vo/make.mjs): `stability 0` (Creative), 2 ujęcia/kwestię, transkrypcja (Scribe) musi zgadzać się ze słowami, ujęcie musi mieścić się w czasie do następnej kwestii, wybór najgłośniejszego (krzyk), raport w [`vo/takes.json`](vo/takes.json) | ✅ (nieodsłuchane) |
| 3 | Harry ma być czarnym (ALAMANDRO), białego zrobić inaczej, lektor jak z Mortal Kombat | obsada: **lektor = Adam** („Dominant, Firm”) obniżony o ~3 półtony + pogłos (`aecho`): round/fight/K.O./finish/fatality/wins/storm; **ALAMANDRO = Harry**: monsoon, spine, śmiechy; **BISHUKIJ = Callum** („Husky Trickster”): sand cobra, dune breaker. Darmowy plan = tylko głosy premade | ✅ (nieodsłuchane) |
| — | (znalezione) nakładki kwestii w v6: ROUND ONE na FIGHT!, WINS na STORM, STORM ucięte na końcu filmu | limity czasu w skrypcie; `wins` i `storm` przyspieszone ×1,2 / ×1,14 bez zmiany wysokości (żadne ujęcie się nie mieściło) | ✅ |

## Weryfikacja
- Uprząż **41/41** (nowy test „Replay”), skan klatka po klatce bez zmian.
- Lektor: 14 kwestii, słowa potwierdzone transkrypcją; długości 0,68–1,75 s (cackle 4,1 s).
- Kredyty ElevenLabs: łącznie 1 771 / 10 000 na koncie.
- **Nie sprawdziłem:** barwy głosów i czy obróbka lektora brzmi „jak MK”.
