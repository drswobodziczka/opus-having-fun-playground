# v7.2: szczegóły rundy (postmortem)

> 2026-10-09. Krótki widok zmian: [`CHANGES.md`](CHANGES.md).

## Jak
- **Śmiech:** `sys(25.95, 'cue', { name: 'vo', arg: 'haha' })`. Start po zakończeniu „K.O.” (24,5 s + 1,4 s), żeby kwestie się nie nakładały; plik `haha` z v7 (bez nowych kredytów).
- **Stopy:** rysowane w `drawFighter` (rig i stawy bez zmian, więc asercje i skan klatek nadal ważne). Kierunek: prostopadle do łydki, czubkiem w stronę patrzenia; im bardziej pozioma łydka (kopnięcie, leżenie), tym bardziej stopa idzie wzdłuż niej (czubek wyprostowany). Na ziemi czubek nie schodzi pod piasek. Pierwsza próba (długość 1,55 × grubość łydki) wyglądała jak kikut, finalnie 2,3×.
- **Świat:** `mesaLayer` (paralaksa 0,1, dzień i noc), `dustWalls` (3 ściany pyłu, gradienty radialne przesuwane z czasem), `duneLife` (zwiewany piasek z grzbietów: `duneLayer` zwraca teraz funkcję wysokości `yAt`; 2 wiry z elips), `tumbleweeds` (3 kłęby w świecie areny, za postaciami). Wszystko jest funkcją `T` i `hash`, więc deterministyczne. Dzienne płaskowyże za jasne w pierwszej próbie, przyciemnione.
- **Uprząż:** pierwsza wersja filmu na `kit/harness` (`check.mjs` = dawne `check-kit.mjs` z v7).

## Lekcje
- Element rysowany bez zmiany riga to tania poprawka: uprząż nic nie musi wiedzieć, ale **asercje nie widzą** stopy. Sprawdzenie tylko wzrokiem (powiększenia w 3×).
- Drobna wersja (v7.2) dobrze pasuje do poprawek bez zmiany fabuły ([BACKLOG B9](../../../BACKLOG.md)).
