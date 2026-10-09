# PLAY-001.1: Film „Spinacz”: bajka o maksymalizatorze spinaczy

> **Rola:** Dynamiczne Centrum Dowodzenia (SSOT). Tu sprawdzasz status, planujesz ruchy i zapisujesz decyzje.
> **Kontekst:** Patrz plik `PLAY-001.1-context.md`
> **Zadanie nadrzędne:** [PLAY-001](../PLAY-001_animation_poc_lab/PLAY-001-plan.md) (seria PoC-ów; ten film to kolejny PoC) · **zasila:** [ANIM-001](../ANIM-001_animation_skill/ANIM-001-plan.md) (kit i skill rosną przy filmie)

## 🚦 Status Dashboard

*   **Current State:** 🟡 In Progress (start 2026-10-09)
*   **Current Focus:** Phase 1: preprodukcja (brief zaakceptowany, zostały głosy)
*   **Immediate Next Action:** User odsłuchuje REEL-e w `pocs/spinacz/voice-samples/` i wybiera dziadka (Bill / George / Brian) i głos AI (River / Alice) → Phase 2: kod v1 na kicie (najpierw `kit/engine` + README wg Decision #2), `vo/make.mjs` w `kit/audio`.

---

## 🧠 Memory Dump (Kluczowe ustalenia z ostatniej sesji)
*   2026-10-09: zadanie wyekstrahowane (handoff) z propozycji trzech nowych filmów po ninja v7.5; źródło: [`BACKLOG.md`](../../../BACKLOG.md). Budowa **„kitem w trakcie”** (ANIM-001 Decision #5): ogólne klocki (silnik, audio, weryfikacja dźwięku) lądują w `kit/`, film używa ich od razu.
*   2026-10-10: odpowiedzi na 7 pytań zebrane (oba formaty, papercut, robot + Ola, PL dziadek + AI, galaktyka + plansza, pozytywka → fabryka, 45 s); brief v1 napisany, czeka na akceptację. Zakres kitu z ANIM-001 (Immediate Next Action) dopisany do briefu §6b i Phase 2 (wcześniej brakowało `stems.mjs`, DSL `at()/sys()`, `window.anim`, modułu stylu).
*   2026-10-10: **brief zaakceptowany** z uwagami z review: dokładna charakterystyka stylu papercut, tło merytoryczne (Bostrom 2003, konwergencja instrumentalna, maszyny von Neumanna), **technik przy wyłączniku zamienia się w spinacz** (ZWROT 2), głucha galaktyka, morał o dobrych celach, granicach i wyłączniku; każdy moduł kitu z README (ANIM-001 Decision #9).
*   Proces: `CLAUDE.md` (bramki, wersje, role plików: brief per wersja, cienki CHANGES, POSTMORTEM), fiszki: [`docs/LESSONS.md`](../../../docs/LESSONS.md).

---

## 📎 Artefakty
*   [`pocs/spinacz/v1-flat-45s/BRIEF.md`](../../../pocs/spinacz/v1-flat-45s/BRIEF.md): brief v1 (8 scen, 13 kwestii, plan testów z progami dźwięku), zaakceptowany 2026-10-10

---

## ✅ Acceptance Criteria
*   [x] Brief zaakceptowany (z planem testów i arkuszy omówionym z userem)
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

### Decision #2 (z ANIM-001 Decision #9): README każdego modułu kitu (user, 2026-10-10)
*   **Decision:** każdy moduł wydzielany przy tym filmie ma `README.md`: kontrakt, opis metod, zastosowanie, przykłady; minimalnie, ale wystarczająco do użycia bez czytania kodu.
*   **Consequence:** moduł bez README nie jest „gotowy”; uzupełniamy też `kit/harness`.

---

## 📋 Implementation Plan

### Phase 1: Preprodukcja
- [x] Pytania pogłębiające (7) zadane 2026-10-09: [`research/01-pytania.md`](research/01-pytania.md)
- [x] Odpowiedzi usera (2026-10-10)
- [x] `pocs/spinacz/v1-flat-45s/BRIEF.md` z szablonu `kit/templates/BRIEF.md` + plan testów i arkuszy (szkic gotowy, rozmowa z userem przy akceptacji)
- [x] Próbki głosów premade wygenerowane 2026-10-10: [`voice-samples/`](../../../pocs/spinacz/voice-samples/) (`make.mjs`, `samples.json`), ~450 kredytów
- [ ] Wybór głosów przez usera
- [x] Akceptacja (2026-10-10, z uwagami z review wniesionymi do briefu)

### Phase 2: Produkcja v1
- [ ] Kod (na kicie), uprząż, TIMELINE, arkusze, paski klatek efektów
- [ ] Wydzielić `kit/engine` (zegar 60 Hz, DSL `at()/sys()`, sceny, kamera, `window.anim`, parametr formatu)
- [ ] Wydzielić `kit/audio` (vo, partytura, render offline per ścieżka, embed)
- [ ] **`kit/harness/audio`**: asercje dźwięku (ANIM-001 Decision #8), progi z briefu §6a; przenieść `tools/stems.mjs` do kitu
- [ ] `kit/style/papercut`: pierwszy moduł stylu (B6)
- [ ] README każdego modułu (kontrakt, metody, zastosowanie, przykłady; Decision #2), także uzupełnienie `kit/harness`
- [ ] Lekcje do ANIM-001 + fiszki `docs/LESSONS.md` (`SKILL.md` poza zakresem: ANIM-001 na końcu)
- [ ] Artefakt + MP4, postmortem

### Phase 3: Feedback
- [ ] Rundy feedbacku (`vN-feedback-K/`, brief per wersja, cienki CHANGES)

---

## 🐛 Wnioski z próbek (do produkcji vo)
*   **N5 nie mieści się w limicie 3,4 s** (4,3–5,6 s u wszystkich głosów, przez pauzę „A pomocnicy… pomocników”): przy produkcji wydłużyć okno N5 (przesunąć A4 o ~1 s) albo skrócić tekst; przyspieszenie > 1,2× brzmi źle.
*   Kwestie AI ~0,3–0,8 s za długie (A1 2,3–2,8 s / 2,3 s; A4 3,0–3,4 s / 2,5 s): poluzować limity o ~0,6 s albo `speed` 1,1.
*   v3 potrafi pominąć pierwsze słowo po tagu (River A1 bez „Cel”), a obróbka AI zniekształca spółgłoski (Alice „Fel”): 2+ ujęcia z wyborem po transkrypcji (już w `make.mjs` ninja) i lżejszy `acrusher`.

## 🔮 Options for Evolution / Refactor
*   (brak)

---

## 🐛 Open Issues & Architectural Concerns
*   (brak)
