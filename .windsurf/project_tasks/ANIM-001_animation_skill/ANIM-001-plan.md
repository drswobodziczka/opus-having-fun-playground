# ANIM-001: Skill do tworzenia animacji kodem

> **Rola:** Dynamiczne Centrum Dowodzenia (SSOT). Tu sprawdzasz status, planujesz ruchy i zapisujesz decyzje.
> **Kontekst:** Patrz plik `ANIM-001-context.md`

## 🚦 Status Dashboard

*   **Current State:** 🟡 In Progress
*   **Current Focus:** Phase 2: brief v3 (spinacz vs ołówek, Rayman × SSF2T) + uprząż testowa v1
*   **Immediate Next Action:** Uzgodnić z userem brief v3 (postacie, scenariusz ~beatów, czas, dźwięk tak/nie, czy jest ffmpeg) i dopiero potem pisać kod. Każda wersja jako osobny katalog `pocs/<temat>/vN-*`.

---

## 🧠 Memory Dump (Kluczowe ustalenia z ostatniej sesji)
*   Z PoC #3 (ninja) do skilla: rig szkieletowy + IK chwytów; ujęcia kamery jako lista {t0,t1,in,out,f(k,V)}; audio jako kolejka sygnałów (live + OfflineAudioContext → WAV → ffmpeg); lektor `say` + ffmpeg osadzony base64; asercje widzialności (plan ogólny: całe ciała, zbliżenie: punkty kluczowe); pomiar głośności ffmpeg zamiast słuchu.
*   Lekcje z feedbacku do Paper Cuts v1 (reguły dla skilla):
    *   Zwrot akcji = zapowiedź → moment → konsekwencja, wszystkie widoczne (double K.O. bez pokazanej przyczyny = „z dupy”).
    *   Rzut = chwyt (kontakt) → zamach (antycypacja) → łuk w kadrze → lądowanie z impaktem. Postacie muszą się wyraźnie różnić sylwetką lub kolorem.
    *   Ruch kamery musi wynikać z akcji. Pełny roll 360° bez motywacji wygląda nienaturalnie.
    *   Dynamika: serie na serie, nakładające się akcje, zmiany tempa (nie „jeden ruch co sekundę”).
    *   Lektor: osadzony TTS (plik), nie `speechSynthesis`.
*   Paper Cuts v1 (PLAY-001) to pierwszy przebieg przez bramki z Decision #3: pytania → brief → akceptacja → kod. Efekt: 16/16 asercji od pierwszego przebiegu, zero przepisywania. Wzorzec dla skilla: DSL scenariusza `at()/sys()`, kontrakt `window.anim`, `check.mjs` z autodetekcją Chrome, `--mp4`.
*   Fabuła należy do scenariusza, nie do fizyki: hitstop rozjeżdżał zegary i finał tracił K.O. (patrz postmortem v2).
*   Model widzi PNG, nie widzi ruchu. Głównym sygnałem jest trace/log (JSON), obraz służy do estetyki.
*   `puppeteer-core` + Chrome z `~/.cache/puppeteer/chrome-headless-shell/mac_arm-131.0.6778.204/...` działa bez pobierania przeglądarki.
*   Zadanie przeniesione 2026-10-02 z ai-central do repo `opus-having-fun-playground` (razem z PoC-ami). Seria PoC-ów jest w PLAY-001.
*   Na koniec: przeniesienie dokumentacji do sejfu Gamedev Universe Vault (prośba usera).

---

## 📎 Artefakty
*   Postmortemy: [v1](../../../pocs/clip-fighter/v1-random-ai/POSTMORTEM.md) · [v2](../../../pocs/clip-fighter/v2-scripted-10s/POSTMORTEM.md). Bug złapany trace’em, usterki arkuszem klatek.
*   [`pocs/clip-fighter/v1-random-ai/`](../../../pocs/clip-fighter/v1-random-ai/): v1, [artefakt](https://claude.ai/code/artifact/672d6377-e1c6-408c-8b70-f494e1560ff6)
*   [`pocs/clip-fighter/v2-scripted-10s/`](../../../pocs/clip-fighter/v2-scripted-10s/): v2 + `check.mjs`, [artefakt](https://claude.ai/code/artifact/c7b43edd-a1ff-49a2-b674-86631529a9f1)

---

## ✅ Acceptance Criteria
*   [ ] Skill (`SKILL.md` + szablon + uprząż) w tym repo (`skills/`), podlinkowany symlinkiem do `~/.claude/skills/`.
*   [ ] Skill zadaje ponumerowane pytania pogłębiające (liczba zależna od ciężaru zadania), potem przedstawia **brief preprodukcyjny** (scenariusz, sceny z czasami, styl, wykonanie, otwarte decyzje) i koduje dopiero po akceptacji (Decision #3).
*   [ ] Uprząż: log zdarzeń, asercje scenariusza, arkusz klatek z chwil zdarzeń, błędy konsoli; opcjonalnie MP4/GIF (ffmpeg).
*   [ ] v3 (spinacz vs ołówek, Rayman × SSF2T, zwroty akcji, 2 obroty kamery) zbudowana **skillem** i przechodzi asercje.
*   [ ] Dokumentacja/wnioski przeniesione do Gamedev Universe Vault.

---

## 🏗️ Architectural Decisions (ADR Log)

### Decision #1: Animacja = deterministyczny program, nie wideo
*   **Context:** Potrzebna kontrola co do klatki, edytowalność i testowalność przez agenta.
*   **Decision:** HTML + Canvas/JS, stały krok 60 Hz, scenariusz z czasami, hooki `seek/state`.
*   **Consequence:** Pełna kontrola i testy w sekundach. Organiczny ruch trudniejszy niż w modelach wideo (np. fal.ai), co może być opcją do porównania.

### Decision #3: Preprodukcja do akceptacji przed kodem (feedback usera 2026-10-02)
*   **Context:** User ocenił najlepiej fazę pytań pogłębiających na starcie. v1 Clip Fightera powstała bez pytania o czas i trzeba ją było przepisać.
*   **Decision:** Skill ma dwie bramki przed implementacją:
    1. **Pytania pogłębiające**, ponumerowane (user odpowiada „ad1, ad2…”). Ich liczba zależy od ciężaru zadania: prosta animacja 2–3, duża produkcja 5–8.
    2. **Brief preprodukcyjny do akceptacji:** scenariusz, rozkład scen z czasami, szczegóły stylu, sposób wykonania (technika, dźwięk, weryfikacja) i lista otwartych decyzji.
*   **Consequence:** Kod powstaje dopiero po akceptacji briefu, a brief zostaje jako `BRIEF.md` w katalogu PoC-a.

### Decision #2: Wynik akcji zapisany w scenariuszu
*   **Context:** Hitstop i slow-mo rozjeżdżały fizykę względem czasu fabuły (finał bez K.O.).
*   **Decision:** Scenariusz ustala wynik (`hit/block/miss/ko`), fizyka jest kosmetyczna.
*   **Consequence:** Fabuła jest odporna na efekty czasu. Tryb „losowe AI” to osobny wariant.

---

## 📋 Implementation Plan

### Phase 1: Poligon v1/v2 (Clip Fighter)
- [x] v1: losowe AI, mecz do 2 wygranych, 1-bit dithering
- [x] v2: scenariusz 10 s, determinizm, suwak, hooki testowe
- [x] Uprząż v0 (`check.mjs`): trace + arkusz klatek + błędy konsoli
- [x] Odtworzenie v1 jako osobnego pliku/artefaktu
- [x] Postmortemy v1 i v2 (obok PoC-ów)

### Phase 2: Brief v3 + uprząż v1
- [ ] Brief v3 z userem: postacie (spinacz, ołówek), beaty, czas, kamera (2 obroty), dźwięk
- [x] ffmpeg 8.0.1 jest (`/opt/homebrew/bin/ffmpeg`)
- [ ] Uprząż v1: log zdarzeń, asercje, arkusz z chwil zdarzeń, MP4/GIF

### Phase 3: Skill
- [ ] `SKILL.md`: pytania wejściowe → dobór narzędzi → scenariusz → build → check → publish
- [ ] Szablon HTML (pętla, scenariusz, kamera, hooki) + biblioteka efektów (hitstop, shake, slow-mo)
- [ ] Zbudować v3 skillem, zebrać wnioski, poprawić skill

### Phase 4: Domknięcie
- [ ] Przenieść dokumentację do Gamedev Universe Vault
- [ ] Notatka/fiszka podsumowująca

---

## 🔮 Options for Evolution / Refactor
- [ ] Dźwięk: Web Audio chiptune + głosy (TTS / `speechSynthesis`)
- [ ] Porównanie z generacją wideo (fal.ai) na tym samym briefie
- [ ] Tryb interaktywny (gra 1P vs CPU)

---

## 🐛 Open Issues & Architectural Concerns
- [ ] Web Audio w podglądzie artefaktu: nieweryfikowane.
- [ ] Obroty kamery w 2D: pseudo-3D (skalowanie/parallaksa) czy WebGL? Do decyzji w briefie v3.
