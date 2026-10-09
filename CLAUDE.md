# opus-having-fun-playground: instrukcje dla agenta

Poligon animacji generowanych **kodem** (HTML/Canvas, deterministycznie) + rozwój skilla do animacji. Język rozmów i dokumentów: **polski**.

## Zadania (start każdej sesji)
- `.windsurf/project_tasks/PLAY-001_animation_poc_lab/`: seria PoC-ów. Zacznij od **Status Dashboard** w `PLAY-001-plan.md`.
- `.windsurf/project_tasks/ANIM-001_animation_skill/`: skill do animacji (wzorce, decyzje, kryteria).
- `.windsurf/project_tasks/CHAN-001_ai_awareness_channel/`: kanał YT o AI safety (cel poligonu). ⏸️ Zaparkowane do czasu ANIM-001.

## Proces (obowiązuje)
1. **Nowy PoC:** ponumerowane pytania pogłębiające (2–3 albo 5–8 zależnie od skali) → `BRIEF.md` z szablonu [`kit/templates/BRIEF.md`](kit/templates/BRIEF.md) (tabela scen S1..Sn z asercjami) → **akceptacja usera** → dopiero kod.
2. **Feedback** w formacie [`docs/EDIT-PROTOCOL.md`](docs/EDIT-PROTOCOL.md): `[film]` / `S6` / `@41.2` + tagi. Kanał: czat.
3. **Runda feedbacku = nowa wersja:** `pocs/<temat>/vN-feedback-K/` (kopia poprzedniej) + **nowy artefakt** (nowy plik → nowy link) + porównanie `tools/frames.mjs --vs=<poprzednia>` + `TIMELINE.md` (v2: po scenach, opisy z `pocs/<temat>/scenes.json`). Pliki wersji i ich role:
   | Plik | Odpowiada na pytanie |
   |---|---|
   | `vN/BRIEF.md` | **czym jest** film w tej wersji: pełny, spójny brief, dokładnie zgodny z wersją (bez tabeli rewizji) |
   | `vN/CHANGES.md` (cienki) | **co się zmieniło** względem vN−1: uwaga → zmiana (1 linia) → status, testy w 1 linii, co niesprawdzone, diff briefu |
   | `vN/POSTMORTEM.md` | **jak** to zrobiliśmy: szczegóły techniczne, problemy, lekcje do kitu/skilla |
   | `<temat>/BRIEF.md` | tylko odnośnik „aktualny = vN” + tabela wersji |
   | `<temat>/PROMPT.md` · `NEXT.md` | wejście usera, od którego film się zaczął · zebrane, niezrealizowane uwagi |
4. **Walidacja przed oddaniem** (Decision #4 ANIM-001): `node check.mjs` (fabuła, widzialność, **skan klatka po klatce**), gęste arkusze zmienianych scen, jedno spojrzenie (`Read` PNG), MP4 na życzenie (`--mp4`) + pomiar głośności ffmpeg (model nie słyszy dźwięku).
5. Uczciwie raportuj, czego nie sprawdzono (dźwięk, płynność ruchu na żywo).

## Komendy
```bash
npm install                                               # puppeteer-core
cd pocs/<temat>/<wersja> && node check.mjs [--mp4] [--tc]  # uprząż
node tools/timeline.mjs <anim.html> "<tytuł>"              # TIMELINE.md (sekunda po sekundzie)
node tools/frames.mjs <anim.html> <t…> [--before=HEAD | --vs=<inna.html>] [--out=plik.png]
```
Chrome: headless shell z `~/.cache/puppeteer` (autodetekcja). ffmpeg 8 (Homebrew). Lektor: macOS `say` + ffmpeg (ElevenLabs: [`docs/elevenlabs.md`](docs/elevenlabs.md), klucz w Keychain `elevenlabs-api`).

## Git
- Repo **publiczne**: żadnych prywatnych ścieżek, kluczy ani danych osobowych. Przed commitem: `grep -rn "/Users/"` na zmienionych plikach.
- Remote należy do konta **drswobodziczka**. Aktywne konto `gh` bywa służbowe, więc **nie przełączaj** go (`gh auth switch`). Push jednorazowym tokenem:
  ```bash
  git -c credential.helper= -c credential.helper='!f() { echo username=drswobodziczka; echo "password=$(gh auth token --user drswobodziczka)"; }; f' push origin main
  ```
- MP4 i `frames/` są w `.gitignore` (rozmiar).

## Mapa
[`BACKLOG.md`](BACKLOG.md) (globalny backlog, kandydaci na nowe zadania) · [`kit/`](kit/README.md) (klocki wspólne: szablony, uprząż, audio; rośnie w trakcie PoC-ów) · `pocs/` (PoC-e i wersje) · `tools/` (TIMELINE, frames) · `docs/` (HOW-IT-WORKS, EDIT-PROTOCOL, toolbox, elevenlabs, ideas-*) · `pocs/GLOSSARY.md`
