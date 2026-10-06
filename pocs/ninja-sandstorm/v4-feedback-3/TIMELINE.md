# TIMELINE: The Storm Chose Black v4 (feedback 3)

> **Wygenerowane z animacji** (`node tools/timeline.mjs pocs/ninja-sandstorm/v4-feedback-3/storm.html`), nie pisane ręcznie, więc zawsze zgodne z kodem.
> Kolumny: **Scenariusz** = co reżyseruje kod (ID zdarzenia + czas startu), **Wynik** = co się faktycznie wydarzyło (log), stan kamery i HP w połowie sekundy.
> Poprawki zgłaszaj wg [`docs/EDIT-PROTOCOL.md`](../../../docs/EDIT-PROTOCOL.md), np. `@41.2 rzut wyżej` albo `E087 wolniej`.

| t | Scena | Kamera | Scenariusz | Wynik | HP |
|---|---|---|---|---|---|
| 00:00 | intro / a | zoom 1.3, rot 0 | `E000` 0.00 🎬 scene<br>`E001` 0.00 🎬 music<br>`E002` 0.00 🎬 cue | · | B 100 · A 100 |
| 00:01 | intro / a | zoom 1.3, rot 0 | · | · | B 100 · A 100 |
| 00:02 | intro / a | zoom 1.3, rot 0 | · | · | B 100 · A 100 |
| 00:03 | fight / a | zoom 1.03, rot 0 | `E003` 3.00 🎬 scene<br>`E004` 3.00 🎬 round<br>`E005` 3.10 🎬 banner „ROUND ONE” | 📣 ROUND ONE | B 100 · A 100 |
| 00:04 | fight / a | zoom 0.99, rot 0 | `E006` 4.30 🎬 banner „FIGHT!”<br>`E007` 4.30 🎬 music | 📣 FIGHT! | B 100 · A 100 |
| 00:05 | fight / a | zoom 1.11, rot 0 | `E008` 5.00 **B** run<br>`E009` 5.00 **A** run<br>`E010` 5.35 **B** jump<br>`E011` 5.35 **A** jump<br>`E012` 5.63 🎬 clash | clash | B 100 · A 100 |
| 00:06 | fight / a | zoom 1.14, rot 0 | `E013` 6.20 **A** jab → block<br>`E014` 6.45 **A** cross → block<br>`E015` 6.70 **A** kick → hit (4)<br>`E016` 6.98 **B** jab → hit (3) | A→B block<br>A→B block<br>A→B hit kick −4 @41px | B 100 · A 100 |
| 00:07 | fight / a | zoom 1.14, rot 0 | `E017` 7.20 **B** cross → hit (4)<br>`E018` 7.45 **B** kick → hit (5)<br>`E019` 7.80 **A** highkick → block | B→A hit jab −3 @34px<br>B→A hit cross −4 @39px<br>B→A hit kick −5 @48px | B 96 · A 93 |
| 00:08 | fight / a | zoom 1.14, rot 0 | `E020` 8.15 **B** uppercut → hit (5)<br>`E021` 8.50 **A** highkick → miss<br>`E022` 8.55 **B** sweep | A→B block<br>B→A hit uppercut −5 @28px<br>A→B miss | B 96 · A 83 |
| 00:09 | fight / a | zoom 1.14, rot 0 | `E023` 9.55 **B** step<br>`E024` 9.85 **A** getup | B→A hit sweep −6 @38px<br>sweep B→A<br>knockdown A | B 96 · A 77 |
| 00:10 | fight / a | zoom 1.11, rot 0 | `E025` 10.55 **B** jab → hit (3) | B→A hit jab −3 @34px | B 96 · A 77 |
| 00:11 | fight / a | zoom 1.25, rot 0.24 | `E026` 11.00 **B** choke | grab B→A choke | B 96 · A 74 |
| 00:12 | fight / a | zoom 2.15, rot 0 | · | B→A chip choke −3<br>B→A chip choke −3 | B 96 · A 71 |
| 00:13 | fight / a | zoom 2.15, rot 0 | · | B→A chip choke −3<br>B→A chip choke −3 | B 96 · A 65 |
| 00:14 | fight / a | zoom 1.15, rot 0 | `E027` 14.10 **A** elbow → hit (6) | B→A chip choke −3<br>A→B hit elbow −6 @15px<br>choke-break A→ | B 90 · A 59 |
| 00:15 | fight / a | zoom 1.14, rot 0 | `E028` 15.00 **A** cross → block<br>`E029` 15.25 **B** jab → hit (3)<br>`E030` 15.45 **B** cross → hit (4)<br>`E031` 15.70 **B** highkick → hit (6) | A→B block<br>B→A hit jab −3 @34px<br>B→A hit cross −4 @39px<br>B→A hit highkick −6 @49px | B 90 · A 56 |
| 00:16 | fight / a | zoom 1.13, rot 0 | `E032` 16.20 **A** run<br>`E033` 16.40 **A** jab → hit (3)<br>`E034` 16.65 **A** cross → block<br>`E035` 16.90 **B** kick → hit (5) | A→B hit jab −3 @34px<br>A→B block | B 87 · A 46 |
| 00:17 | fight / a | zoom 1.13, rot 0 | `E036` 17.20 **A** uppercut → miss<br>`E037` 17.25 **B** flip | B→A hit kick −5 @42px<br>A→B miss | B 87 · A 41 |
| 00:18 | fight / a | zoom 1.13, rot 0 | `E038` 18.05 **B** jump → hit (6)<br>`E039` 18.75 **A** knee → block | B→A hit jump −6 @41px<br>A→B block | B 87 · A 35 |
| 00:19 | fight / a | zoom 1.15, rot 0 | `E040` 19.00 **B** jab → hit (3)<br>`E041` 19.20 **A** jab → hit (3)<br>`E042` 19.40 **B** cross → hit (4)<br>`E043` 19.65 **A** kick → block<br>`E044` 19.95 **B** kick → hit (5) | B→A hit jab −3 @23px<br>A→B hit jab −3 @30px<br>B→A hit cross −4 @36px<br>A→B block | B 84 · A 32 |
| 00:20 | fight / a | zoom 1.1, rot 0 | `E045` 20.30 **A** step<br>`E046` 20.30 **B** step<br>`E047` 20.80 **B** jump | B→A hit kick −5 @46px | B 84 · A 23 |
| 00:21 | fight / a | zoom 1.6, rot -0.14 | `E048` 21.00 **A** parry<br>`E049` 21.18 **A** catch<br>`E050` 21.30 🎬 cue | parry A→B<br>catch A→B<br>armlock A→B | B 84 · A 23 |
| 00:22 | fight / a | zoom 1.6, rot -0.07 | `E051` 22.55 🎬 special „BLACK MONSOON”<br>`E052` 22.60 **A** monsoon | special BLACK MONSOON<br>A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px | B 84 · A 23 |
| 00:23 | fight / a | zoom 1.16, rot 0 | · | A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px | B 56 · A 23 |
| 00:24 | fight / a | zoom 0.72, rot 0 | `E053` 24.50 🎬 banner „K.O.”<br>`E054` 24.50 🎬 music | **K.O. B** by A<br>**K.O. B** by A<br>📣 K.O. | B 0 · A 23 |
| 00:25 | fight / a | zoom 0.81, rot 0 | `E055` 25.60 🎬 roundwin<br>`E056` 25.60 **A** laugh | land B<br>roundwin A | B 0 · A 23 |
| 00:26 | fight / a | zoom 0.97, rot 0 | `E057` 26.40 🎬 transition | transition | B 0 · A 23 |
| 00:27 | fight / a | zoom 0.97, rot 0 | · | · | B 0 · A 23 |
| 00:28 | fight / a | zoom 0.97, rot 0 | · | · | B 0 · A 23 |
| 00:29 | fight / a | zoom 0.97, rot 0 | · | · | B 0 · A 23 |
| 00:30 | fight / a | zoom 0.99, rot 0 | `E058` 30.00 🎬 style<br>`E059` 30.00 🎬 round<br>`E060` 30.70 🎬 banner „ROUND TWO” | 📣 ROUND TWO | B 100 · A 100 |
| 00:31 | fight / a | zoom 0.99, rot 0 | `E061` 31.30 🎬 lightning | lightning | B 100 · A 100 |
| 00:32 | fight / a | zoom 0.99, rot 0 | `E062` 32.00 🎬 banner „FIGHT!”<br>`E063` 32.00 🎬 music<br>`E064` 32.60 **B** run | 📣 FIGHT! | B 100 · A 100 |
| 00:33 | fight / a | zoom 1.12, rot 0 | `E065` 33.00 **B** jab → hit (3)<br>`E066` 33.20 **B** cross → hit (3)<br>`E067` 33.45 **B** kick → hit (4)<br>`E068` 33.80 **A** jab → block | B→A hit jab −3 @34px<br>B→A hit cross −3 @39px<br>B→A hit kick −4 @48px<br>A→B block | B 100 · A 94 |
| 00:34 | fight / a | zoom 1.15, rot 0 | `E069` 34.00 **B** uppercut → hit (4)<br>`E070` 34.35 **A** cross → hit (5)<br>`E071` 34.60 **B** jab → hit (3)<br>`E072` 34.80 **A** kick → miss<br>`E073` 34.85 **B** flip | B→A hit uppercut −4 @28px<br>A→B hit cross −5 @36px<br>B→A hit jab −3 @34px<br>A→B miss | B 95 · A 86 |
| 00:35 | fight / a | zoom 1.07, rot 0 | `E074` 35.70 **B** jump → hit (5) | B→A hit jump −5 @53px | B 95 · A 83 |
| 00:36 | fight / a | zoom 1.14, rot 0 | `E075` 36.40 **A** knee → hit (5)<br>`E076` 36.65 **B** jab → hit (3)<br>`E077` 36.85 **B** cross → hit (3) | A→B hit knee −5 @24px<br>B→A hit jab −3 @31px<br>B→A hit cross −3 @39px | B 95 · A 78 |
| 00:37 | fight / a | zoom 1.14, rot 0 | `E078` 37.10 **A** jab → block<br>`E079` 37.30 🎬 lightning<br>`E080` 37.35 **B** highkick → hit (4)<br>`E081` 37.90 **A** cross → block | A→B block<br>lightning<br>B→A hit highkick −4 @39px | B 90 · A 72 |
| 00:38 | fight / a | zoom 1.13, rot 0 | `E082` 38.15 **B** kick → hit (3)<br>`E083` 38.50 **B** step | A→B block<br>B→A hit kick −3 @41px | B 90 · A 65 |
| 00:39 | fight / a | zoom 1.35, rot 0 | `E084` 39.00 **B** throw (40) | grab B→A throw<br>release B→ | B 90 · A 65 |
| 00:40 | fight / a | zoom 1.18, rot 0 | · | B→A impact throw −40 @34px<br>throw-impact B→A<br>topple | B 90 · A 25 |
| 00:41 | fight / a | zoom 1.15, rot 0 | · | · | B 90 · A 25 |
| 00:42 | fight / a | zoom 1.15, rot 0 | `E085` 42.40 **A** getup | · | B 90 · A 25 |
| 00:43 | fight / a | zoom 1.14, rot 0 | `E086` 43.20 **B** step | · | B 90 · A 25 |
| 00:44 | fight / a | zoom 1.13, rot 0 | `E087` 44.00 **A** laugh<br>`E088` 44.00 🎬 cue | · | B 90 · A 25 |
| 00:45 | fight / a | zoom 1.14, rot 0 | `E089` 45.00 **A** blink → hit (8)<br>`E090` 45.50 **A** blink → hit (8) | blink A<br>A→B hit blink −8 @36px<br>blink A<br>A→B hit blink −8 @36px | B 82 · A 25 |
| 00:46 | fight / a | zoom 1.15, rot 0 | `E091` 46.00 **A** blink → hit (10)<br>`E092` 46.60 **A** jab → hit (6)<br>`E093` 46.82 **A** cross → hit (7) | blink A<br>A→B hit blink −10 @8px<br>A→B hit jab −6 @18px<br>A→B hit cross −7 @28px | B 64 · A 25 |
| 00:47 | fight / a | zoom 1.15, rot 0 | `E094` 47.10 **A** uppercut → stun (99) | stun A→B uppercut | B 0 · A 25 |
| 00:48 | fight / a | zoom 1.15, rot 0 | `E095` 48.00 🎬 lightning | lightning | B 0 · A 25 |
| 00:49 | fight / a | zoom 1.15, rot 0 | `E096` 49.30 🎬 banner „FINISH HIM!” | 📣 FINISH HIM! | B 0 · A 25 |
| 00:50 | fight / a | zoom 3, rot 0.12 | `E097` 50.00 🎬 lightning<br>`E098` 50.00 **A** heartrip | lightning | B 0 · A 25 |
| 00:51 | fight / a | zoom 1.31, rot 0.04 | · | heart A→B<br>spine-out A→ | B 0 · A 25 |
| 00:52 | fight / a | zoom 2.2, rot 0.28 | · | · | B 0 · A 25 |
| 00:53 | fight / a | zoom 2.18, rot 0.28 | `E099` 53.00 **B** collapse<br>`E100` 53.80 🎬 bury | fall B<br>bury | B 0 · A 25 |
| 00:54 | fight / a | zoom 1.47, rot 0.13 | `E101` 54.00 🎬 banner „FATALITY” | 📣 FATALITY | B 0 · A 25 |
| 00:55 | fight / a | zoom 1.12, rot 0 | · | · | B 0 · A 25 |
| 00:56 | fight / a | zoom 1.12, rot 0 | `E102` 56.00 **A** winpose<br>`E103` 56.80 🎬 banner „ALAMANDRO WINS”<br>`E104` 56.80 🎬 roundwin | winpose A<br>📣 ALAMANDRO WINS<br>roundwin A | B 0 · A 25 |
| 00:57 | fight / a | zoom 1.38, rot -0.05 | · | · | B 0 · A 25 |
| 00:58 | fight / a | zoom 1.69, rot -0.05 | `E105` 58.35 🎬 banner „THE STORM CHOSE BLACK.” | 📣 THE STORM CHOSE BLACK. | B 0 · A 25 |
| 00:59 | fight / a | zoom 1.09, rot 0 | `E106` 59.30 🎬 fade | · | B 0 · A 25 |
