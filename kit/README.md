# kit: klocki do powtarzalnego robienia filmów

> Zalążek frameworku z ANIM-001 ([propozycja](../.windsurf/project_tasks/ANIM-001_animation_skill/options/reusable-kit.md)). Budowany **w trakcie PoC-ów**: gdy runda PoC-a tworzy coś ogólnego, ląduje to tutaj, a PoC zaczyna tego używać.

| Katalog | Co | Stan |
|---|---|---|
| `templates/` | [`BRIEF.md`](templates/BRIEF.md) (szablon briefu z tabelą scen i asercjami) | ✅ v1 |
| `harness/` | [`harness.mjs`](harness/harness.mjs): Chrome, `openFilm`, **`frameScan`** (kręgosłup), `snapPoses` + `replayCheck`, `trace`, `sheet` (skaluje, więc działa też dla 720p), `renderMp4` (z dźwiękiem, fragmenty `from/to`), `report`. Hak `anim.capture()` dla płócien WebGL, `gl: true` (SwiftShader) i `anim.ready`; drugi film na kicie: [ninja-webgl spike](../pocs/ninja-webgl/v1-spike-s6-s8/check.mjs). Film trzyma u siebie tylko asercje. Dowód: [`v7/check-kit.mjs`](../pocs/ninja-sandstorm/v7-feedback-6/check-kit.mjs) daje 41/41 i **identyczne** wyniki co stara uprząż (zdarzenia, skan, trace, arkusze bajt w bajt, MP4 PSNR = ∞) | ✅ v1 |
| `audio/` | głosy (`vo`: obsada, ujęcia, STT, sloty), muzyka (MIDI, soundfont), `embed` | ⏳ do wydzielenia z ninja v7 |
| `engine/` | zegar 60 Hz, DSL `at()/sys()`, SCENES, log, kamera, rig + IK, audio-cue, `window.anim` | ⏳ później |

**Dokumentacja modułu (wymóg, ANIM-001 Decision #9):** każdy katalog modułu ma `README.md` z czterema częściami: **kontrakt** (wejście, wyjście, gwarancje, czego moduł nie robi) · **metody** (sygnatura + jedno zdanie) · **zastosowanie** (kiedy tak, kiedy nie) · **przykłady** (minimalny fragment + film, który go używa). Minimalnie, ale wystarczająco, żeby agent użył modułu bez czytania kodu. Bez takiego README moduł nie dostaje ✅.

Skill (przepis dla agenta) powstanie obok: `skills/code-animation/SKILL.md`, podpięty do `~/.claude/skills` symlinkiem.
