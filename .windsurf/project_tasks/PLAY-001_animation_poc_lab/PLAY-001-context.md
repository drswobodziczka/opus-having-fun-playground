# PLAY-001: Kontekst

> **Rola:** Żywy Brief. Zakres biznesowy, wymagania, kluczowe pliki, dane referencyjne.
> Aktualizacja: 2026-10-07.

## Opis Zadania
Seria PoC-ów animacji generowanych **kodem** przez agenta (Claude). Zabawa z celem: sprawdzić style, techniki, narzędzia i sposoby walidacji oraz wypracować z userem wygodny proces (bramki, pętla poprawek), a wnioski przekazać do skilla (ANIM-001).

## Wymagania
- Każdy PoC: samowystarczalny HTML (Canvas/JS, ewentualnie biblioteka z cdnjs), publikowany jako artefakt Claude. **Każda wersja ma osobny link**, żeby dało się porównywać.
- Przed kodem: pytania pogłębiające → `BRIEF.md` z tabelą scen → akceptacja.
- Deterministyczny (stały krok, `seek`/`state`/`events`/`script`), ze znacznikiem sceny i sekundy w kadrze.
- Walidacja przed oddaniem: asercje fabuły i widzialności, skan klatka po klatce, gęste arkusze zmienianych scen.
- Feedback: czat w formacie `docs/EDIT-PROTOCOL.md` (`[film]` / `S6` / `@41.2` + tagi). Runda feedbacku = `vN-feedback-K/` z `CHANGES.md`, `TIMELINE.md` i porównaniem z poprzednią wersją.
- Po każdej wersji `POSTMORTEM.md` albo `CHANGES.md` (co, dlaczego, jak sprawdzone).
- Repo publiczne: bez prywatnych ścieżek, kluczy i danych osobowych. Push kontem `drswobodziczka`.

---

## Kluczowe Pliki

### PoC-e
```bash
pocs/clip-fighter/v1-random-ai/            # PoC 1: 1-bit, losowe AI (zamknięty, poza protokołem)
pocs/clip-fighter/v2-scripted-10s/         # PoC 1: scenariusz 10 s, uprząż v0 (zamknięty)
pocs/paperclip-vs-pencil/BRIEF.md          # PoC 2: brief (spinacz vs ołówek)
pocs/paperclip-vs-pencil/v1-pixel-120s/    # PoC 2: 2:00, pixel, uprząż v1, MP4, TIMELINE, feedback w POSTMORTEM
pocs/ninja-sandstorm/BRIEF.md              # PoC 3: brief (ninja, 60 s), sceny S1..S13
pocs/ninja-sandstorm/v1-ink-pixel-60s/     # PoC 3 v1: tusz → pixel, rig+IK, lektor, MP4 z dźwiękiem
pocs/ninja-sandstorm/v2-feedback-1/        # PoC 3 v2: runda 1 (8 uwag), CHANGES, porównanie v1|v2
pocs/ninja-sandstorm/v3-feedback-2/        # PoC 3 v3: runda 2 (S6, S10, salta) + skan klatka po klatce, CHANGES
pocs/ninja-sandstorm/v4-feedback-3/        # PoC 3 v4: jeden styl tuszu + noc, podcięcie, muzyka chińska, kręgosłup
pocs/ninja-sandstorm/v5-feedback-4/        # PoC 3 v5: jeden wygląd postaci, podcięcie na dłoniach, muzyka adaptacyjna (aktualna)
```

### Narzędzia i dokumenty
```bash
tools/timeline.mjs           # TIMELINE.md (sekunda po sekundzie) z animacji
tools/frames.mjs             # arkusze: PRZED|PO (--before=HEAD) albo wersja|wersja (--vs=...)
docs/EDIT-PROTOCOL.md        # format uwag i pętla poprawek
docs/HOW-IT-WORKS.md         # diagramy procesu, silnika, pętli, asercji; toolset
docs/toolbox.md              # narzędzia + backlog warsztatowy
docs/ideas-director.md       # reżyserka (koncepcja)
docs/ideas-webgl.md          # pomysły na 3D
docs/elevenlabs.md           # research + samouczek ElevenLabs (lektor)
CLAUDE.md                    # instrukcje dla agenta (start sesji w tym repo)
pocs/GLOSSARY.md             # słowniczek
.windsurf/project_tasks/ANIM-001_animation_skill/   # zadanie: skill
```

---

## Dane Przykładowe / Screenshoty
- Ninja v5 (aktualna): https://claude.ai/code/artifact/c62a9c64-1114-4cef-9c01-d2480995bd54 · v4: https://claude.ai/code/artifact/f860679c-12f5-4d5a-a761-28fcb378472d · v3: https://claude.ai/code/artifact/b3b82263-0c8a-4856-b229-96069f5e3bd9
- Paper Cuts v1: https://claude.ai/code/artifact/7d5a22e9-28d4-4f72-a1e0-b7b8db8180a0
- Feedback 1 (test protokołu): 8 uwag, 6 na poziomie sceny, 0 dopytań → `pocs/ninja-sandstorm/v2-feedback-1/CHANGES.md`
