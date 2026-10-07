# kit: klocki do powtarzalnego robienia filmów

> Zalążek frameworku z ANIM-001 ([propozycja](../.windsurf/project_tasks/ANIM-001_animation_skill/options/reusable-kit.md)). Budowany **w trakcie PoC-ów**: gdy runda PoC-a tworzy coś ogólnego, ląduje to tutaj, a PoC zaczyna tego używać.

| Katalog | Co | Stan |
|---|---|---|
| `templates/` | [`BRIEF.md`](templates/BRIEF.md) (szablon briefu z tabelą scen i asercjami) | ✅ v1 |
| `harness/` | uprząż: Chrome, skan klatka po klatce (kręgosłup), test powtórki, widzialność, arkusze, MP4 | ⏳ do wydzielenia z ninja v7 |
| `audio/` | głosy (`vo`: obsada, ujęcia, STT, sloty), muzyka (MIDI, soundfont), `embed` | ⏳ do wydzielenia z ninja v7 |
| `engine/` | zegar 60 Hz, DSL `at()/sys()`, SCENES, log, kamera, rig + IK, audio-cue, `window.anim` | ⏳ później |

Skill (przepis dla agenta) powstanie obok: `skills/code-animation/SKILL.md`, podpięty do `~/.claude/skills` symlinkiem.
