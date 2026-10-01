# Postmortem: Paper Cuts Super Turbo V, v1 (pixel, 120 s)

> Sesja 2026-10-02, ok. 00:35–01:05 CEST. Czasy pochodzą z dat modyfikacji plików, nie z pomiaru każdego narzędzia.
> Artefakt: https://claude.ai/code/artifact/7d5a22e9-28d4-4f72-a1e0-b7b8db8180a0 · brief: [`../BRIEF.md`](../BRIEF.md)

## TL;DR
Pierwsza produkcja przeszła przez obie bramki: najpierw pytania pogłębiające (ad1–ad5), potem brief do akceptacji, a dopiero potem kod. Powstał plik HTML z 1318 liniami i 2-minutową bijatyką, która **od pierwszego przebiegu przeszła 16/16 asercji** fabularnych. Na arkuszu klatek wyszedł jeden problem z czytelnością (HB „ginie” w kubku), naprawiony jedną poprawką. **MP4 przez ffmpeg zadziałało od razu** (120,0 s, 1152×672, 30 fps). Generowanie kodu zajęło ~5 min, weryfikacja razem z MP4 ~2 min.

## Oś czasu
| Kiedy | Co | Ile |
|---|---|---|
| ~00:35 → 00:56 | odpowiedzi usera ad1–ad5 → planowanie scenariusza w głowie modelu (dokładny start nieznany), zapis decyzji w BRIEF + słowniczek | ≤ ~20 min (głównie myślenie przed pierwszym narzędziem) |
| 00:56 → ~01:01 | `Write`: `paper-cuts.html` (1318 linii) | ~5 min |
| 01:01:41 | `Write`: `check.mjs` (uprząż v1, 121 linii) | <1 min |
| ~01:02 | `node -e` (składnia) + `node check.mjs` → 16/16 PASS | **4,5 s** |
| ~01:02 | `Read` arkusza 24 klatek → podejrzenie: HB niewidoczny w kubku | sekundy |
| ~01:02 | trace + `events.json` → stan `cupped` poprawny, więc bug jest w rysowaniu | sekundy |
| ~01:03 | sonda: powiększony kadr kubka (puppeteer) → HB jest, ale ginie | ~10 s |
| 01:03:26 | poprawka (3 podmiany w pythonie) + `check.mjs --mp4` | **21,5 s** z MP4 |
| ~01:04–01:05 | `Artifact`: pierwsza publikacja → timeout, `list` → brak, ponowienie → OK | ~1 min |

## Narzędzia
| # | Narzędzie | Po co |
|---|---|---|
| 1 | `Write` | BRIEF/decyzje, słowniczek, `docs/ideas-webgl.md` |
| 2 | `Write` | animacja `paper-cuts.html` |
| 3 | `Write` | uprząż `check.mjs` |
| 4 | `Bash` + node | test składni, uprząż (puppeteer-core + Chrome headless shell z cache) |
| 5 | `Read` (PNG) | arkusz klatek, potem powiększony kadr |
| 6 | `Bash` + python | chirurgiczne poprawki |
| 7 | `Bash` + **ffmpeg** | sklejenie 3600 klatek w MP4 (skalowanie 3× `neighbor`), gęsty arkusz z nagrania (`fps=1/3,tile=8x5`) |
| 8 | `Artifact` | publikacja (z jednym timeoutem) |

Web: nieużywany.

## Co zbudowano
- **Scenariusz:** tablica 150+ zdarzeń (`at(t, kto, akcja, {hit: …})` i `sys(t, …)`). Każdy wynik (hit/block/miss/erase/snap/chip/ko) jest zapisany w scenariuszu.
- **Silnik:** stały krok 60 Hz. Akcje to krzywe ruchu (tweeny) od pozycji startowej, chwyty i rzuty sterują pozycją przeciwnika. **Bez hitstopu, który rozjeżdżał zegary.** Wrażenie uderzenia dają iskry, wstrząs i poza.
- **Kamera:** śledzenie środka walki, **roll 360°** (zoom 1→1,3→1), **fałszywa orbita 180°**: postacie zamieniają się stronami (cos), skala głębi (sin), warstwy paralaksy jadą przeciwnie, a na końcu świat się lustrzanie odwraca.
- **Grafika:** 4 warstwy paralaksy (niebo z ditheringiem, dalekie i bliskie kredki, pierwszy plan), podłoga z zeszytu w perspektywie, rekwizyty (kubek, temperówka), postacie proceduralne bez kończyn.
- **Dźwięk:** sekwencer chiptune (64 kroki, A-moll, 150 BPM), 17 efektów syntezowanych, lektor `speechSynthesis`. Wszystko odpala się z tych samych zdarzeń co log.
- **Kontrakt testowy:** `window.anim = { seek, step, state, events, script, duration }`.

## Problemy (prosto)
### P1: HB „ginie” w kubku (czytelność)
- Arkusz klatek: w finale nie widać HB w kubku.
- Trace mówi `HB 150,10 cupped`, czyli fabuła jest dobra, a problem leży w rysowaniu.
- Powiększony kadr: HB jest, ale wystaje tylko czubek, zlewa się z kolorowymi ołówkami w kubku, a buty chowa baner „DOUBLE K.O.”.
- **Poprawka:** HB wyżej (twarz nad krawędzią), kubek bez własnych ołówków, kiedy HB jest w środku, buty niżej.
- **Lekcja:** asercje sprawdzają fabułę, a nie czytelność. Arkusz klatek jest nadal potrzebny.

### P2: timeout publikacji artefaktu
Pierwsza publikacja zwróciła `ETIMEDOUT`. `list` potwierdził, że nic się nie opublikowało, więc ponowienie było bezpieczne. **Lekcja:** po błędzie najpierw `list`, potem ponowienie (żeby nie zrobić duplikatu).

### P3: model nie słyszy dźwięku
Dźwięk jest **niezweryfikowany**: uprząż nie włącza audio, a model nie słyszy. Sprawdzone jest tylko to, że kod się wykonuje bez błędów. Ocena brzmienia, głośności i synchronizacji lektora należy do usera.

### P4: odległości „na oko”
Pozycje w scenariuszu liczyłem ręcznie. Asercja „każde trafienie ≤ 90 px” przeszła, ale część ciosów wizualnie trafia z dystansu ~60–80 px. Do dopracowania w v2: ciaśniejszy próg albo automatyczne dosuwanie atakującego.

## Co zadziałało
- **Bramki preprodukcji:** zero przepisywania i zero sporów o fabułę, bo kod realizował zaakceptowany brief.
- **Wynik w scenariuszu + brak hitstopu:** 16/16 od pierwszego razu.
- **Kolejność diagnozy: liczby → obraz → sonda.** Trace od razu oddzielił „zła fabuła” od „złego rysunku”.
- **ffmpeg:** render deterministyczny przez `step()` jest szybszy niż czas rzeczywisty (120 s filmu w ~15 s).

## Do v2 / backlog
- Grafika „malowana” w wyższej rozdzielczości (decyzja ad4).
- MP4 **z dźwiękiem**: render audio offline (`OfflineAudioContext`) + mux w ffmpeg.
- Asercje czytelności: np. „bbox HB w kadrze i nie zasłonięty przez baner”.
- Dosuwanie atakującego do realnego zasięgu ciosu.

## Pliki
- `paper-cuts.html`: animacja
- `check.mjs`: uprząż v1 (`node check.mjs [--mp4] [--fps=30]`)
- `events.json`, `trace.txt`, `sheet.png`, `phone.png`: wyniki ostatniego przebiegu
- `paper-cuts.mp4`, `sheet-dense.png`: generowane lokalnie, **poza gitem** (rozmiar: ~39 MB i ~4 MB)
