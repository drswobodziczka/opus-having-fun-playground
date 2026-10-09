# PLAY-001: Poligon PoC-ów animacji generowanych kodem

> **Rola:** Dynamiczne Centrum Dowodzenia (SSOT). Tu sprawdzasz status, planujesz ruchy i zapisujesz decyzje.
> **Kontekst:** Patrz plik `PLAY-001-context.md`

## 🚦 Status Dashboard

*   **Current State:** 🟡 In Progress
*   **Current Focus:** Ninja WebGL v2 (port v7.5, cały film): 4 nowe efekty (falowanie, promienie, LUT, fala uderzeniowa) + piasek GPU na polu wiatru; 18/18 na GPU: https://claude.ai/code/artifact/7bd123a7-1ca1-4dd6-a101-631cf04100d6 · samouczek [`docs/webgl-tutorial.md`](../../../docs/webgl-tutorial.md)
*   **Immediate Next Action:** Ocena WebGL v2 przez usera (na żywo: fala uderzeniowa, falowanie, piasek). Follow-up: MP4 całego filmu na GPU (`node check.mjs --mp4` w `pocs/ninja-webgl/v2-port-v7.5/`). Równolegle PLAY-001.1 Spinacz (osobny agent). Ninja v8 później (w Canvas, potem port).

---

## 🧠 Memory Dump (Kluczowe ustalenia z ostatniej sesji)
*   2026-10-10: **uprząż WebGL na GPU**: pełny Chrome headless rysuje przez Metal (Apple M3 Pro), ok. 20× szybciej niż SwiftShader (spike: 39 vs 789 ms/klatkę, cała uprząż 13,5 s zamiast 540 s). `kit/harness` `openFilm({ gl: true })` wybiera GPU, SwiftShader jako zapas. v7.5 oceniona: OK.
*   HANDOVER 2026-10-07: od następnej sesji pracujemy **w tym repo** (wcześniej sesja żyła w `title-master`). Konwencje i komendy: `CLAUDE.md` w root repo. Pamięć agenta (bramki preprodukcji, konto do pushowania) skopiowana do projektu playgroundu.
*   Stan ninja: v1 → v7 (`pocs/ninja-sandstorm/v7-feedback-6/`, artefakt https://claude.ai/code/artifact/89d0d482-499c-4268-b6ce-5c3b47909a52). Muzyka v6 zaakceptowana („rewelacja”). Do oceny: głosy v7.
*   Lektor generuje `vo/make.mjs` (obsada, ujęcia, STT, limity slotów); pliki `vo/*.mp3` są w repo per wersja, regenerować tylko zmienione kwestie (`node vo/make.mjs <nazwa>`). Klucz API ma własny limit kredytów (ustawiany w dashboardzie), niezależny od limitu konta.
*   Muzyka z soundfontu: partytura w kodzie → MIDI → GeneralUser GS → `spessasynth_core` (JS), samouczek [`docs/soundfont-fluidsynth.md`](../../../docs/soundfont-fluidsynth.md). Mowę weryfikuję transkrypcją ElevenLabs (Scribe), muzykę spektrogramem.
*   Każdy PoC to katalog `pocs/<temat>/vN-<opis>/` z: `*.html`, uprzężą/wynikami testów, `POSTMORTEM.md`.
*   Postmortem robimy **po każdej wersji**: narzędzia (kolejność, cel, czas), problemy prosto, lekcje.
*   Wnioski przenoszone do skilla są śledzone w ANIM-001.
*   ffmpeg działa: render przez `anim.step()` → PNG → MP4 (3× neighbor). 120 s filmu w ~15 s.
*   Dźwięk: model nie słyszy. PoC #2 niezweryfikowany, PoC #3 zmierzony (`volumedetect`/RMS), ale barwę i miks ocenia user.
*   Protokół poprawek działa dla PoC #2 i #3 (mają `script()` i TIMELINE). Clip Fighter v1/v2 są poza protokołem (zamknięte prototypy).
*   Zmiana decyzji z briefu (styl, fatality, muzyka) = wpis w BRIEF §8 „Rewizje” w tej samej rundzie (lekcja z v4: wcześniej pominięte).
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

## 🧩 Podzadania (kolejne PoC-e jako osobne zadania)
| Zadanie | PoC | Stan |
|---|---|---|
| [PLAY-001.1](../PLAY-001.1_film_spinacz_paperclip_maximizer/PLAY-001.1-plan.md) | Spinacz: bajka o maksymalizatorze spinaczy | 🟡 w toku (brief v1 do akceptacji) |
| [PLAY-001.2](../PLAY-001.2_film_notatka_prompt_injection/PLAY-001.2-plan.md) | Notatka: komedia o prompt injection | ⏸️ po PLAY-001.1 |
| [PLAY-001.3](../PLAY-001.3_film_wyscig_race/PLAY-001.3-plan.md) | Wyścig: dwa pojazdy na zakrętach | ⏸️ po PLAY-001.2 |

Wcześniejsze PoC-e (Clip Fighter, Paper Cuts, Ninja, Ninja WebGL) są prowadzone bezpośrednio w tym zadaniu. Każdy podzadaniowy film zasila też ANIM-001 (kit i skill).

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
- [x] Feedback 3 (styl tuszu + noc, podcięcie, muzyka chińska, kręgosłup) → v4-feedback-3, 40/40, [`CHANGES.md`](../../../pocs/ninja-sandstorm/v4-feedback-3/CHANGES.md); BRIEF §8 Rewizje
- [x] Feedback 4 (jeden wygląd postaci, wolniejsze podcięcie na dłoniach, muzyka adaptacyjna) → v5-feedback-4, 40/40, [`CHANGES.md`](../../../pocs/ninja-sandstorm/v5-feedback-4/CHANGES.md)
- [x] Ocena v5 przez usera (→ feedback 5)
- [x] Research + samouczek ElevenLabs: [`docs/elevenlabs.md`](../../../docs/elevenlabs.md)
- [x] Test kosztu ElevenLabs: TTS zużywa kredyty z planu (17 znaków = 17 kredytów). Głosy z Voice Library przez API = płatny plan (402), działają tylko premade. Wyniki: [`docs/elevenlabs.md`](../../../docs/elevenlabs.md) §4
- [x] Próbki 3 głosy × 3 kwestie: `pocs/ninja-sandstorm/voice-samples/el-*-REEL.mp3` (łącznie zużyto 95/10 000 kredytów)
- [x] Wybór głosu: Harry (2026-10-07); do wyboru model v2/v4/v3
- [x] Feedback 5 (lektor Harry v3, szalony śmiech, muzyka kung-fu z soundfontu) → v6-feedback-5, 40/40, [`CHANGES.md`](../../../pocs/ninja-sandstorm/v6-feedback-5/CHANGES.md); BRIEF §8
- [x] Ocena v6: muzyka „rewelacja”; głos OK, ale część kwestii mniej emocjonalna; bug po powtórce (BISHUKIJ z ręką w górze)
- [x] Feedback 6 → v7-feedback-6, 41/41 (nowy test „Replay”), [`CHANGES.md`](../../../pocs/ninja-sandstorm/v7-feedback-6/CHANGES.md); BRIEF §8
- [x] Ocena v7 przez usera
- [x] Briefy per wersja przepisane na czysto (v2–v7), cienkie CHANGES + POSTMORTEM, role plików w `CLAUDE.md` (2026-10-09)
- [x] v7.2 (część feedbacku 7): śmiech, stopy, świat; [`CHANGES.md`](../../../pocs/ninja-sandstorm/v7.2-feedback-7/CHANGES.md)
- [x] Ocena v7.2: stopy ok-ish, śmiech ok, świat do przeiterowania
- [x] v7.3: świat (wichura, wiry, krzaki, podmuchy na arenie) + stopy; [`CHANGES.md`](../../../pocs/ninja-sandstorm/v7.3-feedback-8/CHANGES.md)
- [x] Ocena v7.3: stopy ok, arena super; wiry („palą się”) i podmuchy na wydmach („wybuchy”) źle; lekcja: ruch sprawdzać paskami klatek
- [x] v7.4: wiry i wiatr od nowa; [`CHANGES.md`](../../../pocs/ninja-sandstorm/v7.4-feedback-9/CHANGES.md)
- [x] Ocena v7.4: wiry i ruch piasku dużo lepsze
- [x] v7.5: dźwięk wichury; [`CHANGES.md`](../../../pocs/ninja-sandstorm/v7.5-feedback-11/CHANGES.md)
- [ ] Ocena v7.5 uchem

### Phase 2c: Czytelność rozpiski (TODO usera)
- [x] TIMELINE v2 (2026-10-09): grupowanie po scenach, CO / JAK / PO CO z [`scenes.json`](../../../pocs/ninja-sandstorm/scenes.json), polskie opisy akcji, zwinięte puste sekundy; wygenerowane dla v7 i spike'a WebGL
- [ ] Znaczniki scen w kodzie (`scene(id, t0, t1, cel)`) dla PoC #2 i #3
- [x] Generator `tools/timeline.mjs` + `tools/frames.mjs` + `docs/EDIT-PROTOCOL.md` (v1)

### Phase 3: Warsztat
- [x] Uprząż v1: log zdarzeń, asercje, arkusz z kluczowych chwil, autodetekcja Chrome
- [x] Dźwięk (Web Audio + speechSynthesis) w PoC #2 (niezweryfikowany odsłuchem)
- [x] Lektor `say` + ffmpeg, MP4 z dźwiękiem z `OfflineAudioContext` (PoC #3)
- [x] Skan ciągłości klatka po klatce + płynne przejścia póz (ninja v3)
- [x] Znacznik sceny i sekundy w kadrze, klik/strzałki (ninja v2+)
- [ ] Porównanie z modelem wideo (fal.ai), jeśli będzie klucz API

### Phase 4: Ładniejszy render (WebGL)
- [x] Decyzja: własny silnik symulacji + render **PixiJS** z shaderami; Remotion / Motion Canvas odrzucone (rama czasu i MP4 już są, uroda to sprawa renderu). Notatka: [`options/webgl-render.md`](options/webgl-render.md)
- [x] Pytania ad1–ad3 (S6 + S8, kinowo, 720p) → brief [`pocs/ninja-webgl/BRIEF.md`](../../../pocs/ninja-webgl/BRIEF.md)
- [x] Akceptacja briefu (2026-10-09)
- [x] Spike `pocs/ninja-webgl/v1-spike-s6-s8/`: 15/15, [`compare-v7-gl.png`](../../../pocs/ninja-webgl/v1-spike-s6-s8/compare-v7-gl.png), MP4 segmentów, [postmortem](../../../pocs/ninja-webgl/v1-spike-s6-s8/POSTMORTEM.md)
- [x] **Port v7.5 do WebGL (`pocs/ninja-webgl/v2-port-v7.5/`)** (2026-10-10, 18/18, [`CHANGES.md`](../../../pocs/ninja-webgl/v2-port-v7.5/CHANGES.md)): cały film, 4 nowe efekty (falowanie powietrza, god rays, LUT, fala uderzeniowa) + ładniejszy piasek na tym samym polu wiatru + samouczek `docs/webgl-tutorial.md`; [`BRIEF.md`](../../../pocs/ninja-webgl/v2-port-v7.5/BRIEF.md)
- [ ] Ocena WebGL v2 przez usera · MP4 całego filmu (follow-up)
- [x] Ocena spike'a: user widzi, że zmienił się cały film; decyzja: zmiany w v7 (Canvas) → v8, potem port do WebGL
- [x] Migawki briefu per wersja (v1–v7), [`PROMPT.md`](../../../pocs/ninja-sandstorm/PROMPT.md) z wejściem usera

---

## 🔮 Options for Evolution / Refactor
- Przeniesione 2026-10-08 do globalnego [`BACKLOG.md`](../../../BACKLOG.md) (B2–B6: wymiana postaci, wymiana stylu, reżyserka, galeria, trzeci styl).

---

## 🐛 Open Issues & Architectural Concerns
- [ ] Repo jest publiczne: przed pushem pilnować, żeby nie trafiały tam ścieżki prywatne, klucze API ani dane osobowe.
