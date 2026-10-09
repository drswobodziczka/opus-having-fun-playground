# WebGL v2: szczegóły (postmortem)

> 2026-10-10. Krótki widok zmian: [`CHANGES.md`](CHANGES.md). Jak działają efekty: [`docs/webgl-tutorial.md`](../../../docs/webgl-tutorial.md).

## Jak
- Kopia `storm.html` z ninja v7.5; `drawWorld` podzielony na `drawBack` (papier, słońce/księżyc, płaskowyże, ściany pyłu, wydmy, wiatr, wiry) / `drawMid` (ziemia, wiatr przy ziemi, krzaki, postacie z duchami ruchu, krew, krzaki z przodu) / `drawFront` (podmuchy areny, burza, pioruny).
- Kompozytor v2: tło `[falowanie, promienie, głębia ostrości]`, postacie `[pędzel, poświata]`, świat `[bloom, fala, rozmycie promieniste]`, klatka `[LUT, papier]`. Listy filtrów przypisane raz, w klatce tylko parametry i `enabled`.
- `anim.setFx({...})`: każdy efekt wyłączalny (obrazki do samouczka, eksperymenty).
- Fala uderzeniowa odpalana przez zdarzenia z logu (`grab`, `special`, `ko`, `throw-impact`, `heart`), środek = staw ofiary na ekranie.

## Problemy (prosto)
| Problem | Przyczyna | Rozwiązanie / lekcja |
|---|---|---|
| Rozmycie promieniste zalewało cały kadr (K.O., rzut, fatality) | siła 0,12 przez 0,35 s, mały ostry środek | 0,045 przez 0,22 s, ostry środek 170 px |
| „Wiatraczek” pasów na tarczy słońca | `GodrayFilter` liczy promienie także na samym źródle | tarcza dorysowana nad promieniami (warstwa przód) |
| Falowanie powietrza niewidoczne nawet ×5 | przesunięcie ±0,5 px i długa fala szumu (~80 px) | ±2–6 px, gęstsze fale; **pomiar różnicy pikseli** (wydmy 4,6% zmienionych, niebo 0,1%) zamiast zgadywania na stopklatce |
| Piasek GPU słabo widoczny za dnia | jasne ziarna na jasnym papierze | zostawione (realistyczne); lepiej widać nocą |
| Raz nie wystartował Chrome | chwilowy błąd uruchomienia | ponowienie |

## Lekcje
- **Uprząż na GPU** (pełny Chrome headless, Metal): 20× szybciej; od teraz domyślnie dla filmów WebGL (`kit/harness`).
- **Efekt subtelny = mierz różnicę pikseli** w obszarze, gdzie ma działać, i tam, gdzie ma go nie być (maska).
- **Przełączniki efektów** (`setFx`) to tani sposób na obrazki „bez / z” do nauki i na izolowanie błędów.
