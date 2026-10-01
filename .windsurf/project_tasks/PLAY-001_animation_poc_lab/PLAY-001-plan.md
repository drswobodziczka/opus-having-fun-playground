# PLAY-001: Poligon PoC-ów animacji generowanych kodem

> **Rola:** Dynamiczne Centrum Dowodzenia (SSOT). Tu sprawdzasz status, planujesz ruchy i zapisujesz decyzje.
> **Kontekst:** Patrz plik `PLAY-001-context.md`

## 🚦 Status Dashboard

*   **Current State:** 🟡 In Progress
*   **Current Focus:** PoC #2 v1 gotowe (Paper Cuts Super Turbo V). Czekamy na feedback usera (obraz + DŹWIĘK)
*   **Immediate Next Action:** Zebrać feedback do v1 (szczególnie dźwięk, którego model nie słyszy), potem zdecydować: v2 „malowana” grafika / MP4 z dźwiękiem / dopracowanie dystansów ciosów.

---

## 🧠 Memory Dump (Kluczowe ustalenia z ostatniej sesji)
*   Każdy PoC to katalog `pocs/<temat>/vN-<opis>/` z: `*.html`, uprzężą/wynikami testów, `POSTMORTEM.md`.
*   Postmortem robimy **po każdej wersji**: narzędzia (kolejność, cel, czas), problemy prosto, lekcje.
*   Wnioski przenoszone do skilla są śledzone w ANIM-001.
*   ffmpeg działa: render przez `anim.step()` → PNG → MP4 (3× neighbor). 120 s filmu w ~15 s.
*   Dźwięk w PoC #2 jest NIEZWERYFIKOWANY przez model (nie słyszy). Ocena po stronie usera.

---

## 📎 Artefakty
*   [`pocs/clip-fighter/v1-random-ai/`](../../../pocs/clip-fighter/v1-random-ai/): [postmortem](../../../pocs/clip-fighter/v1-random-ai/POSTMORTEM.md). Szybko, ale bez testów i bez pytania o czas.
*   [`pocs/clip-fighter/v2-scripted-10s/`](../../../pocs/clip-fighter/v2-scripted-10s/): [postmortem](../../../pocs/clip-fighter/v2-scripted-10s/POSTMORTEM.md). Determinizm + trace złapały bug fabularny.
*   [`docs/toolbox.md`](../../../docs/toolbox.md): narzędzia + backlog warsztatowy.
*   [`pocs/paperclip-vs-pencil/`](../../../pocs/paperclip-vs-pencil/): [BRIEF](../../../pocs/paperclip-vs-pencil/BRIEF.md) · [postmortem v1](../../../pocs/paperclip-vs-pencil/v1-pixel-120s/POSTMORTEM.md). 16/16 asercji od pierwszego przebiegu, MP4 przez ffmpeg.

---

## ✅ Acceptance Criteria
*   [ ] Co najmniej 3 PoC-e w różnych stylach (1-bit ✅, Rayman × SSF2T, trzeci do ustalenia), każdy z postmortemem.
*   [x] Co najmniej 3 pozycje z backlogu `docs/toolbox.md` wypróbowane i opisane (ffmpeg MP4, log zdarzeń + asercje, dźwięk).
*   [ ] Wnioski zebrane i przekazane do ANIM-001 (skill).

---

## 🏗️ Architectural Decisions (ADR Log)

### Decision #1: Osobne repo-poligon poza ai-central
*   **Context:** PoC-e i skill animacji nie pasują do ai-central (centralne reguły/workflowy). User planuje kiedyś je zdecentralizować.
*   **Decision:** Publiczne repo `drswobodziczka/opus-having-fun-playground`. Zadanie ANIM-001 przeniesione tu razem z PoC-ami.
*   **Consequence:** Kod, testy i dokumentacja są w jednym miejscu. Skill trafi do `~/.claude/skills` przez symlink.

---

## 📋 Implementation Plan

### Phase 1: Setup + Clip Fighter
- [x] Repo, publiczny remote, struktura `pocs/`, `docs/`
- [x] Clip Fighter v1 i v2 + postmortemy
- [x] `docs/toolbox.md`

### Phase 2: Paperclip vs Pencil (Rayman × SSF2T)
- [x] Brief: czas, postacie i ciosy, beaty scenariusza, 2 obroty kamery, dźwięk (zaakceptowany)
- [x] Build v1 → uprząż → postmortem
- [x] Wypróbować ffmpeg: MP4 + gęsty arkusz
- [ ] Feedback usera → v2 (malowana grafika / MP4 z dźwiękiem)

### Phase 3: Warsztat
- [x] Uprząż v1: log zdarzeń, asercje, arkusz z kluczowych chwil, autodetekcja Chrome
- [x] Dźwięk (Web Audio + speechSynthesis) w PoC #2 (niezweryfikowany odsłuchem)
- [ ] Porównanie z modelem wideo (fal.ai), jeśli będzie klucz API

---

## 🔮 Options for Evolution / Refactor
- [ ] Trzeci styl PoC-a (np. wektorowy flat, papierowy cut-out, CRT neon)
- [ ] Galeria PoC-ów jako jeden artefakt

---

## 🐛 Open Issues & Architectural Concerns
- [ ] Repo jest publiczne: przed pushem pilnować, żeby nie trafiały tam ścieżki prywatne, klucze API ani dane osobowe.
