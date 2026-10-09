# v7.5: szczegóły rundy (postmortem)

> 2026-10-09. Krótki widok zmian: [`CHANGES.md`](CHANGES.md).

## Jak
- **`windAudio(X, t0, t1, at0)`** planuje dźwięk wiatru dla odcinka filmu: szum (pętla) → filtr dolnoprzepustowy → wzmocnienie; równolegle wąski filtr pasmowy → świst. Co 0,05 s punkty automatyki z `windGust(t)` (ta sama funkcja co obraz): głośność `base + gust·e`, filtr 600 → 1600 Hz, świst `∝ e²`. Podmuchy areny: osobne źródła z obwiednią `sin²` i przemiataniem filtra 450 → 2150 Hz, harmonogram identyczny jak obraz (`gustAt(4.2, 1.8, 3)`).
- **Na żywo:** wiatr startuje razem z muzyką w `syncMusic` (od sekundy T) i zatrzymuje się w `stopMusic` (przewijanie, pauza, rozjazd > 0,15 s). Stary sygnał `wind` (stały szum) wyłączony.
- **Do MP4:** `renderAudio` planuje wiatr na cały film.
- **Ścieżki osobno (`renderAudio(rate, { stem })`):** `wind` / `music` / `vo` / `sfx`, żeby zmierzyć miks bez słuchu; narzędzie [`tools/stems.mjs`](../../../tools/stems.mjs).

## Strojenie (3 iteracje na pomiarze)
| Próba | spokój (wiatr / muzyka) | podmuch | walka 15–21 s |
|---|---|---|---|
| 1 (`base 0,55`, `gust 0,75`) | −28,8 / −23,5 | −17,8 / −23,8 (**6 dB nad muzyką**) | −20,9 / −25,2 |
| 2 (`0,32`, `0,36`) | −33,5 / −23,5 | −23,4 / −23,8 | −26,4 / −25,2 |
| 3 (`0,32`, `0,2`, swoosh 0,17) | −33,5 / −23,5 | −25,6 / −23,8 | −28,3 / −25,2 |

## Lekcje
- Pierwsze ustawienie „na oko” dało wiatr głośniejszy od muzyki: **poziomy zawsze mierzyć na ścieżkach osobno**, w oknach spokoju, akcji i kwestii lektora.
- `ffmpeg volumedetect` pisze na stderr także przy sukcesie (drugi raz ten sam błąd w skrypcie): `spawnSync(...).stderr`.
