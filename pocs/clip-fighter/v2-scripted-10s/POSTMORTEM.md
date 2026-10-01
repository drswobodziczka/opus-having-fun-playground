# Postmortem: Clip Fighter v2 (scenariusz 10 s)

> Sesja 2026-10-01, ok. 23:31–23:34 CEST (czasy z dat modyfikacji plików).
> Artefakt: https://claude.ai/code/artifact/c7b43edd-a1ff-49a2-b674-86631529a9f1

## TL;DR
Przebudowa v1 na deterministyczną pętlę 10 s ze scenariuszem zajęła ~3 min. Weryfikacja headless trwała 6 s na przebieg. Trace liczbowy złapał jeden prawdziwy bug (finał bez K.O.), a arkusz klatek dwie usterki wizualne.

## Słowniczek
- **Scenariusz:** lista „w chwili t zawodnik X robi Y, wynik Z”.
- **Trace liczbowy:** tabela stanu gry co 0,25 s (x, y, HP, stan), wypisywana przez `check.mjs`. Zob. `trace.txt`.
- **Arkusz klatek (contact sheet):** jeden PNG z 16 klatkami z różnych chwil, podpisanymi `t=…`. Zob. `sheet.png`.
- **Hitstop:** zamrożenie gry (~0,07 s) po trafieniu, żeby cios „siadł”.
- **Deterministyczne:** to samo wejście daje zawsze tę samą klatkę.

## Co się zmieniło względem v1
- **Stały krok 1/60 s** (`tick()`). Pętla przeglądarki tylko dosypuje kroki.
- **Scenariusz `SCRIPT`:** 15 zdarzeń, jedna runda: ROUND 1 → FIGHT! → zszywka i przeskok → kopnięcie z wyskoku → wymiana, blok, kombinacja → K.O. (~7,5 s) → GEM WINS (8,7 s) → pętla (10 s).
- **Hooki:** `window.clipFighter.seek(t)`, `.state()`, parametr `?t=`, suwak w UI.
- **Rysowanie** bez zmian względem v1.

## Narzędzia
| # | Narzędzie | Po co | Czas |
|---|---|---|---|
| 1 | `Bash` grep + `date` | lokalizacja bloków, sprawdzenie Chrome w cache | sekundy |
| 2 | `Bash` heredoc + python | podmiana bloku logiki na scenariusz | ~1 min |
| 3 | `Bash` `node -e` | test składni JS | <1 s |
| 4 | `Bash` `npm i puppeteer-core` | biblioteka; Chrome był już w `~/.cache/puppeteer` | ~20 s |
| 5 | `Bash` `node check.mjs` | trace + arkusz klatek + błędy konsoli + zrzut z telefonu | 6 s × 4 przebiegi |
| 6 | `Read` (PNG) | jedno spojrzenie na arkusz klatek | sekundy |
| 7 | `Artifact` | publikacja | sekundy |

Web: nieużywany.

## Problemy
### P1: finał bez K.O. (rozjazd dwóch zegarów)
- Dwa zegary: **zegar scenariusza** („w 6,70 s OWL strzela”) i **ruch ciał** (skok, chód).
- Przy hitstopie **ciała stały, a zegar scenariusza leciał dalej**.
- Po 6 trafieniach ciała były spóźnione. W finale GEM wybił się za późno i zszywka trafiła go nisko w powietrzu (`y=20`, próg przeskoku 26). Zamiast K.O. była wygrana na punkty.
- **Wykryte w trace’ie:** `7.00 GEM y=20 hp=65 hit`, oczekiwane „w powietrzu, hp 79”.
- **Poprawka:** wynik każdej akcji zapisany w scenariuszu (`miss: true`, `ko: true`). Fizyka tylko porusza ciałami.

### P2: usterki wizualne
- „PAUSE” na każdej klatce arkusza, bo `seek()` pauzuje animację. Nakładkę usunąłem, stan pauzy pokazuje przycisk.
- „STAPLE SHOT!” nachodziło na baner „FIGHT!”. Napis przeniosłem pod pasek HP zawodnika.

### P3: ograniczenia oglądania
- Model widzi PNG, **nie widzi ruchu**. Płynność nie była oceniona.
- `phone.png` nie był oglądany (zasada jednego spojrzenia przed publikacją).
- Nie było wbudowanego podglądu artefaktu, więc uprząż jest własna (`check.mjs`).

## Co zadziałało
- Determinizm + `seek()`: dowolna klatka na żądanie, test w 6 s.
- Trace (dane) jako główny sygnał, obraz do estetyki.
- Podmiana bloków zamiast przepisywania 770 linii.

## Lekcje
- **Fabuła należy do scenariusza, nie do fizyki.**
- Zamiast próbkowania co 0,25 s potrzebny jest **log zdarzeń**, a do tego asercje.
- Do oceny ruchu: **eksport wideo + gęsty arkusz** (ffmpeg).

## Pliki
- `clip-fighter.html`: animacja
- `check.mjs`: uprząż v0 (uruchom z tego katalogu: `node check.mjs`)
- `trace.txt`, `sheet.png`, `phone.png`: wyniki ostatniego przebiegu
