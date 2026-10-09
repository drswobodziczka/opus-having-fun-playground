# PLAY-001.1: Film „Spinacz”: bajka o maksymalizatorze spinaczy

> **Rola:** Dynamiczne Centrum Dowodzenia (SSOT). Tu sprawdzasz status, planujesz ruchy i zapisujesz decyzje.
> **Kontekst:** Patrz plik `PLAY-001.1-context.md`
> **Zadanie nadrzędne:** [PLAY-001](../PLAY-001_animation_poc_lab/PLAY-001-plan.md) (seria PoC-ów; ten film to kolejny PoC) · **zasila:** [ANIM-001](../ANIM-001_animation_skill/ANIM-001-plan.md) (kit i skill rosną przy filmie)

## 🚦 Status Dashboard

*   **Current State:** 🟡 In Progress (start 2026-10-09)
*   **Current Focus:** Phase 1: preprodukcja
*   **Immediate Next Action:** Zebrać odpowiedzi usera na 7 pytań z [`research/01-pytania.md`](research/01-pytania.md) → BRIEF z szablonu kitu z tabelą scen i sekcją „Plan testów i arkuszy” (progi dla asercji dźwięku, Decision #8) → przegląd z userem → akceptacja → kod.

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

### Decision #1 (z ANIM-001 Decision #8): weryfikacja dźwięku w uprzęży (2026-10-09)
*   **Context:** Dziś weryfikacja audio to wiedza agenta + rozproszone skrypty (`vo/make.mjs` transkrypcja, `tools/stems.mjs` poziomy, spektrogram i `volumedetect` ad hoc). Uprząż niczego w dźwięku nie asertuje.
*   **Decision:** Ten film jako pierwszy buduje i używa `kit/harness/audio`: render ścieżek osobno (`renderAudio(rate, { stem })`), asercje: brak przesteru (szczyt < −1 dBFS), każda kwestia narratora słyszalna nad resztą w swoim oknie, kwestie się nie nakładają, poziomy ścieżek w zadanych oknach, muzyka/cisza tam, gdzie mają być, transkrypcje (`vo/takes.json`) zgodne ze scenariuszem; raport poziomów + spektrogram PNG jako arkusz. **Progi w sekcji „Plan testów i arkuszy” briefu**, ustalane z userem.
*   **Consequence:** `tools/stems.mjs` przechodzi do kitu; asercje dźwięku dostępne dla kolejnych filmów (PLAY-001.2, PLAY-001.3, ninja v8).

---

## 📋 Implementation Plan

### Phase 1: Preprodukcja
- [x] Pytania pogłębiające (7) zadane 2026-10-09: [`research/01-pytania.md`](research/01-pytania.md)
- [ ] Odpowiedzi usera
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
