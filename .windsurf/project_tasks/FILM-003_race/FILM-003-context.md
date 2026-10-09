# FILM-003: Kontekst

> **Rola:** Żywy Brief. Zakres biznesowy, wymagania, kluczowe pliki, dane referencyjne.

## Opis Zadania
Wyścig 20 s dwóch pojazdów po trasie z zakrętami. Czysty test silnika na innym gatunku: kamera w ruchu, prędkość, wyprzedzanie, bez riga postaci.

Źródło: propozycja agenta zaakceptowana przez usera 2026-10-09 („wszystkie trzy tematy są super”), handoff do osobnych zadań.

## Co nowego sprawdza (względem ninja)
- kamera śledząca w ruchu (panorama, najazd na wyprzedzanie)
- wrażenie prędkości (rozmycie, linie pędu, paralaksa trasy)
- fizyka pojazdów (zakręty, poślizg) jako scenariusz z wynikami
- dźwięk silników i przelotów (efekty)

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
