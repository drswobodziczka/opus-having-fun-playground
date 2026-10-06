# opus-having-fun-playground: instrukcje dla agenta

Poligon animacji generowanych **kodem** (HTML/Canvas, deterministycznie) + rozwój skilla do animacji. Język rozmów i dokumentów: **polski**.

## Zadania (start każdej sesji)
- `.windsurf/project_tasks/PLAY-001_animation_poc_lab/`: seria PoC-ów. Zacznij od **Status Dashboard** w `PLAY-001-plan.md`.
- `.windsurf/project_tasks/ANIM-001_animation_skill/`: skill do animacji (wzorce, decyzje, kryteria).

## Proces (obowiązuje)
1. **Nowy PoC:** ponumerowane pytania pogłębiające (2–3 albo 5–8 zależnie od skali) → `BRIEF.md` z tabelą scen S1..Sn → **akceptacja usera** → dopiero kod.
2. **Feedback** w formacie [`docs/EDIT-PROTOCOL.md`](docs/EDIT-PROTOCOL.md): `[film]` / `S6` / `@41.2` + tagi. Kanał: czat.
3. **Runda feedbacku = nowa wersja:** `pocs/<temat>/vN-feedback-K/` (kopia poprzedniej) + **nowy artefakt** (nowy plik → nowy link) + `CHANGES.md` + porównanie `tools/frames.mjs --vs=<poprzednia>` + `TIMELINE.md`. Zmiana decyzji z briefu → wpis w `BRIEF.md` §8 „Rewizje”.
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
`pocs/` (PoC-e i wersje) · `tools/` (TIMELINE, frames) · `docs/` (HOW-IT-WORKS, EDIT-PROTOCOL, toolbox, elevenlabs, ideas-*) · `pocs/GLOSSARY.md`
