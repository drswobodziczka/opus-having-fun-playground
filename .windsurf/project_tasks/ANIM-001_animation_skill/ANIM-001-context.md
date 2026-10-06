# ANIM-001: Kontekst

> **Rola:** Żywy Brief. Zakres biznesowy, wymagania, kluczowe pliki, dane referencyjne.
> Aktualizacja: 2026-10-07 (po 3 PoC-ach i 3 wersjach ninja w PLAY-001).

## Opis Zadania
Skill do **tworzenia animacji kodem**: user podaje temat, styl i czas, a agent przeprowadza go przez pytania i brief, buduje deterministyczny film HTML/Canvas, waliduje go wielowarstwowo przed oddaniem, publikuje jako artefakt (plus MP4 z dźwiękiem) i prowadzi pętlę poprawek po sekundach i scenach. Wzorce pochodzą z poligonu PLAY-001: Clip Fighter (1-bit), Paper Cuts (kolorowy pixel), The Storm Chose Black (tusz → mroczny pixel, v1–v3).

## Wymagania

### Proces (bramki i pętle)
- **Bramka 1, pytania pogłębiające:** ponumerowane (odpowiedzi „ad1, ad2…”). Liczba zależy od ciężaru zadania: 2–3 dla małej animacji, 5–8 dla produkcji (Decision #3).
- **Bramka 2, brief do akceptacji:** scenariusz, **tabela scen S1..Sn** (czas, CO / JAK / PO CO, zwrot: zapowiedź → moment → konsekwencja), styl, wykonanie (technika, dźwięk, walidacja), otwarte decyzje. Kod dopiero po akceptacji.
- **Pętla poprawek:** uwagi na trzech poziomach (`[film]`, `S6`, `@41.2`) z opcjonalnymi tagami (12 tagów, `docs/EDIT-PROTOCOL.md`). Skill lokalizuje uwagę przez TIMELINE, zmienia, waliduje, pokazuje porównanie i publikuje. Większa runda = nowa wersja (`vN-feedback-K/`, nowy artefakt, `CHANGES.md`).
- **Postmortem** po każdej wersji: narzędzia, czasy, problemy, lekcje.

### Silnik (szablon)
- Deterministyczny: stały krok 60 Hz, `seek(t)` daje zawsze tę samą klatkę.
- **Scenariusz z wynikami** (`hit/block/miss/ko`), bo fabuła należy do scenariusza, nie do fizyki (Decision #2). **Sceny jako dane** (`SCENES`: ID, czas, nazwa; docelowo CO/JAK/PO CO).
- **Rig szkieletowy + IK** (chwyty z dojściem i płynnym puszczeniem), **płynne przejścia póz** (adaptacyjne 0,07–0,2 s), kąty po najkrótszym łuku, obrót postaci w czasie (bez lustra w jednej klatce).
- **Kamera z ujęciami** `{t0, t1, in, out, f}` (najazd, odjazd, obrót motywowany akcją), plus zwolnienie (`SLOWMO`) bez rozjazdu zegarów.
- **Audio jako kolejka sygnałów:** na żywo (Web Audio) i offline (`OfflineAudioContext` → WAV → MP4). Lektor z pliku (`say` + ffmpeg, docelowo opcja chmurowego TTS).
- **Kontrakt dla narzędzi:** `window.anim = { duration, seek, step, advance, state, events, script, scenes, view, joints, setTimecode, renderAudio }`.
- **UX filmu:** znacznik sceny i sekundy w kadrze (`T`), klik = pauza, strzałki ±1 s / ±0,1 s, suwak ze znacznikami scen.

### Walidacja (Decision #4, uruchamiana przed oddaniem filmu)
1. **Zgodność ze scenariuszem:** log zdarzeń + asercje z oknami czasu, wyprowadzone z briefu (docelowo deklarowane w tabeli scen).
2. **Ciągłość i fizyka:** skan wszystkich klatek (skoki kości, NaN). Dalej: ślizganie stóp, przenikanie ciał.
3. **Kadr:** widzialność per ujęcie (`both` / `key` / zbliżenie).
4. **Styl:** napisy nachodzące na postacie, paleta (do zbudowania).
5. **Wzrok:** gęste arkusze klatek per scena (docelowo automatycznie dla każdej sceny).

### Wyjście
- Samowystarczalny plik HTML jako artefakt Claude (osobny link per wersja).
- MP4 z dźwiękiem (lokalnie, poza gitem), `TIMELINE.md` (generowany), arkusze, `CHANGES.md` / `POSTMORTEM.md`.
- Skill w repo (`skills/code-animation/`), symlink do `~/.claude/skills/`.
- Na koniec: wnioski do sejfu Obsidian *Gamedev Universe Vault*.

---

## Kluczowe Pliki

### Wzorce do wydzielenia w skill
```bash
pocs/ninja-sandstorm/v3-feedback-2/storm.html     # najpełniejszy silnik: rig+IK, blending póz, kamera, SLOWMO, audio-cue, SCENES, kontrakt anim
pocs/ninja-sandstorm/v3-feedback-2/check.mjs      # uprząż: fabuła, widzialność (tryby), skan klatka po klatce, arkusze per scena, MP4 z dźwiękiem
pocs/paperclip-vs-pencil/v1-pixel-120s/            # DSL at()/sys(), paleta pixel, uprząż v1
tools/timeline.mjs                                 # TIMELINE.md z animacji (sekunda po sekundzie)
tools/frames.mjs                                   # arkusz klatek: PRZED (git) | PO albo wersja | wersja (--vs)
```

### Pliki referencyjne
```bash
docs/HOW-IT-WORKS.md        # diagramy: proces, silnik, pętla poprawek, asercje; toolset
docs/EDIT-PROTOCOL.md       # format uwag (poziomy, 12 tagów), co robi agent z paczką uwag
docs/toolbox.md             # narzędzia + backlog warsztatowy
docs/ideas-director.md      # koncepcja reżyserki (odtwarzacz + sceny + notatki w bazie artefaktu)
pocs/GLOSSARY.md            # słowniczek
pocs/*/BRIEF.md, pocs/*/*/POSTMORTEM.md, pocs/*/*/CHANGES.md   # briefy, postmortemy, rundy feedbacku
```

---

## Dane Przykładowe / Screenshoty
- Ninja v3 (wzorzec): https://claude.ai/code/artifact/b3b82263-0c8a-4856-b229-96069f5e3bd9 (v1: https://claude.ai/code/artifact/5dfacc58-2d7a-40aa-a5ae-83c6f9d9ee73, v2: https://claude.ai/code/artifact/42976001-7f2b-4178-963c-e159ff2bd672)
- Paper Cuts v1: https://claude.ai/code/artifact/7d5a22e9-28d4-4f72-a1e0-b7b8db8180a0
- Clip Fighter v1/v2: https://claude.ai/code/artifact/672d6377-e1c6-408c-8b70-f494e1560ff6 · https://claude.ai/code/artifact/c7b43edd-a1ff-49a2-b674-86631529a9f1
- Środowisko: Node v22 (nvm), `puppeteer-core` (repo), Chrome headless shell z `~/.cache/puppeteer` (autodetekcja), ffmpeg 8.0.1, macOS `say`. Push do repo kontem `drswobodziczka` (aktywne bywa konto służbowe).
