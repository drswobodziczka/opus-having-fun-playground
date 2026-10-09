# v7.3: szczegóły rundy (postmortem)

> 2026-10-09. Krótki widok zmian: [`CHANGES.md`](CHANGES.md).

## Jak
- **Wiatr jako zdarzenia:** `gustAt(okres, czas trwania, sól, T)` daje podmuchy w stałym, pseudolosowym rozkładzie (funkcja czasu), więc są deterministyczne i działają z przewijaniem. Obwiednia `sin(π·k)` wygasza podmuch płynnie.
- **Wydmy (`duneLife`):** ciurek = krótkie smugi z 16 punktów grzbietu na kafel wydmy; pióropusz = 46 „ziaren” lecących balistycznie (prędkość w lewo i w górę, opadanie), rosnących i blednących; dalsza wydma w skali 0,6 i z częstszymi podmuchami.
- **Wiry:** 26 eliptycznych pierścieni (szerokość rośnie z wysokością, faza obrotu z czasem), 60 ziaren na spirali (ostatnie 25% wysokości wyrzucane na zewnątrz i z wiatrem), radialny kłąb u podstawy, 14 kłębków smugi za wirem.
- **Krzaki:** kształt z 22 krzywych Béziera (+30% patyków na zewnątrz) losowany raz na krzak; głębokość = parallaksa `worldXform(d)` (0,55–1,5), skala, prędkość i wysokość zależne od `d`; `d < 1` rysowane przed postaciami w kolejności warstw, `d > 1` po nich.
- **Arena:** 40 smug tuż nad ziemią (świat) + podmuch co ~4,2 s w przestrzeni ekranu (gradient mgiełki + 160 smug ziaren), rysowany przed burzą i HUD.
- **Stopy:** długość `6,5 + 0,6 × grubość łydki` zamiast `2,3 × grubość`, czubek zwężony do 0,35.

## Lekcje
- Wrażenie „wichury” daje rytm: stałe tło (ciurek) + rzadkie mocne akcenty (podmuchy). Sam ciurek (v7.2) był niewidoczny.
- Zdarzenia pogodowe jako funkcja czasu = ten sam wzorzec co scenariusz; do kitu jako klocek „wiatr”.
