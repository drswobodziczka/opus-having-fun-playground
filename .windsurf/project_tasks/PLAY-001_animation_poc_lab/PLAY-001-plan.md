# PLAY-001: Poligon PoC-ów animacji generowanych kodem

> **Rola:** Dynamiczne Centrum Dowodzenia (SSOT). Tu sprawdzasz status, planujesz ruchy i zapisujesz decyzje.
> **Kontekst:** Patrz plik `PLAY-001-context.md`

## 🚦 Status Dashboard

*   **Current State:** 🟡 In Progress
*   **Current Focus:** PoC #3 v3 (feedback 2) gotowe: czeka na ocenę usera (porównanie v2 | v3)
*   **Immediate Next Action:** Ocena v3 przez usera → ewentualna runda 3 przez `EDIT-PROTOCOL`. Potem TIMELINE v2: dodać do scenariusza znaczniki scen `scene(id, t0, t1, cel)` zgodne z tabelą w BRIEF, a generator ma grupować po scenach i pokazywać CO/JAK/PO CO.

---

## 🧠 Memory Dump (Kluczowe ustalenia z ostatniej sesji)
*   Każdy PoC to katalog `pocs/<temat>/vN-<opis>/` z: `*.html`, uprzężą/wynikami testów, `POSTMORTEM.md`.
*   Postmortem robimy **po każdej wersji**: narzędzia (kolejność, cel, czas), problemy prosto, lekcje.
*   Wnioski przenoszone do skilla są śledzone w ANIM-001.
*   ffmpeg działa: render przez `anim.step()` → PNG → MP4 (3× neighbor). 120 s filmu w ~15 s.
*   Dźwięk: model nie słyszy. PoC #2 niezweryfikowany, PoC #3 zmierzony (`volumedetect`/RMS), ale barwę i miks ocenia user.
*   Protokół poprawek działa dla PoC #2 i #3 (mają `script()` i TIMELINE). Clip Fighter v1/v2 są poza protokołem (zamknięte prototypy).
*   Ninja v2/v3: każda runda feedbacku to nowy katalog `vN-feedback-K/` + nowy artefakt + `CHANGES.md` + porównanie `compare-vX-vY.png` (`tools/frames.mjs --vs`).
*   Test protokołu (feedback 1): 6/8 uwag na poziomie sceny → reżyserka musi mieć wygodny pasek scen.
*   2026-10-06: `FEEDBACK.md` wycofany (user: nieefektywny). Kanał: czat, docelowo reżyserka. W kadrze ninja jest znacznik sceny i sekundy (klawisz T); sceny S1..S13 są w kodzie (`SCENES`).
*   BRIEF ≠ scenariusz w kodzie ≠ TIMELINE: ninja v2+ ma już `SCENES` (S1..S13) w kodzie i w znaczniku kadru, ale bez opisu CO/JAK/PO CO, a BRIEF i TIMELINE jeszcze ich nie używają. Paper Cuts nie ma scen wcale (TODO usera).

---

## 📎 Artefakty
*   [`pocs/clip-fighter/v1-random-ai/`](../../../pocs/clip-fighter/v1-random-ai/): [postmortem](../../../pocs/clip-fighter/v1-random-ai/POSTMORTEM.md). Szybko, ale bez testów i bez pytania o czas.
*   [`pocs/clip-fighter/v2-scripted-10s/`](../../../pocs/clip-fighter/v2-scripted-10s/): [postmortem](../../../pocs/clip-fighter/v2-scripted-10s/POSTMORTEM.md). Determinizm + trace złapały bug fabularny.
*   [`docs/toolbox.md`](../../../docs/toolbox.md): narzędzia + backlog warsztatowy.
*   [`pocs/ninja-sandstorm/`](../../../pocs/ninja-sandstorm/): [BRIEF](../../../pocs/ninja-sandstorm/BRIEF.md) · [postmortem v1](../../../pocs/ninja-sandstorm/v1-ink-pixel-60s/POSTMORTEM.md) · [v2 CHANGES](../../../pocs/ninja-sandstorm/v2-feedback-1/CHANGES.md) · [v3 CHANGES](../../../pocs/ninja-sandstorm/v3-feedback-2/CHANGES.md). v3: 39/39 + skan klatka po klatce.
*   [`docs/HOW-IT-WORKS.md`](../../../docs/HOW-IT-WORKS.md): diagramy procesu, silnika, pętli poprawek, asercji · [`docs/ideas-director.md`](../../../docs/ideas-director.md): koncepcja reżyserki.
*   [`pocs/paperclip-vs-pencil/`](../../../pocs/paperclip-vs-pencil/): [BRIEF](../../../pocs/paperclip-vs-pencil/BRIEF.md) · [postmortem v1](../../../pocs/paperclip-vs-pencil/v1-pixel-120s/POSTMORTEM.md). 16/16 asercji od pierwszego przebiegu, MP4 przez ffmpeg.

---

## ✅ Acceptance Criteria
*   [x] Co najmniej 3 PoC-e w różnych stylach (1-bit ✅, kolorowy pixel ✅, tusz + mroczny pixel ✅), każdy z postmortemem.
*   [x] Co najmniej 3 pozycje z backlogu `docs/toolbox.md` wypróbowane i opisane (ffmpeg MP4, log zdarzeń + asercje, dźwięk).
*   [x] Wnioski zebrane i przekazane do ANIM-001 (Memory Dump ANIM-001: lekcje z PoC #2, #3 i rund feedbacku). *Przekazywanie trwa przy kolejnych rundach.*

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
- [x] Feedback 1 (8 uwag) → v2-feedback-1, 35/35, [`CHANGES.md`](../../../pocs/ninja-sandstorm/v2-feedback-1/CHANGES.md)
- [x] Feedback 2 (S6 parowanie + dźwignia, S10 suplex, salta) + skan klatka po klatce → v3-feedback-2, 39/39, [`CHANGES.md`](../../../pocs/ninja-sandstorm/v3-feedback-2/CHANGES.md)
- [ ] Ocena v3 przez usera

### Phase 2c: Czytelność rozpiski (TODO usera)
- [ ] TIMELINE v2: kolumna scenariusza mówi CO się dzieje, JAK i DO CZEGO dąży; grupowanie po scenach S1..Sn 1-1 z BRIEF
- [ ] Znaczniki scen w kodzie (`scene(id, t0, t1, cel)`) dla PoC #2 i #3
- [x] Generator `tools/timeline.mjs` + `tools/frames.mjs` + `docs/EDIT-PROTOCOL.md` (v1)

### Phase 3: Warsztat
- [x] Uprząż v1: log zdarzeń, asercje, arkusz z kluczowych chwil, autodetekcja Chrome
- [x] Dźwięk (Web Audio + speechSynthesis) w PoC #2 (niezweryfikowany odsłuchem)
- [x] Lektor `say` + ffmpeg, MP4 z dźwiękiem z `OfflineAudioContext` (PoC #3)
- [x] Skan ciągłości klatka po klatce + płynne przejścia póz (ninja v3)
- [x] Znacznik sceny i sekundy w kadrze, klik/strzałki (ninja v2+)
- [ ] Porównanie z modelem wideo (fal.ai), jeśli będzie klucz API

---

## 🔮 Options for Evolution / Refactor
- [ ] Trzeci styl PoC-a (np. wektorowy flat, papierowy cut-out, CRT neon)
- [ ] Galeria PoC-ów jako jeden artefakt
- [ ] [Reżyserka](../../../docs/ideas-director.md): odtwarzacz + pasek scen + notatki w bazie artefaktu (6/8 uwag z feedbacku 1 było na poziomie sceny)

---

## 🐛 Open Issues & Architectural Concerns
- [ ] Repo jest publiczne: przed pushem pilnować, żeby nie trafiały tam ścieżki prywatne, klucze API ani dane osobowe.
