# Backlog globalny repo

> Pomysły i prace **poza bieżącymi zadaniami** (PLAY-001, ANIM-001). Każda pozycja to kandydat na nowe zadanie w `.windsurf/project_tasks/`. Przy przeniesieniu do zadania: link tutaj → status „→ ZADANIE-ID”.

| # | Pozycja | Po co | Źródło / notatki | Status |
|---|---|---|---|---|
| B1 | **Wydania MP4 na GitHub Releases** (tag na wersję filmu, MP4 jako załącznik, link w `CHANGES.md`) | wersjonowanie filmów bez puchnięcia repo (~20 MB na wersję) | 2026-10-08; na razie „wydaniem” jest artefakt claude.ai danej wersji. Alternatywa: Git LFS (mały darmowy limit) | czeka |
| B2 | **Wymiana postaci w tej samej walce**: scenariusz bez zmian, inna postać = inny styl walki i zachowanie (pozy, ciosy specjalne, temperament, głos) | wiele filmów z jednego scenariusza | 2026-10-07; zależy od „postać jako moduł” ([kit](.windsurf/project_tasks/ANIM-001_animation_skill/options/reusable-kit.md)) | czeka |
| B3 | **Wymiana stylu całego filmu**: styl jako moduł (paleta, render postaci i tła, efekty, typografia, muzyka) | ten sam film w innej estetyce | 2026-10-07; łączy się z renderem WebGL ([PLAY-001 Faza 4](.windsurf/project_tasks/PLAY-001_animation_poc_lab/options/webgl-render.md)) | czeka |
| B4 | **Reżyserka**: odtwarzacz + pasek scen + notatki w bazie artefaktu, panel dźwięku | wygodny feedback (6/8 uwag z rundy 1 było na poziomie sceny), komponowanie muzyki | [`docs/ideas-director.md`](docs/ideas-director.md) | czeka |
| B5 | **Galeria PoC-ów** jako jeden artefakt | przegląd wszystkich filmów i wersji w jednym miejscu | z PLAY-001 | czeka |
| B6 | **Trzeci styl PoC-a** (wektorowy flat, papierowy cut-out, CRT neon) | szerszy katalog stylów do skilla | z PLAY-001 | czeka |
| B7 | **Pomysły WebGL / 3D** (orbita kamery, postacie 2.5D, shadery CRT/bloom, cząsteczki na GPU) | kolejne PoC-e po spike'u PixiJS | [`docs/ideas-webgl.md`](docs/ideas-webgl.md) | czeka |
| B8 | **Wywiad po walce**: obie postacie mówią do kamery kilka zdań o walce (na początku/końcu filmu albo osobny filmik) | humor, osobowość postaci, test mowy postaci | 2026-10-09. *Ocena agenta:* nasz framework lepiej trzyma styl i postacie (te same rigi, tusz, determinizm), a lipsync jest u nas łatwy, bo postacie nie mają ust: robot BISHUKIJ = świecący wizjer/głośnik pulsujący z głośnością głosu, ALAMANDRO = kaptur i oczy reagujące na sylaby (ElevenLabs zwraca znaczniki czasu znaków). Model generatywny (talking head) da realizm, ale zgubi styl i spójność z filmem. | czeka |
| B9 | **Polityka wersjonowania PoC-a** („release'y”): drobne poprawki na najnowszej wersji (historia w gicie), duże przebudowy jako nowa wersja `vN`; numeracja `vN.M` dla drobnych | mniej katalogów, czytelna historia | 2026-10-09, pomysł usera; pierwszy test: ninja v7.2 | czeka |
| B10 | **Kanał YT o AI safety / security / wpływie AI na społeczeństwo / AI for good**: generyczny skill do filmów jako „silnik produkcji” krótkich animacji edukacyjnych | cel docelowy całego poligonu: siać świadomość formą bardziej nośną niż blog | 2026-10-09, pomysł usera; **po** skillsecie i domknięciu PoC-ów. *Ocena agenta:* patrz sekcja „B10: notatki” niżej | → [CHAN-001](.windsurf/project_tasks/CHAN-001_ai_awareness_channel/CHAN-001-plan.md) |

## B10: notatki (2026-10-09)

**Animacja vs tekst.** Animacja lepiej się niesie (Shorts/Reels/TikTok, wyjaśnianie mechanizmów obrazem), tekst lepiej buduje wiarygodność i jest cytowalny. Najlepiej oba: film jako nośnik, krótki wpis ze źródłami jako „przypisy” (link w opisie).

**Wzorce do podpatrzenia:** Kurzgesagt, Rational Animations (AI safety, animacja), Robert Miles (AI safety, wyjaśnianie), CGP Grey, 3Blue1Brown (generowane kodem: Manim, najbliższe naszemu podejściu).

**Co z naszego frameworku pasuje:** determinizm i wersjonowanie (poprawka faktu = nowa wersja), stałe postacie i styl jako marka kanału, lektor ElevenLabs, walidacja klatka po klatce. Brakuje: warstwy faktów (źródła per scena, fact-check przed publikacją), formatu pionowego 9:16, napisów, szablonu „wyjaśniacza” (diagram, metafora, postać-narrator).

**Ryzyka:** wiarygodność (temat podatny na hype i doomerstwo: każda teza ze źródłem, rozróżnienie fakt/prognoza/opinia), regularność publikacji ważniejsza od jakości pojedynczego filmu, oznaczenie treści generowanych przez AI (wymóg YT).

**Pierwszy krok (gdy przyjdzie czas):** 1 pilot, 60–90 s, pionowy, jeden konkretny problem (np. prompt injection albo reward hacking) z metaforą postaci z ninja; test, czy produkcja jednego odcinka mieści się w rozsądnym czasie.
