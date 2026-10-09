# CHAN-001: Kontekst

> **Rola:** Żywy Brief. Zakres biznesowy, wymagania, kluczowe pliki, dane referencyjne.

## Opis Zadania
Kanał (najpewniej YouTube) z krótkimi animacjami o AI safety, AI security, wpływie AI na społeczeństwo (dobre i złe strony) oraz AI/tech for good. Cel: szerzyć świadomość formą bardziej nośną niż blog. Silnikiem produkcji ma być generyczny skill do filmów z ANIM-001, a to zadanie nadaje sens całemu poligonowi.

Źródło: pomysł usera z 2026-10-09 ([`BACKLOG.md`](../../../BACKLOG.md) B10).

## Wymagania
- Każda teza ze źródłem; wyraźne rozróżnienie fakt / prognoza / opinia.
- Film jako nośnik, tekst (opis lub wpis) ze źródłami jako „przypisy”.
- Format pionowy 9:16 (Shorts) + napisy.
- Stałe postacie i styl jako marka kanału.
- Oznaczenie treści generowanych przez AI (wymóg YouTube).
- Regularność ważniejsza od perfekcji pojedynczego odcinka.

## Ocena agenta (2026-10-09)
- **Animacja vs tekst:** animacja lepiej się niesie i pokazuje mechanizmy; tekst buduje wiarygodność i jest cytowalny. Najlepiej oba.
- **Wzorce:** Rational Animations, Robert Miles (AI safety), Kurzgesagt, CGP Grey, 3Blue1Brown (animacje kodem przez Manim, najbliżej naszego podejścia).
- **Co już mamy:** determinizm i wersjonowanie (poprawka faktu = nowa wersja), postacie i styl, lektor ElevenLabs, walidacja klatka po klatce.
- **Czego brakuje:** warstwy faktów (źródła per scena, fact-check), 9:16, napisów, szablonu wyjaśniacza (diagram, metafora, postać-narrator).

---

## Kluczowe Pliki

### Pliki referencyjne
```bash
BACKLOG.md                                     # B10 + sekcja „B10: notatki”
.windsurf/project_tasks/ANIM-001_animation_skill/  # skill = silnik produkcji
.windsurf/project_tasks/PLAY-001_animation_poc_lab/ # PoC-e (dostarczają wzorców)
pocs/ninja-sandstorm/                          # najpełniejszy wzorzec silnika, postacie
docs/elevenlabs.md                             # lektor
kit/templates/BRIEF.md                         # szablon briefu (do rozszerzenia o źródła)
```
