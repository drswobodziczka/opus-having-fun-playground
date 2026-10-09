# FILM-001: Spinacz: bajka o maksymalizatorze spinaczy

> **Rola:** Dynamiczne Centrum Dowodzenia (SSOT). Tu sprawdzasz status, planujesz ruchy i zapisujesz decyzje.
> **Kontekst:** Patrz plik `FILM-001-context.md`

## 🚦 Status Dashboard

*   **Current State:** 🟡 In Progress (start 2026-10-09)
*   **Current Focus:** Phase 1: preprodukcja
*   **Immediate Next Action:** Pytania pogłębiające (2–3 albo 5–8) → BRIEF z szablonu kitu (z sekcją „Plan testów i arkuszy” omawianą z userem) → akceptacja → kod.

---

## 🧠 Memory Dump (Kluczowe ustalenia z ostatniej sesji)
*   2026-10-09: zadanie wyekstrahowane (handoff) z propozycji trzech nowych filmów po ninja v7.5; źródło: [`BACKLOG.md`](../../../BACKLOG.md). Budowa **„kitem w trakcie”** (ANIM-001 Decision #5): ogólne klocki (silnik, audio, weryfikacja dźwięku) lądują w `kit/`, film używa ich od razu.
*   Proces: `CLAUDE.md` (bramki, wersje, role plików: brief per wersja, cienki CHANGES, POSTMORTEM), fiszki: [`docs/LESSONS.md`](../../../docs/LESSONS.md).

---

## 📎 Artefakty
*   (brak)

---

## ✅ Acceptance Criteria
*   [ ] Brief zaakceptowany (z planem testów i arkuszy omówionym z userem)
*   [ ] v1 zbudowana na kicie (`kit/harness` + nowe klocki), uprząż zielona, MP4 z dźwiękiem
*   [ ] Lekcje: co z kitu zadziałało, czego brakowało → ANIM-001
*   [ ] Ocena usera i rundy feedbacku wg procesu

---

## 🏗️ Architectural Decisions (ADR Log)
*   (brak)

---

## 📋 Implementation Plan

### Phase 1: Preprodukcja
- [ ] Pytania pogłębiające
- [ ] `pocs/<temat>/BRIEF.md` z szablonu `kit/templates/BRIEF.md` + plan testów i arkuszy (rozmowa z userem)
- [ ] Akceptacja

### Phase 2: Produkcja v1
- [ ] Kod (na kicie), uprząż, TIMELINE, arkusze, paski klatek efektów
- [ ] **`kit/harness/audio`**: asercje dźwięku w uprzęży (ANIM-001 Decision #8), pierwszy film, który z nich korzysta
- [ ] Wydzielić `kit/engine` i `kit/audio` (vo, partytura, render, embed) przy tym filmie
- [ ] Artefakt + MP4, postmortem

### Phase 3: Feedback
- [ ] Rundy feedbacku (`vN-feedback-K/`, brief per wersja, cienki CHANGES)

---

## 🔮 Options for Evolution / Refactor
*   (brak)

---

## 🐛 Open Issues & Architectural Concerns
*   (brak)
