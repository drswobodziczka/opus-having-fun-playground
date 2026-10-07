# v6 (feedback 5): zmiany względem v5

> Runda 2026-10-07. Artefakt v6: https://claude.ai/code/artifact/d33f1513-81fc-42a0-87b0-9215922a3fe4 · v5: https://claude.ai/code/artifact/c62a9c64-1114-4cef-9c01-d2480995bd54
> Obraz bez zmian (zdarzenia identyczne z v5, 110/110), więc bez `compare-v5-v6.png`. Rozpiska: [`TIMELINE.md`](TIMELINE.md)

| # | Uwaga usera | Zmiana | Status |
|---|---|---|---|
| 1 | lektor: głos **Harry** z ElevenLabs, model **v3** (wybór z `voice-samples/el-Harry-v3-REEL.mp3`) | 13 kwestii (`vo/`), `eleven_v3`, tagi `[shouting]` / `[deep voice]`, seed 7; każda kwestia sprawdzona transkrypcją (Scribe), przycięta cisza z przodu, `loudnorm` do jednego poziomu. Wpis `heart` (nieużywany od v1) usunięty | ✅ (słowa sprawdzone, barwa nieodsłuchana) |
| 2 | śmiech dłuższy, szalony („hahahahhahaha!”) | 44,0 s: nowy **`cackle`** 4,6 s (`[laughs maniacally]`), ciągnie się przez kombinację teleportów i kończy przed FINISH HIM (49,3 s). 21,3 s: krótki `haha` przycięty do 1,2 s, żeby nie wchodził na BLACK MONSOON (22,55 s) | ✅ |
| 3 | muzyka „prawie jak v1”; chcę **energicznej muzyki kung-fu** (talerze, flety, harfy); wybór: opcja 1 (soundfont) | partytura jako kod [`music/score.mjs`](music/score.mjs) → MIDI → **soundfont GeneralUser GS** → [`music/render.mjs`](music/render.mjs) (spessasynth_core, czysty JS) → `music/music.mp3` osadzone w HTML. 150 BPM, E-moll pentatonika: koto (guzheng), flet (dizi: frazy pytanie/odpowiedź, w napięciu biegi pentatoniczne), shamisen (bas), taiko, woodblocki, chińskie talerze, tremolo smyczków w scenach napięcia, orchestra hit na akcentach. Runda 2 o ton wyżej. Adaptacyjność zostaje w partyturze (tryb wg sceny, akcenty z `events.json`, werbel do serca, cisza po K.O. z samotnym shakuhachi) | ✅ (spektrogram i głośność sprawdzone, nieodsłuchane) |
| — | (narzędzia) fluidsynth z Homebrew kompilował się ze źródeł (formuła 2.6.1 bez paczek binarnych) | zamiast niego syntezator SF2 w JS (`spessasynth_core`, devDependency): 60 s w 2,7 s | ✅ |

## Silnik
- Muzyka z oscylatorów (v5: `musicStep`, `musicStinger`, `taiko`, `gong`…) usunięta. Ścieżka `MUSIC` gra **na żywo od sekundy T** (`syncMusic`: start z przesunięciem, restart przy przewijaniu, pauzie i rozjeździe > 0,15 s), a w MP4 od zera pod wszystkim. Efekty (ciosy, wiatr, pioruny) bez zmian.
- `node embed.mjs` wkleja `vo/*.mp3` i `music/music.mp3` do `storm.html`.

## Weryfikacja
- Uprząż **40/40**, skan klatka po klatce bez zmian względem v5.
- Muzyka: spektrogram potwierdza strukturę (walka 4,3–24 s i 32–50 s, cisza 25–30 s, werbel 50–51 s, ciemna cisza 52–56 s, zwycięstwo od 56,6 s), widoczne linie melodii fletu i talerze w górze pasma. MP4: średnio −21,5 dB, szczyt −2,6 dB.
- **Nie sprawdziłem:** brzmienia, miksu (czy lektor przebija się przez muzykę), synchronizacji muzyki na żywo w przeglądarce.
