# TIMELINE: Paper Cuts Super Turbo V v1

> **Wygenerowane z animacji** (`node tools/timeline.mjs pocs/paperclip-vs-pencil/v1-pixel-120s/paper-cuts.html`), nie pisane ręcznie, więc zawsze zgodne z kodem.
> Kolumny: **Scenariusz** = co reżyseruje kod (ID zdarzenia + czas startu), **Wynik** = co się faktycznie wydarzyło (log), stan kamery i HP w połowie sekundy.
> Poprawki zgłaszaj wg [`docs/EDIT-PROTOCOL.md`](../../../docs/EDIT-PROTOCOL.md), np. `@41.2 rzut wyżej` albo `E087 wolniej`.

| t | Scena | Kamera | Scenariusz | Wynik | HP |
|---|---|---|---|---|---|
| 00:00 | title | roll 0, orbit 0 | `E000` 0.00 🎬 scene<br>`E001` 0.05 🎬 music<br>`E002` 0.60 🎬 flash | · | GEM 100 · HB 100 |
| 00:01 | title | roll 0, orbit 0 | · | · | GEM 100 · HB 100 |
| 00:02 | title | roll 0, orbit 0 | · | · | GEM 100 · HB 100 |
| 00:03 | title | roll 0, orbit 0 | · | · | GEM 100 · HB 100 |
| 00:04 | title | roll 0, orbit 0 | · | · | GEM 100 · HB 100 |
| 00:05 | title | roll 0, orbit 0 | · | · | GEM 100 · HB 100 |
| 00:06 | vs | roll 0, orbit 0 | `E003` 6.00 🎬 scene<br>`E004` 6.00 🎬 flash<br>`E005` 6.05 🎬 jingle | · | GEM 100 · HB 100 |
| 00:07 | vs | roll 0, orbit 0 | `E006` 7.00 🎬 say „Gem. Versus. H B.” | · | GEM 100 · HB 100 |
| 00:08 | vs | roll 0, orbit 0 | · | · | GEM 100 · HB 100 |
| 00:09 | vs | roll 0, orbit 0 | · | · | GEM 100 · HB 100 |
| 00:10 | vs | roll 0, orbit 0 | · | · | GEM 100 · HB 100 |
| 00:11 | vs | roll 0, orbit 0 | · | · | GEM 100 · HB 100 |
| 00:12 | fight | roll 0, orbit 0 | `E007` 12.00 🎬 scene<br>`E008` 12.00 🎬 flash<br>`E009` 12.00 🎬 music<br>`E010` 12.00 🎬 round<br>`E011` 12.30 🎬 banner „ROUND 1” | 📣 ROUND 1 | GEM 100 · HB 100 |
| 00:13 | fight | roll 0, orbit 0 | · | · | GEM 100 · HB 100 |
| 00:14 | fight | roll 0, orbit 0 | `E012` 14.50 🎬 banner „FIGHT!”<br>`E013` 14.50 🎬 music | 📣 FIGHT! | GEM 100 · HB 100 |
| 00:15 | fight | roll 0, orbit 0 | · | · | GEM 100 · HB 100 |
| 00:16 | fight | roll 0, orbit 0 | `E014` 16.00 **HB** dash<br>`E015` 16.40 **HB** slash → hit (6)<br>`E016` 16.85 **HB** slash → hit (6) | HB→GEM hit −6 @43px<br>HB→GEM hit −6 @51px | GEM 100 · HB 100 |
| 00:17 | fight | roll 0, orbit 0 | `E017` 17.30 **HB** slash → hit (8)<br>`E018` 17.90 **HB** taunt | HB→GEM hit −8 @59px | GEM 80 · HB 100 |
| 00:18 | fight | roll 0, orbit 0 | `E019` 18.00 **GEM** swim | · | GEM 80 · HB 100 |
| 00:19 | fight | roll 0, orbit 0 | `E020` 19.10 **GEM** spring → hit (8)<br>`E021` 19.90 **HB** block | GEM→HB hit −8 @43px | GEM 80 · HB 100 |
| 00:20 | fight | roll 0, orbit 0 | `E022` 20.00 **GEM** lasso → block<br>`E023` 20.90 **HB** slash → hit (6) | GEM→HB block | GEM 80 · HB 92 |
| 00:21 | fight | roll 0, orbit 0 | `E024` 21.30 **HB** slash → hit (7) | HB→GEM hit −6 @55px<br>HB→GEM hit −7 @63px | GEM 67 · HB 92 |
| 00:22 | fight | roll 0, orbit 0 | `E025` 22.20 **GEM** walk<br>`E026` 22.20 **HB** walk | · | GEM 67 · HB 92 |
| 00:23 | fight | roll 0, orbit 0 | `E027` 23.20 **GEM** lever (10) | grab GEM→HB lever | GEM 67 · HB 92 |
| 00:24 | fight | roll 0, orbit 0 | · | GEM→HB chip −10 @30px | GEM 67 · HB 82 |
| 00:25 | fight | roll 0, orbit 0 | `E028` 25.20 **HB** thrust → hit (10) | HB→GEM hit −10 @30px | GEM 57 · HB 82 |
| 00:26 | fight | roll 0, orbit 0 | `E029` 26.20 **GEM** dodge<br>`E030` 26.25 **HB** slash → miss<br>`E031` 26.80 **HB** slash → hit (6) | HB→GEM miss<br>HB→GEM hit −6 @59px | GEM 57 · HB 82 |
| 00:27 | fight | roll 0, orbit 0 | `E032` 27.20 **HB** slash → hit (6)<br>`E033` 27.60 **HB** slash → hit (8) | HB→GEM hit −6 @67px<br>HB→GEM hit −8 @75px | GEM 45 · HB 82 |
| 00:28 | fight | roll 0, orbit 0 | `E034` 28.60 **GEM** swim | · | GEM 37 · HB 82 |
| 00:29 | fight | roll 0, orbit 0 | `E035` 29.80 **GEM** spring → hit (8) | · | GEM 37 · HB 82 |
| 00:30 | fight | roll 0, orbit 0 | `E036` 30.70 **GEM** lasso → hit (7) | GEM→HB hit −8 @48px<br>GEM→HB hit −7 @62px | GEM 37 · HB 74 |
| 00:31 | fight | roll 0, orbit 0 | `E037` 31.60 **HB** taunt | · | GEM 37 · HB 67 |
| 00:32 | fight | roll 0, orbit 0 | `E038` 32.20 **GEM** lasso<br>`E039` 32.30 **HB** erase → erase | erase HB→GEM | GEM 37 · HB 67 |
| 00:33 | fight | roll 0, orbit 0 | `E040` 33.10 **GEM** shock<br>`E041` 33.40 **HB** taunt | · | GEM 37 · HB 67 |
| 00:34 | fight | roll 0, orbit 0 | `E042` 34.60 **HB** thrust → hit (10) | HB→GEM hit −10 @32px | GEM 37 · HB 67 |
| 00:35 | fight | roll 0, orbit 0 | `E043` 35.50 **HB** slash → hit (6)<br>`E044` 35.90 **HB** slash → hit (6) | HB→GEM hit −6 @49px | GEM 27 · HB 67 |
| 00:36 | fight | roll 0, orbit 0 | `E045` 36.30 **HB** slash → hit (8) | HB→GEM hit −6 @57px<br>HB→GEM hit −8 @65px | GEM 7 · HB 67 |
| 00:37 | fight | roll 0, orbit 0 | `E046` 37.20 **GEM** swim | · | GEM 7 · HB 67 |
| 00:38 | fight | roll 0, orbit 0 | `E047` 38.40 **GEM** spring → miss<br>`E048` 38.50 **HB** dash | GEM→HB miss | GEM 7 · HB 67 |
| 00:39 | fight | roll 0, orbit 0 | `E049` 39.20 **HB** dash<br>`E050` 39.60 **HB** slash → hit (8) | HB→GEM hit −8 @39px | GEM 7 · HB 67 |
| 00:40 | fight | roll 0, orbit 0 | `E051` 40.40 **GEM** lasso → hit (5) | GEM→HB hit −5 @60px | GEM 6 · HB 67 |
| 00:41 | fight | roll 0, orbit 0 | `E052` 41.30 **HB** slash → hit (7)<br>`E053` 41.70 **HB** slash → hit (7) | HB→GEM hit −7 @41px<br>HB→GEM hit −7 @49px | GEM 6 · HB 62 |
| 00:42 | fight | roll 0, orbit 0 | `E054` 42.60 **HB** dash | · | GEM 6 · HB 62 |
| 00:43 | fight | roll 0, orbit 0 | `E055` 43.00 **HB** thrust → hit (12)<br>`E056` 43.30 🎬 banner „K.O.”<br>`E057` 43.30 🎬 music | **K.O. GEM** by HB<br>📣 K.O. | GEM 0 · HB 62 |
| 00:44 | fight | roll 0, orbit 0 | · | · | GEM 0 · HB 62 |
| 00:45 | fight | roll 0, orbit 0 | `E058` 45.00 **HB** win<br>`E059` 45.00 🎬 banner „HB WINS”<br>`E060` 45.00 🎬 roundwin<br>`E061` 45.00 🎬 jingle | 📣 HB WINS<br>roundwin HB | GEM 0 · HB 62 |
| 00:46 | fight | roll 0, orbit 0 | `E062` 46.00 **GEM** getup<br>`E063` 46.60 🎬 regrow | regrow | GEM 0 · HB 62 |
| 00:47 | fight | roll 0, orbit 0 | `E064` 47.50 🎬 flash<br>`E065` 47.60 🎬 round | · | GEM 0 · HB 62 |
| 00:48 | fight | roll 0, orbit 0 | · | · | GEM 100 · HB 100 |
| 00:49 | fight | roll 0, orbit 0 | `E066` 49.00 🎬 banner „ROUND 2” | 📣 ROUND 2 | GEM 100 · HB 100 |
| 00:50 | fight | roll 0, orbit 0 | · | · | GEM 100 · HB 100 |
| 00:51 | fight | roll 0, orbit 0 | `E067` 51.20 🎬 banner „FIGHT!”<br>`E068` 51.20 🎬 music | 📣 FIGHT! | GEM 100 · HB 100 |
| 00:52 | fight | roll 0, orbit 0 | `E069` 52.20 **GEM** swim<br>`E070` 52.60 **HB** dash | · | GEM 100 · HB 100 |
| 00:53 | fight | roll 0, orbit 0 | `E071` 53.70 **HB** thrust → miss | HB→GEM miss | GEM 100 · HB 100 |
| 00:54 | fight | roll 0, orbit 0 | `E072` 54.40 **GEM** lasso → hit (8) | GEM→HB hit −8 @40px | GEM 100 · HB 100 |
| 00:55 | fight | roll 0, orbit 0 | `E073` 55.20 **GEM** lever (12) | grab GEM→HB lever | GEM 100 · HB 92 |
| 00:56 | fight | roll 0, orbit 0 | · | GEM→HB chip −12 @30px | GEM 100 · HB 80 |
| 00:57 | fight | roll 0, orbit 0 | `E074` 57.00 **HB** slash → hit (6)<br>`E075` 57.40 **HB** slash → hit (7) | HB→GEM hit −6 @39px<br>HB→GEM hit −7 @47px | GEM 94 · HB 80 |
| 00:58 | fight | roll 0, orbit 0 | `E076` 58.40 **HB** dash<br>`E077` 58.80 **GEM** dodge<br>`E078` 58.85 **HB** slash → miss | HB→GEM miss | GEM 87 · HB 80 |
| 00:59 | fight | roll 0, orbit 0 | `E079` 59.60 **GEM** spring → hit (8) | · | GEM 87 · HB 80 |
| 01:00 | fight | roll 0, orbit 0 | `E080` 60.50 **HB** block<br>`E081` 60.60 **GEM** lasso → block | GEM→HB hit −8 @47px<br>GEM→HB block | GEM 87 · HB 72 |
| 01:01 | fight | roll 0, orbit 0 | `E082` 61.60 **HB** thrust → hit (10) | HB→GEM hit −10 @48px | GEM 87 · HB 72 |
| 01:02 | fight | roll 0, orbit 0 | `E083` 62.60 **GEM** swim | · | GEM 77 · HB 72 |
| 01:03 | fight | roll 0, orbit 0 | `E084` 63.40 **GEM** suplex (18)<br>`E085` 63.90 🎬 roll | grab GEM→HB suplex<br>🎥 roll | GEM 77 · HB 72 |
| 01:04 | fight | roll 2.68, orbit 0 | · | · | GEM 77 · HB 72 |
| 01:05 | fight | roll 0, orbit 0 | · | GEM→HB slam −18 @34px | GEM 77 · HB 54 |
| 01:06 | fight | roll 0, orbit 0 | `E086` 66.40 **HB** getup | · | GEM 77 · HB 54 |
| 01:07 | fight | roll 0, orbit 0 | `E087` 67.20 **HB** slash → hit (7)<br>`E088` 67.60 **HB** slash → hit (7) | HB→GEM hit −7 @27px<br>HB→GEM hit −7 @35px | GEM 70 · HB 54 |
| 01:08 | fight | roll 0, orbit 0 | `E089` 68.00 **GEM** dodge<br>`E090` 68.05 **HB** slash → miss | HB→GEM miss | GEM 63 · HB 54 |
| 01:09 | fight | roll 0, orbit 0 | `E091` 69.00 **HB** dash<br>`E092` 69.50 **HB** block<br>`E093` 69.60 **GEM** lasso → block | GEM→HB block | GEM 63 · HB 54 |
| 01:10 | fight | roll 0, orbit 0 | `E094` 70.60 **HB** thrust → snap | snap HB→GEM | GEM 63 · HB 54 |
| 01:11 | fight | roll 0, orbit 0 | `E095` 71.20 **HB** panic | · | GEM 59 · HB 54 |
| 01:12 | fight | roll 0, orbit 0 | · | · | GEM 59 · HB 54 |
| 01:13 | fight | roll 0, orbit 0 | `E096` 73.00 **GEM** spring → hit (8)<br>`E097` 73.90 **GEM** lasso → hit (7) | GEM→HB hit −8 @43px | GEM 59 · HB 46 |
| 01:14 | fight | roll 0, orbit 0 | `E098` 74.80 **HB** slash → hit (2) | GEM→HB hit −7 @56px<br>HB→GEM hit −2 @41px | GEM 59 · HB 39 |
| 01:15 | fight | roll 0, orbit 0 | `E099` 75.60 **GEM** lever (10) | grab GEM→HB lever | GEM 57 · HB 39 |
| 01:16 | fight | roll 0, orbit 0 | · | GEM→HB chip −10 @30px | GEM 57 · HB 29 |
| 01:17 | fight | roll 0, orbit 0 | `E100` 77.80 **HB** panic | · | GEM 57 · HB 29 |
| 01:18 | fight | roll 0, orbit 0 | `E101` 78.60 **GEM** lasso → hit (6) | GEM→HB hit −6 @90px | GEM 57 · HB 29 |
| 01:19 | fight | roll 0, orbit 0 | `E102` 79.60 **HB** block<br>`E103` 79.80 **GEM** spring → block | · | GEM 57 · HB 23 |
| 01:20 | fight | roll 0, orbit 0 | `E104` 80.80 **HB** slash → hit (2) | GEM→HB block<br>HB→GEM hit −2 @39px | GEM 57 · HB 23 |
| 01:21 | fight | roll 0, orbit 0 | `E105` 81.60 **GEM** swim | · | GEM 55 · HB 23 |
| 01:22 | fight | roll 0, orbit 0 | `E106` 82.40 **GEM** spring → hit (8) | GEM→HB hit −8 @36px | GEM 55 · HB 23 |
| 01:23 | fight | roll 0, orbit 0 | `E107` 83.40 **HB** slash → hit (2) | HB→GEM hit −2 @43px | GEM 55 · HB 15 |
| 01:24 | fight | roll 0, orbit 0 | `E108` 84.20 **GEM** lasso → hit (4)<br>`E109` 84.90 **GEM** spinthrow (16) | GEM→HB hit −4 @54px | GEM 53 · HB 11 |
| 01:25 | fight | roll 0, orbit 0 | · | grab GEM→HB spinthrow | GEM 53 · HB 11 |
| 01:26 | fight | roll 0, orbit 0 | `E110` 86.50 🎬 banner „K.O.”<br>`E111` 86.50 🎬 music | **K.O. HB** by GEM<br>📣 K.O. | GEM 53 · HB 0 |
| 01:27 | fight | roll 0, orbit 0 | `E112` 87.90 **GEM** win<br>`E113` 87.90 🎬 banner „GEM WINS”<br>`E114` 87.90 🎬 roundwin<br>`E115` 87.90 🎬 jingle | 📣 GEM WINS<br>roundwin GEM | GEM 53 · HB 0 |
| 01:28 | fight | roll 0, orbit 0 | · | · | GEM 53 · HB 0 |
| 01:29 | fight | roll 0, orbit 0 | `E116` 89.20 **HB** getup<br>`E117` 89.70 🎬 flash<br>`E118` 89.80 🎬 round | · | GEM 53 · HB 0 |
| 01:30 | fight | roll 0, orbit 0 | `E119` 90.20 🎬 banner „FINAL ROUND” | 📣 FINAL ROUND | GEM 100 · HB 100 |
| 01:31 | fight | roll 0, orbit 0 | · | · | GEM 100 · HB 100 |
| 01:32 | fight | roll 0, orbit 0 | `E120` 92.30 🎬 banner „FIGHT!”<br>`E121` 92.30 🎬 music<br>`E122` 92.40 **HB** dash<br>`E123` 92.40 **GEM** swim | 📣 FIGHT! | GEM 100 · HB 100 |
| 01:33 | fight | roll 0, orbit 0 | `E124` 93.00 **HB** sharpen | sharpen-start HB | GEM 100 · HB 100 |
| 01:34 | fight | roll 0, orbit 0 | `E125` 94.20 **GEM** taunt | sharpen HB | GEM 100 · HB 100 |
| 01:35 | fight | roll 0, orbit 0 | `E126` 95.10 **HB** dash<br>`E127` 95.60 🎬 superflash<br>`E128` 95.60 🎬 label „GRAPHITE STORM!”<br>`E129` 95.70 **HB** super | super HB<br>HB→GEM chip −6 @15px | GEM 100 · HB 100 |
| 01:36 | fight | roll 0, orbit 0 | · | HB→GEM chip −6 @36px<br>HB→GEM chip −6 @20px<br>HB→GEM chip −6 @33px<br>HB→GEM chip −6 @24px | GEM 82 · HB 100 |
| 01:37 | fight | roll 0, orbit 0 | · | HB→GEM chip −6 @27px<br>HB→GEM chip −6 @31px<br>HB→GEM chip −6 @23px | GEM 58 · HB 100 |
| 01:38 | fight | roll 0, orbit 0 | `E130` 98.80 **GEM** swim | · | GEM 52 · HB 100 |
| 01:39 | fight | roll 0, orbit 0 | `E131` 99.00 **HB** thrust → miss | HB→GEM miss | GEM 52 · HB 100 |
| 01:40 | fight | roll 0, orbit 0 | `E132` 100.20 **GEM** lever (16) | grab GEM→HB lever | GEM 52 · HB 100 |
| 01:41 | fight | roll 0, orbit 0 | · | GEM→HB chip −16 @30px | GEM 52 · HB 84 |
| 01:42 | fight | roll 0, orbit 0 | `E133` 102.00 **HB** slash → hit (9)<br>`E134` 102.40 **HB** slash → hit (9) | HB→GEM hit −9 @39px<br>HB→GEM hit −9 @47px | GEM 43 · HB 84 |
| 01:43 | fight | roll 0, orbit 0 | `E135` 103.20 **GEM** spring → hit (12) | GEM→HB hit −12 @46px | GEM 34 · HB 84 |
| 01:44 | fight | roll 0, orbit 0.26 | `E136` 104.00 🎬 orbit<br>`E137` 104.00 **GEM** taunt<br>`E138` 104.00 **HB** taunt | 🎥 orbit | GEM 34 · HB 72 |
| 01:45 | fight | roll 0, orbit 0 | `E139` 105.60 **HB** thrust → hit (14) | 🎥 orbit-end<br>HB→GEM hit −14 @34px | GEM 34 · HB 72 |
| 01:46 | fight | roll 0, orbit 0 | `E140` 106.40 🎬 superflash | super GEM | GEM 20 · HB 72 |
| 01:47 | fight | roll 0, orbit 0 | `E141` 107.00 **GEM** unbend<br>`E142` 107.60 **GEM** wrap (14) | GEM→HB chip −14 @54px | GEM 20 · HB 72 |
| 01:48 | fight | roll 0, orbit 0 | `E143` 108.00 **HB** stab → chip (30)<br>`E144` 108.80 **GEM** spinthrow (24) | HB→GEM chip −30 @54px | GEM 6 · HB 58 |
| 01:49 | fight | roll 0, orbit 0 | · | grab GEM→HB spinthrow | GEM 6 · HB 58 |
| 01:50 | fight | roll 0, orbit 0 | `E145` 110.70 🎬 ko<br>`E146` 110.90 🎬 banner „DOUBLE K.O.”<br>`E147` 110.90 🎬 music | cup<br>**K.O. HB** by GEM<br>**K.O. GEM**<br>📣 DOUBLE K.O. | GEM 6 · HB 0 |
| 01:51 | fight | roll 0, orbit 0 | · | · | GEM 0 · HB 0 |
| 01:52 | fight | roll 0, orbit 0 | · | · | GEM 0 · HB 0 |
| 01:53 | fight | roll 0, orbit 0 | `E148` 113.20 🎬 banner „DRAW GAME”<br>`E149` 113.40 🎬 jingle | 📣 DRAW GAME | GEM 0 · HB 0 |
| 01:54 | fight | roll 0, orbit 0 | · | · | GEM 0 · HB 0 |
| 01:55 | fight | roll 0, orbit 0 | · | · | GEM 0 · HB 0 |
| 01:56 | fight | roll 0, orbit 0 | · | · | GEM 0 · HB 0 |
| 01:57 | fight | roll 0, orbit 0 | · | · | GEM 0 · HB 0 |
| 01:58 | fight | roll 0, orbit 0 | · | · | GEM 0 · HB 0 |
| 01:59 | fight | roll 0, orbit 0 | `E150` 119.40 🎬 fade | · | GEM 0 · HB 0 |
