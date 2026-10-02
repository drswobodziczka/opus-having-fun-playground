# BRIEF: The Storm Chose Black (BISHUKIJ vs ALAMANDRO)

> Status: **ZAAKCEPTOWANY** (2026-10-02) · PoC #3 w PLAY-001 · wersja briefu 1
> Wnioski z PoC #2, które ten brief wprost adresuje: gęstsza walka, każdy zwrot pokazany jako **zapowiedź → moment → konsekwencja**, czytelne chwyty i rzuty, ruch kamery wynikający z akcji, prawdziwy lektor zamiast `speechSynthesis`.

## 1. Założenia (ad1–ad7)
| # | Ustalenie |
|---|---|
| ad1 | **60 s**, gęsto i dynamicznie (cel: 2–4 akcje na sekundę, akcje obu stron się nakładają) |
| ad2 | **0–30 s: styl (a)** tusz pędzlem / sumi-e · **30–60 s: styl (b)** mroczny, „malowany” pixel w wyższej rozdzielczości |
| ad3 | **Krew** (czerwień jako jedyny mocny kolor) |
| ad4 | **BISHUKIJ** (szary) vs **ALAMANDRO** (czarny): szybcy, dokładni, zwinni, celni, skoczni. **Walczą pięściami** (i nogami) |
| ad5 | Arena: **pustynna burza** |
| ad6 | **4 zwroty**, każdy z ruchem kamery (najazd / odjazd / obrót): chwyt duszący, seria zabójczych ciosów, rzut, wyrwanie serca. **Wygrywa czarny (ALAMANDRO)** |
| ad7 | Lektor: **lokalny `say` + obróbka w ffmpeg**: gruby, niski, energiczny, w stylu bijatyk z lat 90. Pojawia się często. Chmurowy TTS w backlogu |

## 2. Postacie (pełne kończyny, wyraźnie różne sylwetki)
| | **BISHUKIJ** (szary) | **ALAMANDRO** (czarny) |
|---|---|---|
| Sylwetka | wyższy, smukły, długi powiewający szal | niższy, szerszy, postrzępiony kaptur, poszarpane krawędzie stroju |
| Kolor | szara „mokra” plama tuszu, jaśniejsze krawędzie | czysta czerń, oczy jako biała szczelina |
| Styl walki | dystans i akrobatyka: salta, kopnięcia z wyskoku, chwyt duszący z przeskoku, rzut | bliski dystans, pięści jak młoty, serie, kontry w ostatniej chwili |
| Ciosy specjalne | **SAND COBRA** (duszenie z przeskoku), **DUNE BREAKER** (rzut z obrotu) | **BLACK MONSOON** (seria zabójczych ciosów), **HEART OF THE STORM** (fatality) |

**Animacja (zmiana względem PoC #2):** szkielet 2D (głowa, tułów, ramiona, przedramiona, uda, łydki) z pozami kluczowymi i interpolacją. **Kontakt w chwytach jest wymuszony**: dłoń „przykleja się” do szyi lub pasa przeciwnika, więc chwyt i rzut widać.

## 3. Scenariusz i sceny (60 s, dwie rundy)
| Czas | Scena | Co się dzieje | Zwrot · kamera |
|---|---|---|---|
| 0:00–0:03 | **Intro (a)** | imiona malowane pędzlem na papierze ryżowym, czerwona pieczęć, burza w tle | |
| 0:03–0:05 | Runda 1 | lektor: „ROUND ONE!” → „FIGHT!” | |
| 0:05–0:11 | Wymiana (a) | obaj w powietrzu, zderzenia ciosów w locie, bloki, ślizgi po piasku, pierwsze krople krwi | |
| 0:11–0:15 | **ZWROT 1: chwyt duszący** | *zapowiedź:* BISHUKIJ odbija się od wydmy. *moment:* przeskakuje nad ALAMANDRO i łapie go za szyję od tyłu („SAND COBRA!”). *konsekwencja:* ALAMANDRO sinieje i kopie piasek, potem wyrywa się łokciem w twarz, BISHUKIJ krwawi z nosa | **najazd** na twarze (zoom ~1,8×), po wyrwaniu kamera odskakuje |
| 0:15–0:21 | Wymiana (a) | szybkie serie obu stron, BISHUKIJ prowadzi na punkty | |
| 0:21–0:27 | **ZWROT 2: seria zabójczych ciosów** | *zapowiedź:* ALAMANDRO łapie pięść BISHUKIJA w locie i śmieje się („HA HA HA!”). *moment:* „BLACK MONSOON!”, 12 ciosów w 1,5 s, krew w smugach tuszu. *konsekwencja:* podbródkowy wyrzuca BISHUKIJA w ścianę burzy → „K.O.” | **odjazd**: kamera cofa się z każdym ciosem i odsłania ścianę piasku |
| 0:27–0:30 | Przejście | ściana piasku zalewa kadr, plama tuszu się rozlewa → **styl (b)** | |
| 0:30–0:33 | Runda 2 (b) | burza w nocy, błyskawice; „ROUND TWO!” → „FIGHT!” | |
| 0:33–0:39 | Wymiana (b) | BISHUKIJ wściekły, szybki i skuteczny: ALAMANDRO pierwszy raz krwawi | |
| 0:39–0:44 | **ZWROT 3: rzut** | *zapowiedź:* BISHUKIJ łapie ALAMANDRO za pas i kołnierz (widoczny kontakt dłoni). *moment:* zamach z obrotu, wysoki łuk w kadrze („DUNE BREAKER!”). *konsekwencja:* uderzenie w wydmę, krater, fontanna piasku, ALAMANDRO traci połowę życia | **obrót** kamery ~100° za łukiem lotu, powrót przy lądowaniu (nie 360°) |
| 0:44–0:50 | Kontra | ALAMANDRO wstaje, śmieje się („HA HA HA!”), znika w burzy i atakuje z trzech stron. BISHUKIJ oszołomiony, pasek HP pusty | |
| 0:50 | | lektor: **„FINISH HIM!”** | |
| 0:50–0:56 | **ZWROT 4: wyrwanie serca** | *zapowiedź:* błyskawica, sylwetki, ALAMANDRO cofa pięść. *moment:* cios w pierś, wyrwane serce: stylizowana czerwona, pulsująca sylwetka (bez anatomii). *konsekwencja:* BISHUKIJ pada w piasek, burza zasypuje ciało. „FATALITY!” | **najazd + lekki obrót** (~20°) na dłoń z sercem, potem odjazd na pustynię |
| 0:56–1:00 | Wygrana | „ALAMANDRO WINS”, autorska kwestia lektora (niżej), wiatr zasypuje kadr, pętla | |

**Przemoc:** krew i fatality są stylizowane (czerwone plamy tuszu i pikseli, serce jako symboliczny kształt), w konwencji bijatyk z lat 90. Bez realistycznej anatomii.

## 4. Styl
### (a) 0–30 s: tusz / sumi-e
- **Tło:** papier ryżowy (ciepła biel ze strukturą włókien), wydmy jako warstwy rozmytego tuszu (paralaksa), czerwone słońce-pieczęć.
- **Burza:** poziome, poszarpane pociągnięcia pędzla płynące przez kadr, ziarna tuszu.
- **Postacie:** ALAMANDRO czarny tusz, BISHUKIJ szara laweta. Krawędzie poszarpane szumem (efekt suchego pędzla).
- **Krew:** jedyny kolor obok pieczęci, rozbryzgi jak kleksy.
- Rozdzielczość: 480×270, krawędzie „pędzlowe” (rysowane szumem, nie wektorem).

### (b) 30–60 s: mroczny malowany pixel
- Noc w burzy: brązowo-czarne niebo, ochrowy pył, **błyskawice** (zimny biało-niebieski błysk, sylwetki w kontrze).
- Wyższa rozdzielczość (480×270), cieniowanie postaci 3–4 tonami, powiewające szaliki i strzępy.
- Gęste cząsteczki piasku na 3 warstwach, krew ciemnoczerwona.

### HUD (oba style)
Paski HP w stylu bijatyk z lat 90., imiona, licznik, combo („12 HITS”), banery. W stylu (a) pędzlem, w (b) w pixelu.

## 5. Dźwięk
- **Lektor (`say` + ffmpeg):** pitch w dół ~26%, kompresja, przester, slap-echo. Pliki osadzone w stronie (base64), więc wejdą też do MP4.
- **Kwestie:** „ROUND ONE”, „ROUND TWO”, „FIGHT!”, nazwy ciosów specjalnych (×4), „K.O.”, „HA HA HA!” (×2), „FINISH HIM!”, „FATALITY!”, „ALAMANDRO WINS”.
- **Autorskie (propozycje, wybierz jedną):** *„THE SAND REMEMBERS.”* · *„DUST TO DUST!”* · *„THE STORM CHOSE BLACK.”*
- **Muzyka:** chiptune jak w PoC #2 (spodobała się), ciemniejsza: moll frygijski, „taiko” z szumu i sinusa, szybsze tempo. Pod spodem szum wiatru.
- **SFX:** ciosy (cięższe niż w PoC #2), chrupnięcie chwytu, świst rzutu, uderzenie w wydmę, grzmot.
- **MP4 z dźwiękiem:** lektor + SFX z logu zdarzeń zmiksowane w ffmpeg (`adelay` + `amix`). Muzyka w MP4: jeśli się uda w tej iteracji.

## 6. Wykonanie
- Jeden plik HTML, Canvas 2D, stały krok 60 Hz, scenariusz z wynikami (wzorzec z PoC #2).
- **Nowe:** rig szkieletowy + pozy kluczowe; ograniczenia kontaktu w chwytach; kamera z celem (punkt + zoom + kąt) sterowana przez zwroty; przejście (a)→(b) jako maska tuszu.
- **Uprząż v2:**
  - asercje fabuły (4 zwroty w oknach czasowych, zwycięzca, fatality);
  - **nowe asercje „widzialności”**: przy każdym zwrocie arkusz „zapowiedź / moment / konsekwencja” i sprawdzenie, że obie postacie są w kadrze;
  - MP4 z dźwiękiem.
- Szacunek: ~1500–2000 linii; generowanie ~6–10 min, weryfikacja kilka minut.

## 7. Decyzje (zaakceptowane 2026-10-02)
1. Autorska kwestia lektora: **„THE STORM CHOSE BLACK.”**
2. Głos: **Daniel** (macOS `say`) po obróbce w ffmpeg.
3. Nazwy ciosów: **SAND COBRA, BLACK MONSOON, DUNE BREAKER, HEART OF THE STORM**.
4. Tytuł filmu: **„THE STORM CHOSE BLACK”**.
