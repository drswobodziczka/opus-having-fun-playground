# TIMELINE: Ninja Sandstorm v7.5 (Canvas 2D)

> **Wygenerowane z animacji** (`node tools/timeline.mjs`), więc zawsze zgodne z kodem. Opisy scen (CO / JAK / PO CO): [`../scenes.json`](../scenes.json).
> Czytaj: scena → co ma się dziać i po co → sekunda po sekundzie. **Scenariusz** = co reżyseruje kod (`E042` = ID zdarzenia, do poprawek), **Wynik** = co faktycznie zaszło. Puste sekundy są zwinięte.
> Poprawki: `S6 …`, `@41.2 …` albo `E087 …` ([`EDIT-PROTOCOL`](../../../docs/EDIT-PROTOCOL.md)).
> Obsada: **B** = BISHUKIJ (jasnoszary) · **A** = ALAMANDRO (czarny).

| Scena | Czas | Nazwa | PO CO |
|---|---|---|---|
| [S1](#s1) | 0:00–0:03 | Intro | przedstawić walczących i styl tuszu |
| [S2](#s2) | 0:03–0:05 | Round one | start rundy, nabranie tempa |
| [S3](#s3) | 0:05–0:11 | Wymiana (a) | pokazać, że BISHUKIJ jest szybki i zwinny; pierwsza krew |
| [S4](#s4) | 0:11–0:15 | ZWROT 1: duszenie | BISHUKIJ przejmuje przewagę |
| [S5](#s5) | 0:15–0:21 | Wymiana (a) | BISHUKIJ prowadzi na punkty |
| [S6](#s6) | 0:21–0:26 | ZWROT 2: monsun | odwrócenie losu: czarny pokazuje siłę, koniec rundy 1 |
| [S7](#s7) | 0:26–0:30 | Przejście | zmiana nastroju: runda 2 nocą |
| [S8](#s8) | 0:30–0:33 | Round two | napięcie przed rewanżem |
| [S9](#s9) | 0:33–0:39 | Wymiana (b) | rewanż BISHUKIJA, odwrócenie przewagi |
| [S10](#s10) | 0:39–0:44 | ZWROT 3: rzut | najmocniejszy cios BISHUKIJA, ALAMANDRO na skraju |
| [S11](#s11) | 0:44–0:50 | Kontra | kontra: czarny przejmuje walkę na dobre |
| [S12](#s12) | 0:50–0:56 | ZWROT 4: serce | fatality, kulminacja |
| [S13](#s13) | 0:56–1:00 | Wygrana | puenta i zamknięcie |

## S1
**Intro** · 0:00–0:03 (3.0 s)

- **CO:** Tytuł malowany pędzlem na papierze, imiona, czerwona pieczęć VS, burza w tle
- **JAK:** kamera stoi, napisy wjeżdżają pędzlem
- **PO CO:** przedstawić walczących i styl tuszu

| t | Co się dzieje (scenariusz) | Wynik (log) | Kamera | HP |
|---|---|---|---|---|
| 0:00–0:02 | · | · | plan ×1.3 | B 100 · A 100 |

## S2
**Round one** · 0:03–0:05 (2.0 s)

- **CO:** Lektor: ROUND ONE, potem FIGHT!
- **JAK:** szeroki plan, muzyka: bicie serca, przejście w groove na FIGHT!
- **PO CO:** start rundy, nabranie tempa

| t | Co się dzieje (scenariusz) | Wynik (log) | Kamera | HP |
|---|---|---|---|---|
| 0:03 | `E004` 3.00 🔔 runda<br>`E005` 3.10 📣 „ROUND ONE” | · | szeroko | B 100 · A 100 |
| 0:04 | `E006` 4.30 📣 „FIGHT!” | · | szeroko | B 100 · A 100 |

## S3
**Wymiana (a)** · 0:05–0:11 (6.0 s)

- **CO:** Zderzenie w powietrzu, wymiana ciosów i bloków; ALAMANDRO kopie wysoko, BISHUKIJ kuca i podcina go oburącz, ALAMANDRO pada i wstaje
- **JAK:** kamera śledzi, lekkie zbliżenie; podcięcie wolniej, z pełnym obrotem na dłoniach
- **PO CO:** pokazać, że BISHUKIJ jest szybki i zwinny; pierwsza krew

| t | Co się dzieje (scenariusz) | Wynik (log) | Kamera | HP |
|---|---|---|---|---|
| 0:05 | `E008` 5.00 **BISHUKIJ**: biegnie<br>`E009` 5.00 **ALAMANDRO**: biegnie<br>`E010` 5.35 **BISHUKIJ**: skacze<br>`E011` 5.35 **ALAMANDRO**: skacze<br>`E012` 5.63 💢 zderzenie w powietrzu | · | plan ×1.11 | B 100 · A 100 |
| 0:06 | `E013` 6.20 **ALAMANDRO**: prosty → zablokowany<br>`E014` 6.45 **ALAMANDRO**: prosty tylną ręką → zablokowany<br>`E015` 6.70 **ALAMANDRO**: kopnięcie → trafia (−4)<br>`E016` 6.98 **BISHUKIJ**: prosty → trafia (−3) | · | plan ×1.14 | B 100 · A 100 |
| 0:07 | `E017` 7.20 **BISHUKIJ**: prosty tylną ręką → trafia (−4)<br>`E018` 7.45 **BISHUKIJ**: kopnięcie → trafia (−5)<br>`E019` 7.80 **ALAMANDRO**: wysokie kopnięcie → zablokowany | · | plan ×1.14 | B 96 · A 93 |
| 0:08 | `E020` 8.15 **BISHUKIJ**: podbródkowy → trafia (−5)<br>`E021` 8.50 **ALAMANDRO**: wysokie kopnięcie → pudło<br>`E022` 8.55 **BISHUKIJ**: podcięcie | · | plan ×1.14 | B 96 · A 83 |
| 0:09 | `E023` 9.85 **BISHUKIJ**: krok | ALAMANDRO leży | plan ×1.15 | B 96 · A 77 |
| 0:10 | `E024` 10.30 **ALAMANDRO**: wstaje | · | plan ×1.11 | B 96 · A 77 |

## S4
**ZWROT 1: duszenie** · 0:11–0:15 (4.0 s)

- **CO:** ZWROT 1 · SAND COBRA: BISHUKIJ przeskakuje i dusi ALAMANDRO od tyłu, ten traci HP, wyrywa się łokciem
- **JAK:** piruet kamery, potem zbliżenie na duszenie
- **PO CO:** BISHUKIJ przejmuje przewagę

| t | Co się dzieje (scenariusz) | Wynik (log) | Kamera | HP |
|---|---|---|---|---|
| 0:11 | `E025` 11.00 **BISHUKIJ**: duszenie (SAND COBRA) | chwyt BISHUKIJ (choke) | plan ×1.25 · obrót 0.24 | B 96 · A 77 |
| 0:12 | · | duszenie odbiera HP ×2 | zbliżenie ×2.15 | B 96 · A 74 |
| 0:13 | · | duszenie odbiera HP ×2 | zbliżenie ×2.15 | B 96 · A 68 |
| 0:14 | `E026` 14.10 **ALAMANDRO**: łokieć → trafia (−6) | duszenie zerwane<br>duszenie odbiera HP ×1 | plan ×1.15 | B 90 · A 62 |

## S5
**Wymiana (a)** · 0:15–0:21 (6.0 s)

- **CO:** Szybkie serie obu stron, każde salto BISHUKIJA to unik przed konkretnym ciosem
- **JAK:** kamera śledzi, tempo wysokie
- **PO CO:** BISHUKIJ prowadzi na punkty

| t | Co się dzieje (scenariusz) | Wynik (log) | Kamera | HP |
|---|---|---|---|---|
| 0:15 | `E027` 15.00 **ALAMANDRO**: prosty tylną ręką → zablokowany<br>`E028` 15.25 **BISHUKIJ**: prosty → trafia (−3)<br>`E029` 15.45 **BISHUKIJ**: prosty tylną ręką → trafia (−4)<br>`E030` 15.70 **BISHUKIJ**: wysokie kopnięcie → trafia (−6) | · | plan ×1.14 | B 90 · A 59 |
| 0:16 | `E031` 16.20 **ALAMANDRO**: biegnie<br>`E032` 16.40 **ALAMANDRO**: prosty → trafia (−3)<br>`E033` 16.65 **ALAMANDRO**: prosty tylną ręką → zablokowany<br>`E034` 16.90 **BISHUKIJ**: kopnięcie → trafia (−5) | · | plan ×1.13 | B 87 · A 49 |
| 0:17 | `E035` 17.20 **ALAMANDRO**: podbródkowy → pudło<br>`E036` 17.25 **BISHUKIJ**: salto (unik) | · | plan ×1.13 | B 87 · A 44 |
| 0:18 | `E037` 18.05 **BISHUKIJ**: skacze → trafia (−6)<br>`E038` 18.75 **ALAMANDRO**: kolano → zablokowany | · | plan ×1.13 | B 87 · A 38 |
| 0:19 | `E039` 19.00 **BISHUKIJ**: prosty → trafia (−3)<br>`E040` 19.20 **ALAMANDRO**: prosty → trafia (−3)<br>`E041` 19.40 **BISHUKIJ**: prosty tylną ręką → trafia (−4)<br>`E042` 19.65 **ALAMANDRO**: kopnięcie → zablokowany<br>`E043` 19.95 **BISHUKIJ**: kopnięcie → trafia (−5) | · | plan ×1.15 | B 84 · A 35 |
| 0:20 | `E044` 20.30 **ALAMANDRO**: krok<br>`E045` 20.30 **BISHUKIJ**: krok<br>`E046` 20.80 **BISHUKIJ**: skacze | · | plan ×1.1 | B 84 · A 26 |

## S6
**ZWROT 2: monsun** · 0:21–0:26 (5.4 s)

- **CO:** ZWROT 2 · BLACK MONSOON: BISHUKIJ skacze, ALAMANDRO paruje (widoczne odbicie ręki), łapie pięść, zakłada dźwignię i się śmieje; seria 12 ciosów, K.O.
- **JAK:** najazd i obrót do frontu ALAMANDRO przy parowaniu, odjazd na monsunie
- **PO CO:** odwrócenie losu: czarny pokazuje siłę, koniec rundy 1

| t | Co się dzieje (scenariusz) | Wynik (log) | Kamera | HP |
|---|---|---|---|---|
| 0:21 | `E047` 21.00 **ALAMANDRO**: parowanie<br>`E048` 21.18 **ALAMANDRO**: łapie pięść | ALAMANDRO paruje<br>ALAMANDRO łapie pięść<br>dźwignia na rękę | bliżej ×1.6 · obrót -0.14 | B 84 · A 26 |
| 0:22 | `E050` 22.55 💥 cios specjalny „BLACK MONSOON”<br>`E051` 22.60 **ALAMANDRO**: BLACK MONSOON | · | bliżej ×1.6 · obrót -0.07 | B 84 · A 26 |
| 0:23 | · | · | plan ×1.16 | B 56 · A 26 |
| 0:24 | `E052` 24.50 📣 „K.O.” | **K.O. BISHUKIJ** | szeroko | B 0 · A 26 |
| 0:25 | `E054` 25.60 🏆 runda wygrana<br>`E055` 25.60 **ALAMANDRO**: śmieje się | BISHUKIJ ląduje | szeroko | B 0 · A 26 |
| 0:26 | `E057` 26.40 🌫️ przejście (ściana piasku → noc) | · | szeroko | B 0 · A 26 |

## S7
**Przejście** · 0:26–0:30 (3.6 s)

- **CO:** Ściana piasku zalewa kadr, kleks tuszu, przejście w noc
- **JAK:** przejście maską tuszu
- **PO CO:** zmiana nastroju: runda 2 nocą

| t | Co się dzieje (scenariusz) | Wynik (log) | Kamera | HP |
|---|---|---|---|---|
| 0:27–0:29 | · | · | szeroko | B 0 · A 26 |

## S8
**Round two** · 0:30–0:33 (3.0 s)

- **CO:** Nocna burza, piorun, ROUND TWO, FIGHT!
- **JAK:** szeroki plan, bicie serca w muzyce
- **PO CO:** napięcie przed rewanżem

| t | Co się dzieje (scenariusz) | Wynik (log) | Kamera | HP |
|---|---|---|---|---|
| 0:30 | `E058` 30.00 🎨 zmiana stylu/światła<br>`E059` 30.00 🔔 runda<br>`E060` 30.70 📣 „ROUND TWO” | · | szeroko | B 100 · A 100 |
| 0:31 | `E061` 31.30 ⚡ piorun | · | szeroko | B 100 · A 100 |
| 0:32 | `E062` 32.00 📣 „FIGHT!”<br>`E064` 32.60 **BISHUKIJ**: biegnie | · | szeroko | B 100 · A 100 |

## S9
**Wymiana (b)** · 0:33–0:39 (6.0 s)

- **CO:** BISHUKIJ wściekły, szybki i skuteczny; ALAMANDRO pierwszy raz krwawi
- **JAK:** kamera śledzi, piorun w tle
- **PO CO:** rewanż BISHUKIJA, odwrócenie przewagi

| t | Co się dzieje (scenariusz) | Wynik (log) | Kamera | HP |
|---|---|---|---|---|
| 0:33 | `E065` 33.00 **BISHUKIJ**: prosty → trafia (−3)<br>`E066` 33.20 **BISHUKIJ**: prosty tylną ręką → trafia (−3)<br>`E067` 33.45 **BISHUKIJ**: kopnięcie → trafia (−4)<br>`E068` 33.80 **ALAMANDRO**: prosty → zablokowany | · | plan ×1.12 | B 100 · A 94 |
| 0:34 | `E069` 34.00 **BISHUKIJ**: podbródkowy → trafia (−4)<br>`E070` 34.35 **ALAMANDRO**: prosty tylną ręką → trafia (−5)<br>`E071` 34.60 **BISHUKIJ**: prosty → trafia (−3)<br>`E072` 34.80 **ALAMANDRO**: kopnięcie → pudło<br>`E073` 34.85 **BISHUKIJ**: salto (unik) | · | plan ×1.15 | B 95 · A 86 |
| 0:35 | `E074` 35.70 **BISHUKIJ**: skacze → trafia (−5) | · | plan ×1.07 | B 95 · A 83 |
| 0:36 | `E075` 36.40 **ALAMANDRO**: kolano → trafia (−5)<br>`E076` 36.65 **BISHUKIJ**: prosty → trafia (−3)<br>`E077` 36.85 **BISHUKIJ**: prosty tylną ręką → trafia (−3) | · | plan ×1.14 | B 95 · A 78 |
| 0:37 | `E078` 37.10 **ALAMANDRO**: prosty → zablokowany<br>`E079` 37.30 ⚡ piorun<br>`E080` 37.35 **BISHUKIJ**: wysokie kopnięcie → trafia (−4)<br>`E081` 37.90 **ALAMANDRO**: prosty tylną ręką → zablokowany | · | plan ×1.14 | B 90 · A 72 |
| 0:38 | `E082` 38.15 **BISHUKIJ**: kopnięcie → trafia (−3)<br>`E083` 38.50 **BISHUKIJ**: krok | · | plan ×1.13 | B 90 · A 65 |

## S10
**ZWROT 3: rzut** · 0:39–0:44 (5.0 s)

- **CO:** ZWROT 3 · DUNE BREAKER: chwyt za pas, uniesienie i suplex przez głowę, ALAMANDRO ląduje na głowie i przewraca się
- **JAK:** obrót kamery w trakcie rzutu
- **PO CO:** najmocniejszy cios BISHUKIJA, ALAMANDRO na skraju

| t | Co się dzieje (scenariusz) | Wynik (log) | Kamera | HP |
|---|---|---|---|---|
| 0:39 | `E084` 39.00 **BISHUKIJ**: rzut (DUNE BREAKER) | chwyt BISHUKIJ (throw)<br>wyrzut nad głową | bliżej ×1.35 | B 90 · A 65 |
| 0:40 | · | uderzenie o ziemię (−40)<br>lądowanie na głowie<br>przewraca się na plecy | plan ×1.18 | B 90 · A 25 |
| 0:41 | · | · | plan ×1.15 | B 90 · A 25 |
| 0:42 | `E085` 42.40 **ALAMANDRO**: wstaje | · | plan ×1.15 | B 90 · A 25 |
| 0:43 | `E086` 43.20 **BISHUKIJ**: krok | · | plan ×1.14 | B 90 · A 25 |

## S11
**Kontra** · 0:44–0:50 (6.0 s)

- **CO:** ALAMANDRO wstaje, szaleńczo się śmieje, znika i atakuje z trzech stron (teleporty), BISHUKIJ ogłuszony; lektor: FINISH HIM!
- **JAK:** cięcia przy teleportach, kamera śledzi
- **PO CO:** kontra: czarny przejmuje walkę na dobre

| t | Co się dzieje (scenariusz) | Wynik (log) | Kamera | HP |
|---|---|---|---|---|
| 0:44 | `E087` 44.00 **ALAMANDRO**: śmieje się | · | plan ×1.13 | B 90 · A 25 |
| 0:45 | `E089` 45.00 **ALAMANDRO**: teleport z ciosem → trafia (−8)<br>`E090` 45.50 **ALAMANDRO**: teleport z ciosem → trafia (−8) | teleport ALAMANDRO | plan ×1.14 | B 82 · A 25 |
| 0:46 | `E091` 46.00 **ALAMANDRO**: teleport z ciosem → trafia (−10)<br>`E092` 46.60 **ALAMANDRO**: prosty → trafia (−6)<br>`E093` 46.82 **ALAMANDRO**: prosty tylną ręką → trafia (−7) | teleport ALAMANDRO | plan ×1.15 | B 64 · A 25 |
| 0:47 | `E094` 47.10 **ALAMANDRO**: podbródkowy → ogłusza (−99) | BISHUKIJ ogłuszony | plan ×1.15 | B 0 · A 25 |
| 0:48 | `E095` 48.00 ⚡ piorun | · | plan ×1.15 | B 0 · A 25 |
| 0:49 | `E096` 49.30 📣 „FINISH HIM!” | · | plan ×1.15 | B 0 · A 25 |

## S12
**ZWROT 4: serce** · 0:50–0:56 (6.0 s)

- **CO:** ZWROT 4 · SPINE OF THE STORM: piorun, zbliżenie na pięść, cios, głowa wyrwana z kręgosłupem; FATALITY
- **JAK:** zbliżenie 3× na pięść, werbel do kontaktu, cisza, potem odjazd
- **PO CO:** fatality, kulminacja

| t | Co się dzieje (scenariusz) | Wynik (log) | Kamera | HP |
|---|---|---|---|---|
| 0:50 | `E097` 50.00 ⚡ piorun<br>`E098` 50.00 **ALAMANDRO**: fatality (SPINE OF THE STORM) | · | zbliżenie ×3 · obrót 0.12 | B 0 · A 25 |
| 0:51 | · | kontakt: fatality<br>głowa z kręgosłupem wyrwana | plan ×1.31 | B 0 · A 25 |
| 0:52 | · | · | zbliżenie ×2.2 · obrót 0.28 | B 0 · A 25 |
| 0:53 | `E099` 53.00 **BISHUKIJ**: osuwa się<br>`E100` 53.80 ⏳ piasek zasypuje | ciało pada | zbliżenie ×2.18 · obrót 0.28 | B 0 · A 25 |
| 0:54 | `E101` 54.00 📣 „FATALITY” | · | bliżej ×1.47 · obrót 0.13 | B 0 · A 25 |
| 0:55 | · | · | plan ×1.12 | B 0 · A 25 |

## S13
**Wygrana** · 0:56–1:00 (4.0 s)

- **CO:** Lądowanie superbohatera z trofeum, ALAMANDRO WINS, THE STORM CHOSE BLACK., wiatr zasypuje kadr
- **JAK:** szeroki plan, muzyka zwycięstwa
- **PO CO:** puenta i zamknięcie

| t | Co się dzieje (scenariusz) | Wynik (log) | Kamera | HP |
|---|---|---|---|---|
| 0:56 | `E102` 56.00 **ALAMANDRO**: poza zwycięzcy<br>`E103` 56.80 📣 „ALAMANDRO WINS”<br>`E104` 56.80 🏆 runda wygrana | lądowanie superbohatera | plan ×1.12 | B 0 · A 25 |
| 0:57 | · | · | bliżej ×1.38 | B 0 · A 25 |
| 0:58 | `E105` 58.35 📣 „THE STORM CHOSE BLACK.” | · | bliżej ×1.69 | B 0 · A 25 |
| 0:59 | `E106` 59.30 ⬛ wyciemnienie | · | plan ×1.09 | B 0 · A 25 |
