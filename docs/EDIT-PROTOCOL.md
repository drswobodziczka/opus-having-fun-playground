# Protokół szybkich poprawek (time-coded notes)

> Cel: dajesz **sekundę + co zmienić**, ja zmieniam, sprawdzam i pokazuję **przed / po**. Bez opisywania kontekstu.

## 1. Jak zgłaszać
Jedna linia = jedna zmiana. Czas w sekundach filmu (z suwaka albo z [TIMELINE](../pocs/)).

```
@41.2 rzut wyżej i wolniej
@12-15 kamera bliżej twarzy
@33.5 [dźwięk] cios głośniejszy
@50 [efekty] więcej krwi
S7 [montaż] wyciąć
E087 usuń
@0-3 [tekst] tytuł większy
```

- `@41.2`: konkretny moment. `@12-15`: zakres.
- `E087`: ID zdarzenia ze scenariusza (kolumna „Scenariusz” w `TIMELINE.md`). Najbardziej precyzyjne, ale niewymagane.
- Opcjonalne tagi (można kilka naraz, np. `@40.5 [ruch][kamera] …`). Bez tagu sam ocenię, czego dotyczy, a w razie wątpliwości dopytam:

| Tag | Czego dotyczy | Gdzie w silniku |
|---|---|---|
| `[fabuła]` | kto co robi, wynik, kolejność zwrotów | scenariusz |
| `[ruch]` | pozy, płynność, siła ciosu, fizyka | symulacja, rig |
| `[postać]` | sylwetka, strój, twarz, mimika | render (postacie) |
| `[kamera]` | kadr, zoom, obrót, co jest w ujęciu | kamera |
| `[tło]` | scenografia, pogoda, paralaksa | render (tło) |
| `[efekty]` | krew, iskry, piasek, błyskawice, przejścia | render (efekty), cząsteczki |
| `[styl]` | paleta, kreska, nastrój całości | render (style) |
| `[tekst]` | napisy, HUD, banery | render (HUD) |
| `[dźwięk]` | muzyka, efekty, lektor, głośność, synchronizacja | kolejka audio |
| `[tempo]` | długość, rytm, za szybko / za wolno | scenariusz (czasy) |
| `[montaż]` | kolejność scen, cięcia, przejścia | scenariusz (sceny) |
| `[bug]` | coś jest ewidentnie zepsute | dowolne |
- Możesz wkleić kilka linii naraz (paczka). Zrobię je w jednym przebiegu.
- Kanał: **czat**. Forma może być luźna, ja ją znormalizuję i dopytam ponumerowanymi pytaniami. (`FEEDBACK.md` wycofany jako nieefektywny. Docelowo: [reżyserka](ideas-director.md).)
- Sekundę i scenę widać w lewym dolnym rogu kadru (`S10 · 40.5 s · ZWROT 3: rzut`), przełącznik: klawisz `T`.
- Poziomy: `[film] …` (cały film), `S6 …` (scena z tabeli w BRIEF), `@41.2 …` (sekunda).

## 2. Co robię z każdą paczką
1. **Lokalizuję:** czas → wiersz w `TIMELINE.md` → zdarzenia scenariusza (ID) i kod rysowania.
2. **Zmieniam:** scenariusz (czasy, parametry, wyniki), ujęcia kamery, pozy, dźwięk albo styl.
3. **Sprawdzam:** `node check.mjs`. Asercje muszą przejść. Jeśli zmiana celowo przesuwa zwrot akcji, aktualizuję też okno asercji i mówię o tym.
4. **Pokazuję:** `node tools/frames.mjs <anim.html> 41.2 12.5 … --before=HEAD`, czyli arkusz **PRZED | PO** dla każdej zgłoszonej sekundy.
5. **Aktualizuję:** `TIMELINE.md` (generator), artefakt pod **tym samym linkiem**, MP4 na życzenie (`check.mjs --mp4`).
6. **Commituję:** `fix(<poc>): @41.2 rzut wyżej; @12-15 kamera bliżej`.

**Odpowiedź od mnie:** lista „zgłoszenie → co zmieniłem (ID/plik)”, wynik asercji, arkusz PRZED/PO.

## 3. Kiedy nowa wersja (vN+1), a kiedy poprawka w miejscu
- **Poprawka w miejscu:** czasy, kamera, pojedyncze ruchy, dźwięk, kolory, teksty.
- **Nowy katalog `vN+1`:** zmiana stylu całości, nowa fabuła lub struktura scen, zmiana techniki (np. WebGL). Wtedy najpierw krótki brief.

## 4. Narzędzia
| Narzędzie | Co robi |
|---|---|
| `node tools/timeline.mjs <anim.html> [tytuł]` | generuje `TIMELINE.md`: sekunda po sekundzie scena, kamera, scenariusz (ID), wynik, HP |
| `node tools/frames.mjs <anim.html> <t…> [--before=REF]` | arkusz klatek w podanych sekundach, opcjonalnie PRZED (z gita) obok PO |
| `node <poc>/check.mjs [--mp4]` | asercje, trace, arkusze, MP4 |

Kontrakt animacji (wymagany przez narzędzia): `window.anim = { duration, seek(t), state(), events(), script() }`.
