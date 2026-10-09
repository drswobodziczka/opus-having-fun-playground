# BRIEF: The Storm Chose Black (BISHUKIJ vs ALAMANDRO) · v7.4

> **Brief wersji `v7.4-feedback-9`**: dokładnie to, co ta wersja filmu pokazuje (stan 2026-10-09). · poprzedni: [`../v7.3-feedback-8/BRIEF.md`](../v7.3-feedback-8/BRIEF.md) · co się zmieniło: [`CHANGES.md`](CHANGES.md)
> Pierwotnie zaakceptowany 2026-10-02 · PoC #3 w PLAY-001 · wejście usera: [`../PROMPT.md`](../PROMPT.md)
> Wnioski z PoC #2, które ten brief wprost adresuje: gęstsza walka, każdy zwrot pokazany jako **zapowiedź → moment → konsekwencja**, czytelne chwyty i rzuty, ruch kamery wynikający z akcji, prawdziwy lektor zamiast `speechSynthesis`.

## 1. Założenia (ad1–ad7)
| # | Ustalenie |
|---|---|
| ad1 | **60 s**, gęsto i dynamicznie (cel: 2–4 akcje na sekundę, akcje obu stron się nakładają) |
| ad2 | **cały film w kresce tuszu** (pędzel / sumi-e na papierze ryżowym); **runda 2 to ta sama kreska nocą** (ciemny laserunek, pioruny) |
| ad3 | **Krew** (czerwień jako jedyny mocny kolor) |
| ad4 | **BISHUKIJ** (szary) vs **ALAMANDRO** (czarny): szybcy, dokładni, zwinni, celni, skoczni. **Walczą pięściami** (i nogami) |
| ad5 | Arena: **pustynna burza** |
| ad6 | **4 zwroty**, każdy z ruchem kamery (najazd / odjazd / obrót): chwyt duszący, seria zabójczych ciosów, rzut, **wyrwanie głowy z kręgosłupem** (fatality). **Wygrywa czarny (ALAMANDRO)** |
| ad7 | Głosy: **trzy głosy ElevenLabs `eleven_v3`**: lektor w stylu Mortal Kombat (Adam, obniżony, pogłos), ALAMANDRO = Harry, BISHUKIJ = Callum. Lektor pojawia się często |

## 2. Postacie (pełne kończyny, wyraźnie różne sylwetki)
| | **BISHUKIJ** (szary) | **ALAMANDRO** (czarny) |
|---|---|---|
| Sylwetka | wyższy, smukły, długi powiewający szal | niższy, szerszy, postrzępiony kaptur, poszarpane krawędzie stroju |
| Kolor | **jasnoszary** tusz przez cały film (jeden projekt dzień i noc) | **czerń** przez cały film, oczy jako biała szczelina |
| Styl walki | dystans i akrobatyka: salta, kopnięcia z wyskoku, chwyt duszący z przeskoku, rzut | bliski dystans, pięści jak młoty, serie, kontry w ostatniej chwili |
| Głos | **Callum** (ElevenLabs): wykrzykuje swoje ciosy | **Harry** (ElevenLabs): ciosy i śmiech |
| Ciosy specjalne | **SAND COBRA** (duszenie z przeskoku), **DUNE BREAKER** (rzut z obrotu) | **BLACK MONSOON** (seria zabójczych ciosów), **SPINE OF THE STORM** (fatality: głowa z kręgosłupem) |

**Jeden projekt postaci w całym filmie:** pędzel + obwódka (w dzień ciemna obwódka tuszu, nocą jasna poświata); trofeum w tym samym kolorze.

**Animacja (zmiana względem PoC #2):** szkielet 2D (głowa, tułów, ramiona, przedramiona, uda, łydki; **stopy** rysowane na końcu łydek: krótkie, zwężone ku czubkowi, płasko na piasku, czubkiem do przodu, w kopnięciu wyprostowane) z pozami kluczowymi i interpolacją. **Kontakt w chwytach jest wymuszony**: dłoń „przykleja się” do szyi lub pasa przeciwnika, więc chwyt i rzut widać. **Ciągłość ruchu:** płynne przejścia między pozami (0,07–0,2 s), kąty po najkrótszym łuku, odwrócenie postaci w 0,16 s, chwyty z dojściem dłoni i płynnym puszczeniem. Każdy ruch akrobatyczny ma powód (unik przed konkretnym ciosem).

## 3. Scenariusz i sceny (60 s, dwie rundy)
| ID | Czas | Scena | Co się dzieje | Zwrot · kamera |
|---|---|---|---|---|
| S1 | 0:00–0:03 | **Intro** | imiona malowane pędzlem na papierze ryżowym, czerwona pieczęć, burza w tle |  |
| S2 | 0:03–0:05 | Runda 1 | lektor: „ROUND ONE!” → „FIGHT!” |  |
| S3 | 0:05–0:11 | Wymiana | obaj w powietrzu, zderzenia ciosów w locie, bloki, ślizgi po piasku, pierwsze krople krwi. ALAMANDRO kopie wysoko, a BISHUKIJ **kuca pod kopnięciem** i **podcina go wolno, na obu dłoniach** (1,0 s; dłonie przyklejone do ziemi, obrót na dłoniach z nogą przy ziemi, trafienie 9,48 s): ALAMANDRO pada (do ~9,93 s) i wstaje | krótkie zwolnienie przy kucnięciu |
| S4 | 0:11–0:15 | **ZWROT 1: chwyt duszący** | *zapowiedź:* BISHUKIJ odbija się od wydmy. *moment:* **piruet**: obchodzi ALAMANDRO (1,5 obrotu) i zakłada duszenie od tyłu: przedramię przez gardło, druga ręka na potylicy, ofiara uniesiona, rękami szarpie przedramię (linie napięcia), „SAND COBRA!”. *konsekwencja:* ALAMANDRO traci HP, wyrywa się łokciem w twarz | **obrót kamery razem z piruetem** i **najazd do 2,15×** na duszenie, odskok przed łokciem |
| S5 | 0:15–0:21 | Wymiana | szybkie serie obu stron, BISHUKIJ prowadzi na punkty; **każde salto BISHUKIJA to unik przed konkretnym ciosem** (tu: podbródkowy), który trafia w powietrze |  |
| S6 | 0:21–0:26,4 | **ZWROT 2: seria zabójczych ciosów** | *zapowiedź:* pięść BISHUKIJA leci w twarz; ALAMANDRO **uchyla głowę i przedramieniem odbija rękę** (iskra, ręka BISHUKIJA wyrzucona w górę), łapie nadgarstek i zakłada **dźwignię**: ręka wykręcona za plecy, BISHUKIJ zgięty wpół, odwrócony tyłem; ALAMANDRO się śmieje („HA HA HA!”). *moment:* BISHUKIJ obrócony z powrotem, „BLACK MONSOON!”, 12 ciosów w 1,5 s, krew w smugach tuszu. *konsekwencja:* podbródkowy, „K.O.”; ALAMANDRO **śmieje się na głos** nad pokonanym | **najazd 1,6× z lekkim obrotem na front ALAMANDRO** przy parowaniu, **odjazd** na monsunie |
| S7 | 0:26,4–0:30 | Przejście | ściana piasku zalewa kadr, plama tuszu się rozlewa → **noc** (ta sama kreska) |  |
| S8 | 0:30–0:33 | Runda 2 (noc) | nocna burza, papier w ciemnym laserunku, **pioruny**; „ROUND TWO!” → „FIGHT!” |  |
| S9 | 0:33–0:39 | Wymiana (noc) | BISHUKIJ wściekły, szybki i skuteczny: ALAMANDRO pierwszy raz krwawi; salto BISHUKIJA = unik przed kopnięciem |  |
| S10 | 0:39–0:44 | **ZWROT 3: rzut** | *zapowiedź:* BISHUKIJ łapie ALAMANDRO w pasie (widoczny kontakt dłoni), przysiad. *moment:* **suplex**: mostek, ALAMANDRO leci po łuku nad głową BISHUKIJA, „DUNE BREAKER!”. *konsekwencja:* **lądowanie na głowie** (iskra, fontanna piasku, krater), chwila „na głowie”, przewraca się na plecy; traci połowę życia | kamera **stała**, bez obrotów |
| S11 | 0:44–0:50 | Kontra | ALAMANDRO wstaje, śmieje się („HA HA HA!”), znika w burzy i atakuje z trzech stron. BISHUKIJ oszołomiony, pasek HP pusty |  |
|  | 0:50 |  | lektor: **„FINISH HIM!”** |  |
| S12 | 0:50–0:56 | **ZWROT 4: fatality (kręgosłup)** | *zapowiedź:* błyskawica; **zbliżenie na pięść** ALAMANDRO: drży, rozwiera się, zbiera energię, zaciska z błyskiem. *moment:* chwyt za głowę, **głowa wyrwana razem z kręgosłupem** (stylizowany łańcuch 10 kręgów, kołysze się jak wahadło, krew), „SPINE OF THE STORM!”. *konsekwencja:* ciało bez głowy pada w piasek, burza je zasypuje. „FATALITY!” | **zbliżenie 3× na pięść**, potem najazd na trofeum, odjazd na pustynię |
| S13 | 0:56–1:00 | Wygrana | **lądowanie superbohatera**: salto w tył, przyklęk, pięść w piasek, błyskawica, **trofeum (głowa z kręgosłupem) w górze**. „ALAMANDRO WINS”, potem (po zniknięciu napisu) „THE STORM CHOSE BLACK.”, wiatr zasypuje kadr | najazd do 1,8× na pozę zwycięzcy |

**Przemoc:** krew i fatality są stylizowane (czerwone plamy tuszu, kręgosłup jako łańcuch prostych kręgów), w konwencji bijatyk z lat 90. Bez realistycznej anatomii.

## 4. Styl
### Jedna kreska tuszu (sumi-e) przez cały film
- **Dzień (runda 1):** papier ryżowy (ciepła biel ze strukturą włókien), czerwone słońce-pieczęć.
- **Świat (paralaksa w 3 planach):** najdalej płaskowyże i skalne iglice we mgle, dalej i bliżej wydmy z rozmytego tuszu. **Burza żyje (wiatr ze stałym ciągiem i podmuchami):** ściany pyłu przetaczają się po horyzoncie; **jedno pole wiatru dla wszystkich planów**: nad dalszymi i bliższymi wydmami wiatr stale ciągnie drobinki piasku (jak na arenie), a co kilka sekund podmuch przyspiesza i zagęszcza strumień, przechodząc przez wszystkie plany naraz; **dwa wysokie wiry** obracają się: ziarna krążą po orbitach wokół osi (z przodu jaśniejsze), powoli wznoszą się spiralą, przy ziemi piasek jest wciągany do lejka, a u góry ziarna odrywają się stycznie, dryfują z wiatrem i opadają; **krzaczaste** kłęby suchych krzaków toczą się w kilku głębokościach (dalsze mniejsze i wolniejsze za postaciami, bliższe większe przed nimi). **Na arenie** piasek stale sunie tuż nad ziemią, a co ~4 s **podmuch przelatuje przez scenę walki** (mgiełka i smugi ziaren na wysokości postaci). Dzień i noc.
- **Noc (runda 2):** ten sam papier w **ciemnym laserunku** (włókna zostają), **księżyc z papieru**, nocne wydmy, **jasne smugi burzy**, **pioruny** jako jasne pęknięcia z rozbłyskiem papieru i sylwetkami w kontrze.
- **Burza:** poziome, poszarpane pociągnięcia pędzla płynące przez kadr, ziarna tuszu.
- **Postacie:** jeden projekt dzień i noc: ALAMANDRO czarny, BISHUKIJ jasnoszary, pędzel z obwódką (w dzień ciemna obwódka tuszu, nocą jasna poświata), krawędzie poszarpane szumem (suchy pędzel).
- **Krew:** jedyny kolor obok pieczęci, rozbryzgi jak kleksy.
- Rozdzielczość: 480×270, krawędzie „pędzlowe” (rysowane szumem, nie wektorem).

### HUD
Paski HP w stylu bijatyk z lat 90. **na pasku papieru**, imiona, licznik, combo („12 HITS”), banery pędzlem **z obwódką papieru** (czytelne także nocą).

## 5. Dźwięk
- **Głosy (ElevenLabs `eleven_v3`, najbardziej ekspresyjne ustawienie):** **lektor w stylu Mortal Kombat** = Adam, obniżony o ~3 półtony + pogłos: ROUND ONE/TWO, FIGHT!, K.O., FINISH HIM!, FATALITY!, ALAMANDRO WINS, THE STORM CHOSE BLACK. · **ALAMANDRO** = Harry: BLACK MONSOON, SPINE OF THE STORM, śmiechy · **BISHUKIJ** = Callum: SAND COBRA, DUNE BREAKER. Po 2 ujęcia na kwestię, transkrypcja musi zgadzać się ze słowami, ujęcie musi zmieścić się przed następną kwestią (`vo/make.mjs`).
- **Kwestie:** „ROUND ONE”, „ROUND TWO”, „FIGHT!”, nazwy ciosów specjalnych (×4), „K.O.”, śmiech ALAMANDRO: krótki przy chwycie (21,3 s) i **po K.O. na koniec rundy 1** (25,95 s) i **długi, szalony rechot** (4,6 s) przez kontrę z teleportami (44 s), „FINISH HIM!”, „SPINE OF THE STORM!”, „FATALITY!”, „ALAMANDRO WINS”, „THE STORM CHOSE BLACK.”.
- **Muzyka: energiczne kung-fu z próbek instrumentów.** Partytura w kodzie (`music/score.mjs`) → MIDI → soundfont GeneralUser GS → `music.mp3`. 150 BPM, E-moll pentatonika: koto (jak guzheng), flet (jak dizi: frazy pytanie/odpowiedź, w napięciu biegi pentatoniczne), shamisen (bas), taiko, woodblocki, chińskie talerze, tremolo smyczków w scenach napięcia, orchestra hit na akcentach. Runda 2 o ton wyżej. Adaptacyjna przez partyturę: tryb wg sceny, akcenty z czasów zdarzeń, werbel do fatality, cisza po K.O. z samotnym shakuhachi. Pod spodem szum wiatru (efekt).
- **SFX:** ciosy (cięższe niż w PoC #2), chrupnięcie chwytu, świst rzutu, uderzenie w wydmę, grzmot.
- **MP4 z dźwiękiem:** cała ścieżka (lektor, muzyka, SFX) renderowana offline w stronie (`OfflineAudioContext` → WAV) i sklejana z klatkami w ffmpeg.

## 6. Wykonanie
- Jeden plik HTML, Canvas 2D, stały krok 60 Hz. Uprząż na wspólnym `kit/harness` (asercje filmu w `check.mjs`), scenariusz z wynikami (wzorzec z PoC #2).
- Rig szkieletowy + pozy kluczowe; ograniczenia kontaktu w chwytach (IK); kamera z celem (punkt + zoom + kąt) sterowana ujęciami; przejście dzień → noc jako maska tuszu.
- **Ciągłość ruchu:** płynne przejścia póz, kąty po najkrótszym łuku, odwrócenie postaci w 0,16 s, chwyty z dojściem i puszczeniem (szczegóły w §2).
- **Sceny w kodzie:** `SCENES` S1..S13 (te same ID co w tabeli §3) i znacznik „scena · sekunda” w kadrze (klawisz T).
- **Sterowanie:** klik w film = pauza/start, `←`/`→` ±1 s (z `Shift` ±0,1 s), także z fokusem na suwaku.
- **Audio:** głosy w `vo/*.mp3`, muzyka gotową ścieżką (`MUSIC`) zsynchronizowaną na żywo z czasem filmu (start od sekundy T, restart przy przewijaniu), `embed.mjs` osadza mp3 w HTML; efekty syntezowane w przeglądarce.
- **Uprząż:** 41 asercji: fabuła (4 zwroty w oknach czasowych, zwycięzca, fatality), podcięcie przewracające ALAMANDRO w S3, parowanie przed chwytem, dźwignia po chwycie, łuk rzutu, lądowanie na głowie i przewrócenie, lądowanie zwycięzcy, każde salto = unik przed ciosem, jeden styl przez cały film z nocną rundą 2, widzialność per klatka (`both` całe ciała / `key` głowy i dłonie / `A` zbliżenie) + **skan klatka po klatce** (3600 klatek: skok kości ≥ 60 px poza znanymi cięciami albo NaN = błąd) + **test powtórki** (pozy po pełnym przebiegu = pozy na świeżej stronie); arkusze zwrotów (zapowiedź / moment / konsekwencja) i scen; MP4 z dźwiękiem.

## 7. Decyzje (zaakceptowane 2026-10-02, zmiany w kolejnych rundach oznaczone)
1. Autorska kwestia lektora: **„THE STORM CHOSE BLACK.”**
2. Głosy: lektor **Adam** (w stylu MK), ALAMANDRO **Harry**, BISHUKIJ **Callum** (ElevenLabs, v7).
3. Nazwy ciosów: **SAND COBRA, BLACK MONSOON, DUNE BREAKER, SPINE OF THE STORM** (fatality zmienione w v4).
4. Tytuł filmu: **„THE STORM CHOSE BLACK”**.
