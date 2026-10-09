# PLAY-001.2: Kontekst

> **Rola:** Żywy Brief. Zakres biznesowy, wymagania, kluczowe pliki, dane referencyjne.

## Opis Zadania
Komedia 20–25 s o prompt injection: robot-kamerdyner dostaje list z ukrytym poleceniem i grzecznie wynosi sejf złodziejowi. Gag pokazujący mechanizm ataku bez żargonu; pasuje do celu kanału (CHAN-001).

Źródło: propozycja agenta zaakceptowana przez usera 2026-10-09 („wszystkie trzy tematy są super”), handoff do osobnych zadań.

## Co nowego sprawdza (względem ninja)
- mimika i „myślenie” robota (np. dymek, wizjer)
- rekwizyty i interakcja z obiektami (list, sejf, drzwi)
- komedia: timing gagu, reakcje
- czytelne pokazanie ukrytej instrukcji w liście

## Wymagania
- Proces z `CLAUDE.md`: pytania → BRIEF (z szablonu, z planem testów) → akceptacja → kod; runda feedbacku = nowa wersja.
- Deterministyczny HTML, artefakt per wersja, MP4 z dźwiękiem, TIMELINE v2 (`scenes.json`).
- Budowa na `kit/` i rozwijanie kitu przy okazji (Decision #5 ANIM-001).

## Kluczowe Pliki
```bash
kit/templates/BRIEF.md     # szablon briefu
kit/harness/harness.mjs    # uprząż
tools/                     # timeline, frames, strip, stems
docs/LESSONS.md            # fiszki z lekcjami
```
