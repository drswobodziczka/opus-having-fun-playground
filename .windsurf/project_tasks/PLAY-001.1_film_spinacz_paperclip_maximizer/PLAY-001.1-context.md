# PLAY-001.1: Kontekst

> **Rola:** Żywy Brief. Zakres biznesowy, wymagania, kluczowe pliki, dane referencyjne.

## Opis Zadania
Bajka 25–30 s o maksymalizatorze spinaczy (klasyczny eksperyment myślowy AI safety): fabryka zaczyna od jednego spinacza, a kończy, zamieniając świat w spinacze. Inny gatunek niż bijatyka (bajka/wyjaśniacz z narratorem), nawiązanie do PoC #2 (Paper Cuts) i do celu kanału (CHAN-001).

Źródło: propozycja agenta zaakceptowana przez usera 2026-10-09 („wszystkie trzy tematy są super”), handoff do osobnych zadań.

## Co nowego sprawdza (względem ninja)
- tłum obiektów (setki/tysiące spinaczy), wzrost wykładniczy jako obraz
- narrator (lektor ElevenLabs) prowadzący historię zamiast okrzyków
- przemiana świata (zamiana obiektów w spinacze)
- ton: bajka z przymrużeniem oka, bez doomerstwa

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
