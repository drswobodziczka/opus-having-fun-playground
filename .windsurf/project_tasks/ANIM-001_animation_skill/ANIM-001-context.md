# ANIM-001: Kontekst

> **Rola:** Żywy Brief. Zakres biznesowy, wymagania, kluczowe pliki, dane referencyjne.

## Opis Zadania
Wydewelopować **skill do tworzenia animacji kodem**: użytkownik podaje temat, styl i czas, a agent dobiera narzędzia, pisze scenariusz, buduje animację, weryfikuje ją headless i publikuje jako artefakt. Poligonem są bijatyki: od Clip Fightera (spinacze, 1-bit) do bijatyki **spinacz vs ołówek** w stylistyce uniwersum Raymana.

## Wymagania
- **Wejście skilla:** temat, styl wizualny, czas trwania, tryb (pętla scenariusza / losowe AI / interaktywnie), opcjonalnie dźwięk.
- **Wyjście:** samowystarczalny HTML (Canvas/JS) jako artefakt Claude + raport z weryfikacji.
- **Determinizm:** stały krok symulacji, scenariusz z czasami, `seek(t)` / `state()` / `?t=`.
- **Weryfikacja headless:** uprząż (puppeteer-core) z trace’em, logiem zdarzeń, asercjami i arkuszem klatek. Opcjonalnie eksport MP4/GIF przez ffmpeg.
- **v3 (spinacz vs ołówek):** stylistyka Raymana (miękkie, „gumowe” kształty, latające dłonie i stopy bez kończyn, żywe kolory, malowane tła), grafika à la SSF2T (HUD, portrety, sprite’owa czytelność), dużo zwrotów akcji, ~2 obroty kamery.
- **Na koniec:** przenieść dokumentację zadania do sejfu Obsidian *Gamedev Universe Vault*.

---

## Kluczowe Pliki

### Pliki implementacji
```bash
pocs/clip-fighter/v1-random-ai/clip-fighter-v1.html   # v1: losowe AI, mecz do 2 wygranych, 1-bit
pocs/clip-fighter/v2-scripted-10s/clip-fighter.html   # v2: scenariusz 10 s, stały krok, seek/state, suwak
pocs/clip-fighter/v2-scripted-10s/check.mjs           # uprząż v0: trace + arkusz klatek + błędy konsoli (puppeteer-core)
```

### Pliki referencyjne
```bash
pocs/clip-fighter/v*/POSTMORTEM.md      # postmortemy v1 i v2
docs/toolbox.md                         # narzędzia + backlog warsztatowy
pocs/clip-fighter/v2-scripted-10s/trace.txt           # przykładowy trace liczbowy
pocs/clip-fighter/v2-scripted-10s/sheet.png           # przykładowy arkusz klatek
```

---

## Dane Przykładowe / Screenshoty
- Artefakt v1: https://claude.ai/code/artifact/672d6377-e1c6-408c-8b70-f494e1560ff6
- Artefakt v2: https://claude.ai/code/artifact/c7b43edd-a1ff-49a2-b674-86631529a9f1
- Środowisko: Node v22.14 (nvm), Chrome headless shell v131 w `~/.cache/puppeteer`, `puppeteer-core` instalowany w katalogu roboczym. ffmpeg 8.0.1 (Homebrew).
