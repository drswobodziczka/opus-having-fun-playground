# Postmortem: Ninja WebGL spike v1 (S6 + S8, „kinowo”, 1280×720)

> 2026-10-09. Artefakt: https://claude.ai/code/artifact/9a209cbf-154b-42cb-9f36-936ef317fba3 · brief: [`BRIEF.md`](BRIEF.md) · porównanie: [`compare-v7-gl.png`](compare-v7-gl.png) · MP4 (lokalnie): `seg-s6.mp4`, `seg-s8.mp4`, `side-s6.mp4`, `side-s8.mp4` (v7 | WebGL)

## Co zbudowano
- Kopia `storm.html` z v7: symulacja nietknięta (dodane tylko dane renderu: historia póz `HIST`, czas plamy krwi `t0`). `drawWorld` podzielony na warstwy `drawBack` / `drawMid` / `drawFront`.
- **Kompozytor WebGL (PixiJS 8.19 + pixi-filters 6.1.4):** malarze Canvas 2D rysują w 1280×720 do 4 płócien (tło, świat, przód, HUD), Pixi skleja je na GPU:
  - shader **papieru** (włókna, plamy, ziarno z ziarnem per klatka = deterministyczne, winieta) na całość;
  - shader **mokrego pędzla** na postaciach (postrzępiona krawędź z szumu, ciemniejsza krawędź, halo rozlania; nocą jasne);
  - **głębia ostrości** na tle (rozmycie rośnie z zoomem kamery);
  - **rozmycie ruchu**: duchy wcześniejszych póz szybkich kończyn (z historii symulacji, więc deterministyczne);
  - **bloom** nocą tylko na świecie (HUD ostry), **poświata od pioruna** na postaciach (GlowFilter);
  - **piasek na GPU**: 2500 sprite'ów w dwóch planach (dalszy rozmyty);
  - krew-tusz: plamy na ziemi rozlewają się przez 0,5 s.
- `kit/harness` użyty na drugim filmie; dodane `gl: true` (SwiftShader) i `anim.ready`.

## Wynik
- Uprząż **15/15**: renderer WebGL 1280×720, **zdarzenia i pozy identyczne z v7**, klatki niepuste, piorun rozjaśnia kadr (0,38 → 0,52), noc ciemniejsza od dnia, widzialność, skan klatek, powtórka, 0 błędów.
- Ocena agenta (z arkusza, nie z ruchu): **noc i ruch** wyraźnie lepsze (piorun obrysowuje postacie, księżyc świeci, gęsty piasek, smugi monsunu); **dzień** lepszy umiarkowanie (faktura, głębia), ale postacie mają ten sam kształt pociągnięć, a papier trochę szarzy kadr.

## Problemy (prosto)
| Problem | Przyczyna | Rozwiązanie / lekcja |
|---|---|---|
| Headless Chrome bez WebGL: Pixi **po cichu** przechodzi na Canvas | brak GPU | flagi SwiftShader (`--use-angle=swiftshader --enable-unsafe-swiftshader`) w `kit/harness` (`gl: true`) + asercja „renderer = webgl” |
| pixi-filters 6.1.4 na cdnjs bez plików (404) | cdnjs ma wpis wersji, ale puste pliki | jsdelivr (`cdn.jsdelivr.net/npm/pixi-filters@6.1.4/dist/pixi-filters.js`), też dozwolony w artefaktach |
| „Could not initialize shader” | uniformy wspólne dla vertex/fragment (`uInputSize`) z inną precyzją (Pixi: fragment `mediump`) | `precision highp` + `highp` przy wspólnych uniformach; diagnoza: kompilacja GLSL osobno (OK) → wniosek: błąd łączenia |
| Nocą prześwietlenie (postać jasnoszara = biała plama) | za niski próg bloomu, bloom też na HUD, suma halo + glow | próg 0,84, bloom tylko na świecie, słabsza bazowa poświata |
| Render nocny ~45 s/klatkę (MP4 > 1 h) | **przypisywanie `filters = [...]` co klatkę** przebudowuje stan GPU | przypisanie tylko przy zmianie dzień/noc → ~0,8 s/klatkę; lekcja do kitu |
| Długi render MP4 (9 min) | SwiftShader + PNG 720p (1,8 MB/klatkę) | do rozważenia: JPEG/WebP klatek, render z GPU (Chrome z oknem) |

## Narzędzia (kolejność)
pytania ad1–ad3 → BRIEF z szablonu kitu → próba PixiJS w headless (renderer, filtry, czas) → kod warstw + shaderów → test kompilacji GLSL → kadry kontrolne (`Read`) → poprawki światła → uprząż z kitu + porównanie z v7 → MP4 segmentów + side-by-side → artefakt.

## Lekcje do skilla (ANIM-001)
- Podział renderu na **warstwy** (tło / świat / przód / HUD) to klocek kitu: pozwala nakładać efekty selektywnie i jest warunkiem stylu jako modułu.
- Asercje renderu bez oglądania: renderer, niepustość (rozrzut jasności), skoki jasności przy zdarzeniach (piorun), dzień vs noc.
- WebGL jest deterministyczny, jeśli szum i ziarno są funkcją klatki, a efekty ruchu biorą dane z historii symulacji.
- **Uroda postaci** to osobny temat: shader poprawia krawędź, ale nie kształt. Następny krok jakościowy to nowy pędzel postaci (tekstura, zmienna grubość, rozlewanie wzdłuż pociągnięcia).

## Nie sprawdzone
- Płynność na żywo na GPU usera (FPS), dźwięk w artefakcie (bez zmian względem v7).
