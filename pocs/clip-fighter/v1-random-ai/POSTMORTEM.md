# Postmortem: Clip Fighter v1 (losowe AI)

> Sesja 2026-10-01, ok. 23:19–23:31 CEST (czasy z dat modyfikacji plików, nie z pomiaru narzędzi).
> Artefakt: https://claude.ai/code/artifact/672d6377-e1c6-408c-8b70-f494e1560ff6

## TL;DR
Prompt brzmiał: „animacja dwóch spinaczy walczących w stylu starych konsolowych bijatyk, czerń i biel”. W ~12 min powstał jeden plik HTML (~770 linii) z bijatyką CPU vs CPU: losowe AI, mecz do dwóch wygranych rund, 1-bitowy dithering. **Wersja nie była testowana przed zmianą wymagań** i nie pasowała do późniejszego „10 s”.

## Co powstało
- **Technika:** HTML + CSS + czysty JS, Canvas 2D, bez bibliotek, sprite’ów i obrazków.
- **Postacie (proceduralnie):** spinacz to 4 odcinki i 3 łuki, kończyny to łamane z „łokciem”. GEM to czarny drut, OWL biały w czarnym obrysie.
- **Render:** klatka w szarościach na ukrytym canvasie, potem dithering Bayera 4×4 do czystej czerni i bieli.
- **Scena:** biurko (kubek z ołówkami, zszywacz), podłoga to linijka (4 px = 1 mm).
- **Gameplay:** stany idle/walk/punch/kick/jump/block/special/hit/ko/win. Zszywka jako pocisk, hitstop, trzęsienie ekranu, slow-mo przy K.O., paski HP z opóźnionym spadkiem, licznik czasu, „INSERT COIN”.
- **AI:** ważone losowanie akcji zależnie od dystansu i zagrożenia. GEM ma przewagę prostych, OWL kopnięć i zszywek.

## Narzędzia
| # | Narzędzie | Po co | Czas |
|---|---|---|---|
| 1 | `Skill: artifact-design` | zasady projektowania artefaktu | sekundy |
| 2 | `Write` | cały plik v1 | ~12 min (generowanie kodu) |

Web: nieużywany. Testów w tej fazie nie było.

## Problemy
1. **Nie zapytałem o czas trwania ani tryb.** Losowa walka trwa ile chce (mecz to ~30–60 s), a potem przyszło „10 s”, więc logikę trzeba było przepisać (→ v2).
2. **Niedeterministyczna:** `Math.random()` w AI, zmienny krok (`dt` z `requestAnimationFrame`). Nie da się przewinąć do konkretnej chwili ani powtórzyć klatki, więc trudno to testować.
3. **Brak hooków testowych** (`seek`, `state`).
4. **Wersja została nadpisana** przy przejściu na v2 (podmiana w tym samym pliku). Odtworzyłem ją później 1:1 z kontekstu rozmowy. Jedyna zmiana to `<title>`.
5. **Nakładka „PAUSE” rysowana na canvasie.** W v2 okazała się przeszkodą w testach.

## Weryfikacja (wykonana później, przy odtwarzaniu)
5 s na żywo w headless Chrome (puppeteer-core): 0 błędów, zrzut `v1-at-5s.png`.

## Lekcje
- Najpierw pytania o **czas, tryb i cel** (pętla do pokazania, losowa gra, interakcja), potem kod.
- Każda wersja to **osobny plik**.
- Od pierwszej wersji: stały krok symulacji i hooki `seek/state`.
