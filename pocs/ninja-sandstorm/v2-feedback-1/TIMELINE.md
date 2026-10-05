# TIMELINE: The Storm Chose Black v2 (feedback 1)

> **Wygenerowane z animacji** (`node tools/timeline.mjs pocs/ninja-sandstorm/v2-feedback-1/storm.html`), nie pisane ręcznie, więc zawsze zgodne z kodem.
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
| 00:08 | fight / a | zoom 1.14, rot 0 | `E020` 8.15 **B** uppercut → hit (5)<br>`E021` 8.50 **A** highkick → miss<br>`E022` 8.55 **B** flip | A→B block<br>B→A hit uppercut −5 @28px<br>A→B miss | B 96 · A 83 |
| 00:09 | fight / a | zoom 1.06, rot 0 | `E023` 9.40 **B** jump → hit (6) | B→A hit jump −6 @58px | B 96 · A 83 |
| 00:10 | fight / a | zoom 1.14, rot 0 | `E024` 10.10 **A** cross → block<br>`E025` 10.35 **B** jab → hit (3)<br>`E026` 10.60 **A** kick → block | A→B block<br>B→A hit jab −3 @34px<br>A→B block | B 96 · A 74 |
| 00:11 | fight / a | zoom 1.25, rot 0.24 | `E027` 11.00 **B** choke | grab B→A choke | B 96 · A 74 |
| 00:12 | fight / a | zoom 2.15, rot 0 | · | B→A chip choke −3<br>B→A chip choke −3 | B 96 · A 71 |
| 00:13 | fight / a | zoom 2.15, rot 0 | · | B→A chip choke −3<br>B→A chip choke −3 | B 96 · A 65 |
| 00:14 | fight / a | zoom 1.15, rot 0 | `E028` 14.10 **A** elbow → hit (6) | B→A chip choke −3<br>A→B hit elbow −6 @15px<br>choke-break A→ | B 90 · A 59 |
| 00:15 | fight / a | zoom 1.14, rot 0 | `E029` 15.00 **A** cross → block<br>`E030` 15.25 **B** jab → hit (3)<br>`E031` 15.45 **B** cross → hit (4)<br>`E032` 15.70 **B** highkick → hit (6) | A→B block<br>B→A hit jab −3 @34px<br>B→A hit cross −4 @39px<br>B→A hit highkick −6 @49px | B 90 · A 56 |
| 00:16 | fight / a | zoom 1.13, rot 0 | `E033` 16.20 **A** run<br>`E034` 16.40 **A** jab → hit (3)<br>`E035` 16.65 **A** cross → block<br>`E036` 16.90 **B** kick → hit (5) | A→B hit jab −3 @34px<br>A→B block | B 87 · A 46 |
| 00:17 | fight / a | zoom 1.14, rot 0 | `E037` 17.20 **A** uppercut → block<br>`E038` 17.50 **B** flip | B→A hit kick −5 @42px<br>A→B block | B 87 · A 41 |
| 00:18 | fight / a | zoom 1.12, rot 0 | `E039` 18.05 **B** jump → hit (6)<br>`E040` 18.75 **A** knee → block | B→A hit jump −6 @46px<br>A→B block | B 87 · A 35 |
| 00:19 | fight / a | zoom 1.15, rot 0 | `E041` 19.00 **B** jab → hit (3)<br>`E042` 19.20 **A** jab → hit (3)<br>`E043` 19.40 **B** cross → hit (4)<br>`E044` 19.65 **A** kick → block<br>`E045` 19.95 **B** kick → hit (5) | B→A hit jab −3 @28px<br>A→B hit jab −3 @34px<br>B→A hit cross −4 @36px<br>A→B block | B 84 · A 32 |
| 00:20 | fight / a | zoom 1.1, rot 0 | `E046` 20.30 **A** step<br>`E047` 20.30 **B** step<br>`E048` 20.80 **B** jump | B→A hit kick −5 @46px | B 84 · A 23 |
| 00:21 | fight / a | zoom 1.6, rot 0.14 | `E049` 21.00 **A** parry<br>`E050` 21.18 **A** catch<br>`E051` 21.30 🎬 cue | parry A→B<br>catch A→B | B 84 · A 23 |
| 00:22 | fight / a | zoom 1.6, rot 0.07 | `E052` 22.55 🎬 special „BLACK MONSOON”<br>`E053` 22.60 **A** monsoon | special BLACK MONSOON<br>A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px | B 84 · A 23 |
| 00:23 | fight / a | zoom 1.16, rot 0 | · | A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px<br>A→B hit monsoon −4 @30px | B 56 · A 23 |
| 00:24 | fight / a | zoom 0.72, rot 0 | `E054` 24.50 🎬 banner „K.O.”<br>`E055` 24.50 🎬 music | **K.O. B** by A<br>**K.O. B** by A<br>📣 K.O. | B 0 · A 23 |
| 00:25 | fight / a | zoom 0.81, rot 0 | `E056` 25.60 🎬 roundwin<br>`E057` 25.60 **A** laugh | land B<br>roundwin A | B 0 · A 23 |
| 00:26 | fight / a | zoom 0.97, rot 0 | `E058` 26.40 🎬 transition | transition | B 0 · A 23 |
| 00:27 | fight / a | zoom 0.97, rot 0 | · | · | B 0 · A 23 |
| 00:28 | fight / a | zoom 0.97, rot 0 | · | · | B 0 · A 23 |
| 00:29 | fight / a | zoom 0.97, rot 0 | · | · | B 0 · A 23 |
| 00:30 | fight / b | zoom 0.99, rot 0 | `E059` 30.00 🎬 style<br>`E060` 30.00 🎬 round<br>`E061` 30.70 🎬 banner „ROUND TWO” | 📣 ROUND TWO | B 100 · A 100 |
| 00:31 | fight / b | zoom 0.99, rot 0 | `E062` 31.30 🎬 lightning | lightning | B 100 · A 100 |
| 00:32 | fight / b | zoom 0.99, rot 0 | `E063` 32.00 🎬 banner „FIGHT!”<br>`E064` 32.00 🎬 music<br>`E065` 32.60 **B** run | 📣 FIGHT! | B 100 · A 100 |
| 00:33 | fight / b | zoom 1.12, rot 0 | `E066` 33.00 **B** jab → hit (3)<br>`E067` 33.20 **B** cross → hit (3)<br>`E068` 33.45 **B** kick → hit (4)<br>`E069` 33.80 **A** jab → block | B→A hit jab −3 @34px<br>B→A hit cross −3 @39px<br>B→A hit kick −4 @48px<br>A→B block | B 100 · A 94 |
| 00:34 | fight / b | zoom 1.15, rot 0 | `E070` 34.00 **B** uppercut → hit (4)<br>`E071` 34.35 **A** cross → hit (5)<br>`E072` 34.60 **B** jab → hit (3)<br>`E073` 34.80 **A** kick → block | B→A hit uppercut −4 @28px<br>A→B hit cross −5 @36px<br>B→A hit jab −3 @34px<br>A→B block | B 95 · A 86 |
| 00:35 | fight / b | zoom 1.08, rot 0 | `E074` 35.10 **B** flip<br>`E075` 35.70 **B** jump → hit (5) | B→A hit jump −5 @58px | B 95 · A 83 |
| 00:36 | fight / b | zoom 1.13, rot 0 | `E076` 36.40 **A** knee → hit (5)<br>`E077` 36.65 **B** jab → hit (3)<br>`E078` 36.85 **B** cross → hit (3) | A→B hit knee −5 @24px<br>B→A hit jab −3 @31px<br>B→A hit cross −3 @39px | B 95 · A 78 |
| 00:37 | fight / b | zoom 1.14, rot 0 | `E079` 37.10 **A** jab → block<br>`E080` 37.30 🎬 lightning<br>`E081` 37.35 **B** highkick → hit (4)<br>`E082` 37.90 **A** cross → block | A→B block<br>lightning<br>B→A hit highkick −4 @39px | B 90 · A 72 |
| 00:38 | fight / b | zoom 1.13, rot 0 | `E083` 38.15 **B** kick → hit (3)<br>`E084` 38.50 **B** step | A→B block<br>B→A hit kick −3 @41px | B 90 · A 65 |
| 00:39 | fight / b | zoom 1.2, rot 0 | `E085` 39.00 **B** throw (40) | grab B→A throw<br>release B→ | B 90 · A 65 |
| 00:40 | fight / b | zoom 0.86, rot 0 | · | B→A impact throw −40 @211px<br>throw-impact B→A | B 90 · A 25 |
| 00:41 | fight / b | zoom 0.87, rot 0 | · | skid-stop | B 90 · A 25 |
| 00:42 | fight / b | zoom 0.95, rot 0 | `E086` 42.40 **A** getup | · | B 90 · A 25 |
| 00:43 | fight / b | zoom 0.95, rot 0 | `E087` 43.20 **B** run | · | B 90 · A 25 |
| 00:44 | fight / b | zoom 0.95, rot 0 | `E088` 44.00 **A** laugh<br>`E089` 44.00 🎬 cue | · | B 90 · A 25 |
| 00:45 | fight / b | zoom 1.1, rot 0 | `E090` 45.00 **A** blink → hit (8)<br>`E091` 45.50 **A** blink → hit (8) | blink A<br>A→B hit blink −8 @36px<br>blink A<br>A→B hit blink −8 @36px | B 82 · A 25 |
| 00:46 | fight / b | zoom 1.15, rot 0 | `E092` 46.00 **A** blink → hit (10)<br>`E093` 46.60 **A** jab → hit (6)<br>`E094` 46.82 **A** cross → hit (7) | blink A<br>A→B hit blink −10 @8px<br>A→B hit jab −6 @18px<br>A→B hit cross −7 @28px | B 64 · A 25 |
| 00:47 | fight / b | zoom 1.15, rot 0 | `E095` 47.10 **A** uppercut → stun (99) | stun A→B uppercut | B 0 · A 25 |
| 00:48 | fight / b | zoom 1.15, rot 0 | `E096` 48.00 🎬 lightning | lightning | B 0 · A 25 |
| 00:49 | fight / b | zoom 1.15, rot 0 | `E097` 49.30 🎬 banner „FINISH HIM!” | 📣 FINISH HIM! | B 0 · A 25 |
| 00:50 | fight / b | zoom 3, rot 0.12 | `E098` 50.00 🎬 lightning<br>`E099` 50.00 **A** heartrip | lightning | B 0 · A 25 |
| 00:51 | fight / b | zoom 1.31, rot 0.04 | · | heart A→B<br>heart-out A→ | B 0 · A 25 |
| 00:52 | fight / b | zoom 2.2, rot 0.28 | · | · | B 0 · A 25 |
| 00:53 | fight / b | zoom 2.18, rot 0.28 | `E100` 53.00 **B** collapse<br>`E101` 53.80 🎬 bury | fall B<br>bury | B 0 · A 25 |
| 00:54 | fight / b | zoom 1.47, rot 0.13 | `E102` 54.00 🎬 banner „FATALITY” | 📣 FATALITY | B 0 · A 25 |
| 00:55 | fight / b | zoom 1.12, rot 0 | · | · | B 0 · A 25 |
| 00:56 | fight / b | zoom 1.12, rot 0 | `E103` 56.00 **A** winpose<br>`E104` 56.80 🎬 banner „ALAMANDRO WINS”<br>`E105` 56.80 🎬 roundwin | winpose A<br>📣 ALAMANDRO WINS<br>roundwin A | B 0 · A 25 |
| 00:57 | fight / b | zoom 1.38, rot -0.05 | `E106` 57.90 🎬 banner „THE STORM CHOSE BLACK.” | 📣 THE STORM CHOSE BLACK. | B 0 · A 25 |
| 00:58 | fight / b | zoom 1.69, rot -0.05 | · | · | B 0 · A 25 |
| 00:59 | fight / b | zoom 1.09, rot 0 | `E107` 59.30 🎬 fade | · | B 0 · A 25 |
