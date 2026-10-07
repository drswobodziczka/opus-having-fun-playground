# Opcja: framework do powtarzalnego robienia filmów („kit” + skill)

> 2026-10-07. Pytanie usera: „mam nowy pomysł na film: gdzie leży framework, klocki, powtarzalne procedury, wspólny kod, narzędzia, szkielet uprzęży albo przepis na jej zbudowanie, do ponownego użycia?” Status: **propozycja**, do akceptacji.

## Stan dziś (uczciwie)
Wiedza jest, ale **rozsypana i kopiowana**. Nowy film = kopia `storm.html` i ręczne wycinanie.

| Co | Gdzie dziś | Wspólne? |
|---|---|---|
| Proces (bramki, wersje, walidacja) | `CLAUDE.md`, pamięć agenta, `docs/EDIT-PROTOCOL.md`, `docs/HOW-IT-WORKS.md` | ✅ opisane, ale nie jako jeden przepis |
| Narzędzia ogólne | `tools/timeline.mjs`, `tools/frames.mjs` | ✅ |
| Silnik (zegar, DSL `at()/sys()`, SCENES, log, kamera, rig + IK, audio-cue, `window.anim`) | wklejony w każdy `storm.html` | ❌ kopia na wersję |
| Uprząż `check.mjs` (Chrome, asercje, skan klatek, replay, arkusze, MP4) | kopia w każdej wersji, asercje wymieszane z mechaniką | ❌ |
| Lektor `vo/make.mjs`, muzyka `music/score.mjs` + `render.mjs`, `embed.mjs` | katalog wersji ninja v6/v7 | ❌ (ogólne w 80%) |
| Szablony BRIEF, CHANGES, POSTMORTEM | tylko przykłady w `pocs/` | ❌ |

## Propozycja: `kit/` (kod) + skill (przepis)
```
kit/
  engine/      core.js: zegar 60 Hz, DSL at()/sys(), SCENES, log, seek/step, window.anim, reset (z testem)
               camera.js (ujęcia SHOTS), rig.js (szkielet + IK), audio.js (cue, limiter, syncMusic, renderAudio)
  harness/     run.mjs: Chrome, ładowanie, skan klatek, replay, widzialność, arkusze, MP4, events/trace;
               asercje filmu w osobnym pliku (assertions.mjs w katalogu PoC), wyprowadzane z BRIEF
  audio/       vo.mjs (CAST + LINES z pliku JSON filmu, ujęcia, STT, sloty), score-lib.mjs (MIDI writer,
               wzory: groove/napięcie/akcenty, skale), render.mjs (soundfont), embed.mjs
  templates/   BRIEF.md (tabela scen S1..Sn + asercje), CHANGES.md, POSTMORTEM.md, film.html (szkielet)
  new-film.mjs scaffolding: pocs/<temat>/v1-*/ z szablonów
skills/code-animation/SKILL.md   przepis dla agenta: pytania → BRIEF → akceptacja → new-film → build → check → publish
                                 → pętla feedbacku (vN, CHANGES, BRIEF §8) → postmortem; wskazuje klocki z kit/
```
Film (PoC) zawiera wtedy **tylko to, co jego**: scenariusz, postacie/styl (render), partyturę, obsadę głosów, asercje. Build skleja `kit/engine` + pliki filmu w jeden HTML (artefakt musi być jednym plikiem).

### Klocki zgodne z backlogiem PLAY-001
- **Postać jako moduł** (pozy, ruchy specjalne, temperament, głos), czyli wymiana postaci w tej samej walce.
- **Styl jako moduł** (paleta, render postaci i tła, efekty, typografia, muzyka), czyli wymiana stylu całego filmu, a docelowo render PixiJS ([PLAY-001 options/webgl-render.md](../../PLAY-001_animation_poc_lab/options/webgl-render.md)).

## Kolejność (propozycja)
1. Wydzielić `kit/harness` + `kit/audio` (najmniej zależne od rysowania, od razu do użycia).
2. Wydzielić `kit/engine/core` z ninja v7 i przepiąć na niego v8 (test: uprząż 41/41 bez zmian).
3. `templates/` + `new-film.mjs` + `SKILL.md`. **Test skilla = nowy, mały film od zera** (np. 20 s, inny temat) tylko z kitu.
4. Postać i styl jako moduły, potem PixiJS.

## Otwarte: jeden skill czy wiele (do decyzji przy architekturze skilla)
User (2026-10-08): jeden skill może nie wystarczyć, np. montaż wideo, dźwiękowiec, dialogi i głosy, reżyser, scenarzysta, fizyka ruchu, stylistyka, render obrazu i wideo zewnętrznymi modelami.

**Przeczucie agenta (nie decyzja):**
- **Jeden skill-producent na start** (przepis od pomysłu do MP4) + **kit z klockami**. Specjaliści wydzielają się, gdy dany obszar ma **własne narzędzia, własny sposób weryfikacji i drugie zastosowanie** poza jednym filmem.
- Pierwsi kandydaci na osobne skille: **dźwięk** (głosy: obsada, ujęcia, STT, sloty; muzyka: partytura, soundfont, spektrogram), bo ma inne narzędzia i inną weryfikację niż obraz i przyda się poza bijatykami; **styl/render** (PixiJS, shadery, palety), gdy ruszy Faza 4; **modele generatywne** (obraz/wideo), gdy pojawi się klucz i pierwszy PoC.
- **Fizyka ruchu, kamera, rig** to raczej **kod w kicie** niż skill: to biblioteka, nie procedura.
- **Scenarzysta / reżyser** to role w przepisie producenta (bramki, BRIEF, tabela scen, pętla feedbacku), nie osobne skille, dopóki nie urosną.
- Ryzyko wielu skilli: rozjazd kontraktów. Wspólny język (sceny S1..Sn, `window.anim`, `events.json`, katalog wersji) musi być jeden, w kicie.

## Ryzyka
- Przedwczesna abstrakcja: mamy 1 dojrzały film (ninja) i 2 starsze. Dlatego krok 3 to od razu nowy film jako sprawdzian.
- Jeden plik HTML dla artefaktu: potrzebny prosty bundler (sklejanie), bez npm w przeglądarce.
