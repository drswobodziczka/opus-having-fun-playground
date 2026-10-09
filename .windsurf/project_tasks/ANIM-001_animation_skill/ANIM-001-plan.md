# ANIM-001: Skill do tworzenia animacji kodem

> **Rola:** Dynamiczne Centrum Dowodzenia (SSOT). Tu sprawdzasz status, planujesz ruchy i zapisujesz decyzje.
> **Kontekst:** Patrz plik `ANIM-001-context.md`

## 🚦 Status Dashboard

*   **Current State:** 🟡 In Progress
*   **Current Focus:** Phase 3: skill. Wzorce są zebrane z 3 PoC-ów (PLAY-001), czekają na spisanie w `SKILL.md` i szablon
*   **Immediate Next Action:** `kit/harness` ✅ (dowód na v7: identyczne wyniki). Dalej: używać go w spike'u WebGL (`pocs/ninja-webgl/`), potem wydzielić `kit/audio`. Szablon briefu: [`kit/templates/BRIEF.md`](../../../kit/templates/BRIEF.md) (pierwsze użycie: brief ninja-webgl).

---

## 🧠 Memory Dump (Kluczowe ustalenia z ostatniej sesji)
*   **2026-10-09 lekcja: efekty ruchu (cząsteczki, wiatr, wiry) uprząż nie widzi** (skan dotyczy stawów). v7.3 oceniane stopklatkami wyszło źle („palące się” wiry, „wybuchy” zamiast wiatru). Krok walidacji: `tools/strip.mjs` (pasek kolejnych klatek); kandydat na detektor w kicie (ciągłość i kierunek ruchu cząstek).
*   **2026-10-08 (user): skan klatka po klatce = kręgosłup uprzęży w skillu.** To główne narzędzie do łapania „baboli”: rozwijamy je o kolejne detektory (dziś: skoki kości ≥ 60 px, NaN; plus test powtórki). Arkusze PNG to uzupełnienie dla estetyki, nie główny sygnał.
*   2026-10-07: wzorzec silnika/uprzęży/audio to teraz **ninja v7** (`pocs/ninja-sandstorm/v7-feedback-6/`): + `vo/make.mjs` (ElevenLabs, obsada, STT, sloty), `music/score.mjs` → MIDI → soundfont (spessasynth_core), `embed.mjs`, `syncMusic`, test „Replay” (reset stanu postaci). User pyta o framework do powtarzalnych filmów → [`options/reusable-kit.md`](options/reusable-kit.md).
*   HANDOVER 2026-10-07: dalsza praca w tym repo (`CLAUDE.md`). Najpełniejszy wzorzec silnika i uprzęży to teraz **ninja v5** (`pocs/ninja-sandstorm/v5-feedback-4/`): + adaptacyjna muzyka sterowana zdarzeniami (`SCENE_MODE`, `STINGERS`), limiter na wyjściu, jeden projekt postaci (obwódka zależna od tła), IK do podłoża (`groundF/B`).
*   Lekcje silnika z ninja v3 (do szablonu): płynne przejścia póz (adaptacyjne 0,07–0,2 s), kąty po najkrótszym łuku, obrót postaci w czasie (spinX), chwyty z dojściem i płynnym puszczeniem, każdy ruch akrobatyczny musi mieć powód (unik przed konkretnym ciosem).
*   Pętla poprawek (prośba usera 2026-10-02): user podaje `@sekunda co zmienić` (albo ID zdarzenia), a skill: lokalizuje w TIMELINE → zmienia → check → arkusz PRZED/PO → ten sam link artefaktu → commit. Rozpiska sekunda po sekundzie (dope sheet) jest GENEROWANA z animacji (`tools/timeline.mjs`), nie pisana ręcznie; brief to plan, timeline to stan faktyczny. Kontrakt: `window.anim = { duration, seek, state, events, script }`. Skill ma to mieć wbudowane.
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
*   `puppeteer-core` + Chrome headless shell z cache (`~/.cache/puppeteer`): uprząż v1+ ma autodetekcję wersji.
*   TODO usera (2026-10-02): TIMELINE ma mówić CO/JAK/PO CO i mieć 1-1 powiązanie ze scenami z BRIEF. Skill ma od razu nadawać scenom ID (S1..Sn) wspólne dla BRIEF, kodu i TIMELINE.
*   Zadanie przeniesione 2026-10-02 z ai-central do repo `opus-having-fun-playground` (razem z PoC-ami). Seria PoC-ów jest w PLAY-001.
*   Na koniec: przeniesienie dokumentacji do sejfu Gamedev Universe Vault (prośba usera).

---

## 📎 Artefakty
*   Postmortemy: [v1](../../../pocs/clip-fighter/v1-random-ai/POSTMORTEM.md) · [v2](../../../pocs/clip-fighter/v2-scripted-10s/POSTMORTEM.md). Bug złapany trace’em, usterki arkuszem klatek.
*   [`pocs/clip-fighter/v1-random-ai/`](../../../pocs/clip-fighter/v1-random-ai/): v1, [artefakt](https://claude.ai/code/artifact/672d6377-e1c6-408c-8b70-f494e1560ff6)
*   [`pocs/clip-fighter/v2-scripted-10s/`](../../../pocs/clip-fighter/v2-scripted-10s/): v2 + `check.mjs`, [artefakt](https://claude.ai/code/artifact/c7b43edd-a1ff-49a2-b674-86631529a9f1)
*   Ninja v5 (aktualny wzorzec): [`pocs/ninja-sandstorm/v5-feedback-4/`](../../../pocs/ninja-sandstorm/v5-feedback-4/) · Ninja v3 (wzorzec silnika po poprawkach ciągłości): [`pocs/ninja-sandstorm/v3-feedback-2/`](../../../pocs/ninja-sandstorm/v3-feedback-2/), [CHANGES](../../../pocs/ninja-sandstorm/v3-feedback-2/CHANGES.md)
*   Wzorce do skilla: [Paper Cuts v1](../../../pocs/paperclip-vs-pencil/v1-pixel-120s/) (DSL `at()/sys()`, uprząż v1, MP4) · [Storm v1](../../../pocs/ninja-sandstorm/v1-ink-pixel-60s/) (rig+IK, ujęcia kamery, audio-cue + offline, asercje widzialności) · [`docs/EDIT-PROTOCOL.md`](../../../docs/EDIT-PROTOCOL.md) · [`tools/`](../../../tools/)

---

## ✅ Acceptance Criteria
*   [ ] Skill (`SKILL.md` + szablon + uprząż) w tym repo (`skills/`), podlinkowany symlinkiem do `~/.claude/skills/`.
*   [ ] Skill zadaje ponumerowane pytania pogłębiające (liczba zależna od ciężaru zadania), potem przedstawia **brief preprodukcyjny** (scenariusz, sceny z czasami, styl, wykonanie, otwarte decyzje) i koduje dopiero po akceptacji (Decision #3).
*   [ ] Uprząż **jako część skilla** (generyczna, nie per-PoC) z 5 warstwami z Decision #4: zgodność ze scenariuszem, ciągłość (skan co klatkę), kadr, styl, wzrok; + błędy konsoli, MP4 z dźwiękiem. *Prototypy działają w PoC #2/#3 (warstwy 1–3 i częściowo 5).*
*   [ ] Pętla poprawek wbudowana w skill: `@sekunda` → TIMELINE → zmiana → check → PRZED/PO (prototyp: `docs/EDIT-PROTOCOL.md`, `tools/`).
*   [ ] Kolejny PoC zbudowany **skillem** (od pytań do MP4) i przechodzi asercje.
*   [ ] Dokumentacja/wnioski przeniesione do Gamedev Universe Vault.

---

## 🏗️ Architectural Decisions (ADR Log)

### Decision #8: Weryfikacja dźwięku w uprzęży, nie w głowie agenta (user, 2026-10-09)
*   **Context:** Dziś weryfikacja audio to wiedza agenta + rozproszone skrypty: transkrypcja kwestii w `vo/make.mjs`, poziomy ścieżek w `tools/stems.mjs`, spektrogram i `volumedetect` ad hoc. Uprząż tylko wypisuje liczbę sygnałów audio, niczego nie asertuje.
*   **Decision:** `kit/harness/audio` (budowany przy FILM-001): render ścieżek osobno (`renderAudio(rate, { stem })`) i asercje: brak przesteru (szczyt < −1 dBFS), każda kwestia lektora słyszalna (VO ≥ X dB nad resztą w swoim oknie), kwestie się nie nakładają (czasy + długości plików), poziomy ścieżek w zadanych oknach (np. wiatr pod muzyką), muzyka obecna tam, gdzie ma grać, cisza tam, gdzie ma być; raport poziomów i spektrogram PNG jako arkusz; transkrypcje z `vo/takes.json` sprawdzane względem scenariusza. Progi w sekcji „Plan testów” briefu.
*   **Consequence:** Audio staje się częścią uprzęży jak skan klatek; `tools/stems.mjs` przechodzi do kitu.

### Decision #6: Chirurgiczna precyzja, powtarzalność i kontrola jako sznyt skilla (user, 2026-10-09)
*   **Context:** Agent interpretuje brief za każdym razem inaczej (jak ludzki animator). Precyzja w PoC-ach bierze się z zamrożenia kodu po v1 i chirurgicznych zmian, nie z briefu.
*   **Decision:** Skill uczy wprost, JAK uzyskiwać chirurgiczną precyzję zmian, powtarzalność i kontrolę: v1 z briefu = punkt startu; od v2 tylko kopia + minimalne podmiany; determinizm (stały krok, losowość z ziarna, wyniki w scenariuszu, bez zegara systemowego); uprząż pilnuje niezmienionych części (zdarzenia, pozy, test powtórki); brief per wersja + cienki CHANGES.
*   **Consequence:** Osobny rozdział SKILL.md; fiszka w [`docs/LESSONS.md`](../../../docs/LESSONS.md); eksperyment B11 (ten sam brief, nowa budowa) jako miara rozrzutu.

### Decision #7: Plan testów omawiany z userem (2026-10-09)
*   **Context:** Asercje (liczbowe) i arkusze/paski klatek (wizualne) to osobne procesy; user chce współdecydować, co sprawdzamy i gdzie robić arkusze konkretnych momentów.
*   **Decision:** Przy briefie krótka rozmowa high-level o planie testów: asercje (z kolumny „Sprawdzenie”), momenty na arkusze, efekty na paski klatek; user dopisuje swoje momenty. Sekcja „Plan testów i arkuszy” w szablonie briefu.

### Decision #5: Kit i skill modelujemy w trakcie PoC-ów (2026-10-08)
*   **Context:** User: „szkoda marnować doświadczeń”; czekanie z frameworkiem do końca PoC-ów gubi lekcje i mnoży kopie kodu.
*   **Decision:** Zbieranie na bieżąco: ogólne klocki lądują w `kit/` w repo playgroundu (root), skill w `skills/code-animation/` (symlink do `~/.claude/skills`). Kolejne wersje PoC-ów używają klocków z kitu. **Sprawdzian końcowy** (nowy mały film od zera tylko z kitu) planujemy po postępie we wszystkich PoC-ach.
*   **Consequence:** Każda runda PoC-a pyta „co z tego jest ogólne?”. Kit rośnie małymi krokami, z dowodem (uprząż przechodzi tak samo).

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

### Decision #4: Analiza klatka po klatce jako stała cecha uprzęży (user, 2026-10-06)
*   **Context:** Skan wszystkich klatek w ninja v3 znalazł ~300 przeskoków póz, których nie widziały ani asercje (fabuła), ani arkusze (pojedyncze kadry).
*   **Decision:** Uprząż skilla ma 5 warstw walidacji uruchamianych przed oddaniem filmu: (1) zgodność ze scenariuszem (log zdarzeń), (2) ciągłość i fizyka (skan kości co klatkę, a dalej stopy, przenikanie), (3) kadr (widzialność per ujęcie: `both` / `key` / zbliżenie), (4) styl (napisy, paleta), (5) wzrok (gęste arkusze per scena).
*   **Consequence:** Film dociera do usera po mojej własnej rundzie poprawek. Warstwy 4 i 5 (automatycznie per scena) są jeszcze do zbudowania.

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

### Phase 2: Poligon PoC #2/#3 (realizowane w PLAY-001)
- [x] Brief PoC #2 (spinacz vs ołówek) i PoC #3 (ninja) z bramkami Decision #3
- [x] ffmpeg 8.0.1 jest (`/opt/homebrew/bin/ffmpeg`)
- [x] Uprząż v1/v2: log zdarzeń, asercje (fabuła + widzialność), arkusze, MP4 z dźwiękiem
- [x] Pętla poprawek: `tools/timeline.mjs`, `tools/frames.mjs`, `docs/EDIT-PROTOCOL.md`

### Phase 3: Skill
- [ ] `SKILL.md`: pytania → brief ze scenami S1..Sn → dobór narzędzi → build → check → TIMELINE → publish → pętla poprawek → postmortem
- [ ] Szablon HTML (pętla 60 Hz, DSL scenariusza ze scenami, kamera z ujęciami, audio-cue, kontrakt `window.anim`) + biblioteka efektów (shake, iskry, krew, banery)
- [ ] Generyczna uprząż (asercje deklarowane obok scenariusza)
- [ ] Zbudować kolejny PoC skillem, zebrać wnioski, poprawić skill

### Phase 4: Domknięcie
- [ ] Przenieść dokumentację do Gamedev Universe Vault
- [ ] Notatka/fiszka podsumowująca

---

## 🔮 Options for Evolution / Refactor
- [x] Dźwięk: Web Audio chiptune + lektor (`say` + ffmpeg) — zrobione w PoC #2/#3
- [ ] Chmurowy TTS (ElevenLabs/OpenAI) jako opcja skilla
- [ ] Porównanie z generacją wideo (fal.ai) na tym samym briefie
- [ ] Tryb interaktywny (gra 1P vs CPU)

---

## 🐛 Open Issues & Architectural Concerns
- [ ] Web Audio w podglądzie artefaktu: nieweryfikowane.
- [x] Obroty kamery w 2D: rozstrzygnięte, pseudo-3D (roll, fałszywa orbita, ujęcia). WebGL w `docs/ideas-webgl.md`.
