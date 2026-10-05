# PLAY-001: Poligon PoC-ów animacji generowanych kodem

> **Rola:** Dynamiczne Centrum Dowodzenia (SSOT). Tu sprawdzasz status, planujesz ruchy i zapisujesz decyzje.
> **Kontekst:** Patrz plik `PLAY-001-context.md`

## 🚦 Status Dashboard

*   **Current State:** 🟡 In Progress
*   **Current Focus:** Feedback do PoC #3 + TIMELINE v2 (sceny S1..Sn: CO/JAK/PO CO, 1-1 z BRIEF)
*   **Immediate Next Action:** DECYZJA usera: feedback do PoC #3 teraz (czat, ze znacznikiem `S10 · 40.5 s` w kadrze) czy dopiero w reżyserce (`docs/ideas-director.md`). Potem: (1) puścić notatki przez `docs/EDIT-PROTOCOL.md`; (2) TIMELINE v2: dodać do scenariusza znaczniki scen `scene(id, t0, t1, cel)` zgodne z tabelą w BRIEF, a generator ma grupować po scenach i pokazywać CO/JAK/PO CO.

---

## 🧠 Memory Dump (Kluczowe ustalenia z ostatniej sesji)
*   Każdy PoC to katalog `pocs/<temat>/vN-<opis>/` z: `*.html`, uprzężą/wynikami testów, `POSTMORTEM.md`.
*   Postmortem robimy **po każdej wersji**: narzędzia (kolejność, cel, czas), problemy prosto, lekcje.
*   Wnioski przenoszone do skilla są śledzone w ANIM-001.
*   ffmpeg działa: render przez `anim.step()` → PNG → MP4 (3× neighbor). 120 s filmu w ~15 s.
*   Dźwięk: model nie słyszy. PoC #2 niezweryfikowany, PoC #3 zmierzony (`volumedetect`/RMS), ale barwę i miks ocenia user.
*   Protokół poprawek działa dla PoC #2 i #3 (mają `script()`, TIMELINE, FEEDBACK). Clip Fighter v1/v2 są poza protokołem (zamknięte prototypy).
*   2026-10-06: `FEEDBACK.md` wycofany (user: nieefektywny). Kanał: czat, docelowo reżyserka. W kadrze ninja jest znacznik sceny i sekundy (klawisz T); sceny S1..S13 są w kodzie (`SCENES`).
*   BRIEF ≠ scenariusz w kodzie ≠ TIMELINE: brief ma sceny z zakresami czasu, kod płaską listę zdarzeń `E0xx`, a brakuje wspólnego ID sceny (TODO usera).

---

## 📎 Artefakty
*   [`pocs/clip-fighter/v1-random-ai/`](../../../pocs/clip-fighter/v1-random-ai/): [postmortem](../../../pocs/clip-fighter/v1-random-ai/POSTMORTEM.md). Szybko, ale bez testów i bez pytania o czas.
*   [`pocs/clip-fighter/v2-scripted-10s/`](../../../pocs/clip-fighter/v2-scripted-10s/): [postmortem](../../../pocs/clip-fighter/v2-scripted-10s/POSTMORTEM.md). Determinizm + trace złapały bug fabularny.
*   [`docs/toolbox.md`](../../../docs/toolbox.md): narzędzia + backlog warsztatowy.
*   [`pocs/ninja-sandstorm/`](../../../pocs/ninja-sandstorm/): [BRIEF](../../../pocs/ninja-sandstorm/BRIEF.md) · [postmortem v1](../../../pocs/ninja-sandstorm/v1-ink-pixel-60s/POSTMORTEM.md). 32/32 (w tym asercje widzialności), MP4 z dźwiękiem z renderu offline.
*   [`pocs/paperclip-vs-pencil/`](../../../pocs/paperclip-vs-pencil/): [BRIEF](../../../pocs/paperclip-vs-pencil/BRIEF.md) · [postmortem v1](../../../pocs/paperclip-vs-pencil/v1-pixel-120s/POSTMORTEM.md). 16/16 asercji od pierwszego przebiegu, MP4 przez ffmpeg.

---

## ✅ Acceptance Criteria
*   [x] Co najmniej 3 PoC-e w różnych stylach (1-bit ✅, kolorowy pixel ✅, tusz + mroczny pixel ✅), każdy z postmortemem.
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
- [x] Feedback usera do PoC #2 (zapisany w postmortemie)

### Phase 2b: Ninja Sandstorm (PoC #3)
- [x] Pytania ad1–ad7 → brief → akceptacja
- [x] Build v1 → uprząż v2 (widzialność) → MP4 z dźwiękiem → postmortem
- [ ] Feedback usera (zapowiedziany „jutro”, 2026-10-02)

### Phase 2c: Czytelność rozpiski (TODO usera)
- [ ] TIMELINE v2: kolumna scenariusza mówi CO się dzieje, JAK i DO CZEGO dąży; grupowanie po scenach S1..Sn 1-1 z BRIEF
- [ ] Znaczniki scen w kodzie (`scene(id, t0, t1, cel)`) dla PoC #2 i #3
- [x] Generator `tools/timeline.mjs` + `tools/frames.mjs` + `docs/EDIT-PROTOCOL.md` (v1)

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
