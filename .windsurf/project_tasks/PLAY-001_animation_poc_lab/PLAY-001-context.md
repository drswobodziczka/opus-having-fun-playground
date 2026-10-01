# PLAY-001: Kontekst

> **Rola:** Żywy Brief. Zakres biznesowy, wymagania, kluczowe pliki, dane referencyjne.

## Opis Zadania
Seria PoC-ów animacji generowanych **kodem** przez agenta (Claude). Zabawa z celem: sprawdzić różne style, narzędzia i techniki weryfikacji, a wnioski przekazać do skilla (ANIM-001).

## Wymagania
- Każdy PoC: samowystarczalny HTML (Canvas/JS, ewentualnie biblioteka z cdnjs), publikowany jako artefakt Claude.
- Deterministyczny, jeśli ma scenariusz (stały krok, `seek/state`).
- Po każdej wersji: `POSTMORTEM.md` (narzędzia w kolejności z celem i czasem, problemy prosto, lekcje).
- Repo publiczne: bez prywatnych ścieżek, kluczy i danych osobowych.

---

## Kluczowe Pliki

### Pliki implementacji
```bash
pocs/clip-fighter/v1-random-ai/clip-fighter-v1.html    # PoC 1, wersja 1
pocs/clip-fighter/v2-scripted-10s/clip-fighter.html    # PoC 1, wersja 2
pocs/clip-fighter/v2-scripted-10s/check.mjs            # uprząż v0
```

### Pliki referencyjne
```bash
docs/toolbox.md                                        # narzędzia + backlog warsztatowy
pocs/clip-fighter/*/POSTMORTEM.md                      # postmortemy
.windsurf/project_tasks/ANIM-001_animation_skill/      # zadanie: skill
```

---

## Dane Przykładowe / Screenshoty
- `pocs/clip-fighter/v2-scripted-10s/sheet.png`: arkusz 16 klatek
- `pocs/clip-fighter/v2-scripted-10s/trace.txt`: trace liczbowy
