# BRIEF: The Storm Chose Black (BISHUKIJ vs ALAMANDRO) · v2

> **Brief wersji `v2-feedback-1`**: dokładnie to, co ta wersja filmu pokazuje (stan 2026-10-06). · poprzedni: [`../v1-ink-pixel-60s/BRIEF.md`](../v1-ink-pixel-60s/BRIEF.md) · co się zmieniło: [`CHANGES.md`](CHANGES.md)
> Pierwotnie zaakceptowany 2026-10-02 · PoC #3 w PLAY-001 · wejście usera: [`../PROMPT.md`](../PROMPT.md)
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
| ID | Czas | Scena | Co się dzieje | Zwrot · kamera |
|---|---|---|---|---|
| S1 | 0:00–0:03 | **Intro (a)** | imiona malowane pędzlem na papierze ryżowym, czerwona pieczęć, burza w tle |  |
| S2 | 0:03–0:05 | Runda 1 | lektor: „ROUND ONE!” → „FIGHT!” |  |
| S3 | 0:05–0:11 | Wymiana (a) | obaj w powietrzu, zderzenia ciosów w locie, bloki, ślizgi po piasku, pierwsze krople krwi. ALAMANDRO kopie wysoko, a BISHUKIJ robi **salto w tył jako unik w zwolnieniu** (0,35×): kopnięcie trafia w powietrze | zwolnienie 8,6–9,1 s |
| S4 | 0:11–0:15 | **ZWROT 1: chwyt duszący** | *zapowiedź:* BISHUKIJ odbija się od wydmy. *moment:* **piruet**: obchodzi ALAMANDRO (1,5 obrotu) i zakłada duszenie od tyłu: przedramię przez gardło, druga ręka na potylicy, ofiara uniesiona, rękami szarpie przedramię (linie napięcia), „SAND COBRA!”. *konsekwencja:* ALAMANDRO traci HP, wyrywa się łokciem w twarz | **obrót kamery razem z piruetem** i **najazd do 2,15×** na duszenie, odskok przed łokciem |
| S5 | 0:15–0:21 | Wymiana (a) | szybkie serie obu stron, BISHUKIJ prowadzi na punkty |  |
| S6 | 0:21–0:26,4 | **ZWROT 2: seria zabójczych ciosów** | *zapowiedź:* BISHUKIJ atakuje z powietrza, ALAMANDRO **paruje przedramieniem** (iskra, „PARRY”), łapie nadgarstek i śmieje się („HA HA HA!”). *moment:* „BLACK MONSOON!”, 12 ciosów w 1,5 s, krew w smugach tuszu. *konsekwencja:* podbródkowy wyrzuca BISHUKIJA w ścianę burzy → „K.O.” | **najazd 1,6× z lekkim obrotem na front ALAMANDRO** przy parowaniu, **odjazd** na monsunie |
| S7 | 0:26,4–0:30 | Przejście | ściana piasku zalewa kadr, plama tuszu się rozlewa → **styl (b)** |  |
| S8 | 0:30–0:33 | Runda 2 (b) | burza w nocy, błyskawice; „ROUND TWO!” → „FIGHT!” |  |
| S9 | 0:33–0:39 | Wymiana (b) | BISHUKIJ wściekły, szybki i skuteczny: ALAMANDRO pierwszy raz krwawi |  |
| S10 | 0:39–0:44 | **ZWROT 3: rzut** | *zapowiedź:* BISHUKIJ łapie ALAMANDRO za pas i kołnierz (widoczny kontakt dłoni). *moment:* **zamach w przysiadzie ze skrętem tułowia** → eksplozja → **płaski, daleki lot** (~200 px), „DUNE BREAKER!”. *konsekwencja:* **ślizg po piasku** (~70 px, ślady), ALAMANDRO traci połowę życia | kamera podąża za lotem **bez obrotu** |
| S11 | 0:44–0:50 | Kontra | ALAMANDRO wstaje, śmieje się („HA HA HA!”), znika w burzy i atakuje z trzech stron. BISHUKIJ oszołomiony, pasek HP pusty |  |
|  | 0:50 |  | lektor: **„FINISH HIM!”** |  |
| S12 | 0:50–0:56 | **ZWROT 4: wyrwanie serca** | *zapowiedź:* błyskawica; **zbliżenie na pięść** ALAMANDRO: drży, rozwiera się, zbiera energię, zaciska z błyskiem. *moment:* wystrzał (linie pędu), cios w pierś, wyrwane serce: stylizowana czerwona, pulsująca sylwetka (bez anatomii). *konsekwencja:* BISHUKIJ pada w piasek, burza zasypuje ciało. „FATALITY!” | **zbliżenie 3× na pięść**, potem **najazd 2,2× na serce**, odjazd na pustynię |
| S13 | 0:56–1:00 | Wygrana | **lądowanie superbohatera**: salto w tył, przyklęk, pięść w piasek, błyskawica, serce w górze. „ALAMANDRO WINS”, „THE STORM CHOSE BLACK.”, wiatr zasypuje kadr | najazd do 1,8× na pozę zwycięzcy |

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
- Rig szkieletowy + pozy kluczowe; ograniczenia kontaktu w chwytach (IK); kamera z celem (punkt + zoom + kąt) sterowana ujęciami; przejście (a) → (b) jako maska tuszu.
- **Sceny w kodzie:** `SCENES` S1..S13 (te same ID co w tabeli §3) i znacznik „scena · sekunda” w kadrze (klawisz T).
- **Sterowanie:** klik w film = pauza/start, `←`/`→` ±1 s (z `Shift` ±0,1 s), także z fokusem na suwaku.
- **Uprząż:** 35 asercji: fabuła (4 zwroty w oknach czasowych, zwycięzca, fatality), salto-unik w S3, parowanie przed chwytem, lądowanie i ślizg rzutu, lądowanie zwycięzcy, widzialność per klatka (`both` całe ciała / `key` głowy i dłonie / `A` zbliżenie); arkusze zwrotów (zapowiedź / moment / konsekwencja) i scen; MP4 z dźwiękiem.

## 7. Decyzje (zaakceptowane 2026-10-02)
1. Autorska kwestia lektora: **„THE STORM CHOSE BLACK.”**
2. Głos: **Daniel** (macOS `say`) po obróbce w ffmpeg.
3. Nazwy ciosów: **SAND COBRA, BLACK MONSOON, DUNE BREAKER, HEART OF THE STORM**.
4. Tytuł filmu: **„THE STORM CHOSE BLACK”**.
