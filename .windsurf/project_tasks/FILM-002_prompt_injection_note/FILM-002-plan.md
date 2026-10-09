# FILM-002: Notatka: komedia o prompt injection

> **Rola:** Dynamiczne Centrum Dowodzenia (SSOT). Tu sprawdzasz status, planujesz ruchy i zapisujesz decyzje.
> **Kontekst:** Patrz plik `FILM-002-context.md`
> **Zadanie nadrzędne:** [PLAY-001](../PLAY-001_animation_poc_lab/PLAY-001-plan.md) (seria PoC-ów; ten film to kolejny PoC) · **zasila:** [ANIM-001](../ANIM-001_animation_skill/ANIM-001-plan.md) (kit i skill rosną przy filmie)

## 🚦 Status Dashboard

*   **Current State:** ⏸️ Todo (po FILM-001)
*   **Current Focus:** Phase 1: preprodukcja
*   **Immediate Next Action:** Po FILM-001: pytania pogłębiające → BRIEF z szablonu kitu → akceptacja → kod (na kicie z FILM-001).

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
- [ ] Kod (na kicie), uprząż, TIMELINE, arkusze, paski klatek efektów, pomiar dźwięku
- [ ] Artefakt + MP4, postmortem

### Phase 3: Feedback
- [ ] Rundy feedbacku (`vN-feedback-K/`, brief per wersja, cienki CHANGES)

---

## 🔮 Options for Evolution / Refactor
*   (brak)

---

## 🐛 Open Issues & Architectural Concerns
*   (brak)
