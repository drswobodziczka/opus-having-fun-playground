# v2 (feedback 1): zmiany względem v1

> Runda feedbacku 2026-10-06, pierwsza przez [`EDIT-PROTOCOL`](../../../docs/EDIT-PROTOCOL.md).
> Artefakt v2: https://claude.ai/code/artifact/42976001-7f2b-4178-963c-e159ff2bd672 · v1 (do porównania): https://claude.ai/code/artifact/5dfacc58-2d7a-40aa-a5ae-83c6f9d9ee73
> Porównanie klatek v1 | v2: [`compare-v1-v2.png`](compare-v1-v2.png) · rozpiska: [`TIMELINE.md`](TIMELINE.md)

| # | Uwaga usera | Interpretacja | Zmiana (element silnika) | Status |
|---|---|---|---|---|
| 1 | `S3 @8.8 [ruch]` salto nienaturalne; unik ma być przed ciosem i skuteczny; zwolnić tempo | salto jako **unik**: wysokie kopnięcie trafia w powietrze, zwolnienie 0,35× | scenariusz (`highkick → miss`, `flip` 8,55 s), zegar (`SLOWMO` 8,6–9,1 s), rig (przysiad przed i po saltem) | ✅ |
| 2 | `S4 [kamera][ruch]` większe zbliżenie, prawdziwa dźwignia na szyję, zamiast salta piruet z kamerą | **piruet** wokół ofiary (przechodzi za nią, 1,5 obrotu), kamera obraca się razem z nim i najeżdża do 2,15×; **chwyt**: przedramię przez gardło, druga ręka na potylicy, ofiara uniesiona, rękami szarpie przedramię, linie napięcia | symulacja (`choke`), rig (IK `throat`/`headBack`/`oppForearm`, `spinX`, głębia), kamera (ujęcie S4) | ✅ |
| 3 | `S6 @21.1 [bug][kamera]` nie widać sparowania; najazd i lekka rotacja na front czarnego | **sparowanie** przedramieniem (iskra, „PARRY”) → chwyt nadgarstka; najazd 1,6× z obrotem w stronę ALAMANDRO | scenariusz (`parry` 21,0 s, `catch` 21,18 s), kamera (ujęcie S6) | ✅ |
| 4 | `S10` rzut: brak zamachu i ugięcia nóg, dziwna rotacja, kamera robi fikołki | **zamach** w przysiadzie ze skrętem tułowia → eksplozja → **płaski, daleki lot** (200 px) → **ślizg** po piasku (70 px, ślady); kamera podąża bez obrotu | symulacja (`throw`), rig (`windThrow`), kamera (ujęcie S10), efekty (kurz, ślad ślizgu) | ✅ |
| 5 | `S12` fatality bez dramaturgii | **zbliżenie 3× na pięść**: drży → rozwiera się, zbiera energię → zaciska z błyskiem → wystrzał (linie pędu) → najazd 2,2× na serce | symulacja i rig (`heartrip`, `fistUp`, `handOpen`, `tremble`), efekty (energia, linie pędu), kamera (4 ujęcia S12) | ✅ |
| 6 | `S13` fancy poza wygranej | **lądowanie superbohatera**: salto w tył, przyklęk, pięść w piasek, błyskawica, serce w górze; najazd do 1,8× | scenariusz (`winpose` 56 s, banery przesunięte), rig (`heroLand`), kamera (ujęcie S13) | ✅ |
| 7 | `[ogólne]` klik = spacja; strzałki zawsze przewijają | klik w film = pauza/start; `←`/`→` ±1 s, z `Shift` ±0,1 s, także gdy fokus jest na suwaku | sterowanie strony | ✅ |
| 8 | nowa wersja do porównania | katalog `v2-feedback-1/`, nowy artefakt, v1 bez zmian | — | ✅ |

## Weryfikacja
- Uprząż: **35/35** (nowe: unik, parowanie przed chwytem, wypuszczenie, lądowanie i ślizg rzutu, lądowanie zwycięzcy; widzialność per klatka w trybie `both` / `key` / `A`).
- Jedna poprawka po pierwszym przebiegu: kamera w S4 była jeszcze w zbliżeniu, kiedy pada łokieć (odrzucony BISHUKIJ poza kadrem), więc odskok kamery zaczyna się wcześniej.
- Jedno spojrzenie na porównanie v1 | v2 i dwie poprawki kamery: zbliżenie na pięść 2,4× → 3×, lądowanie zwycięzcy 1,35× → 1,8×.

## Dane z testu protokołu (do projektu reżyserki)
- 8 uwag: **6 na poziomie sceny**, 2 z konkretną sekundą, 1 ogólna (sterowanie), 1 meta (nowa wersja).
- Tagi: `[ruch]` ×2, `[kamera]` ×3, `[bug]` ×1; 4 uwagi bez tagu.
- Każda uwaga dawała się jednoznacznie przypisać do sceny, a dopytania nie były potrzebne.
- Wniosek: **poziom sceny jest dominujący**, więc reżyserka musi mieć wygodny pasek scen, a sekundy są uzupełnieniem.
