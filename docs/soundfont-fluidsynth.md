# MIDI, soundfont, fluidsynth: muzyka z prawdziwych próbek instrumentów

> Samouczek z 2026-10-07 (ninja v6). Po co nam to: muzyka w v1–v5 była składana z gołych oscylatorów Web Audio (sinus, piła, szum), więc każdy „instrument” brzmiał jak syntezator. Soundfont daje nagrane instrumenty, a partytura dalej jest kodem.

## 1. Trzy pojęcia
| Pojęcie | Co to jest | Analogia |
|---|---|---|
| **MIDI** (`.mid`) | zapis **nut**, nie dźwięku: kanał/instrument, wysokość, moment, siła uderzenia (velocity), długość. Plik waży kilka kB i sam nie brzmi | partytura albo rolka pianoli |
| **Soundfont** (`.sf2`) | bank **nagranych próbek** instrumentów (często kilka próbek na instrument, dla różnych wysokości i sił) + reguły odtwarzania (obwiednia, pętla, filtr) | orkiestra w pudełku |
| **fluidsynth** | program, który **gra** plik MIDI próbkami z soundfontu i zapisuje wynik do WAV (albo gra na żywo) | muzycy czytający partyturę |

Standard **General MIDI (GM)** numeruje 128 instrumentów (0–127) i zestaw perkusji na kanale 10, więc dowolny soundfont GM zagra ten sam plik MIDI. Dla kung-fu przydają się: Koto 107 (zamiast guzhenga), Shamisen 106, Shakuhachi 77, Flute 73 (zamiast dizi), Taiko 116, Melodic Tom 117, Tremolo Strings 44, Orchestra Hit 55, a w perkusji Chinese Cymbal 52 i Wood Block 76/77. Brakuje erhu i prawdziwego gongu.

## 2. Do czego to mi (agentowi) służy
1. **Partytura jako kod.** Piszę muzykę w JS (`music/score.mjs`), czyli deterministycznie, z wersjonowaniem w git i z czasami wziętymi wprost ze scenariusza (tabela scen, `events.json`). Zmiana sceny = przeliczenie muzyki, bez ręcznej edycji audio.
2. **Prawdziwe barwy bez sieci i opłat.** Soundfont leży lokalnie (poza repo), render trwa sekundy, bez klucza API.
3. **Adaptacyjność zostaje.** Akcenty (parowanie, rzut, K.O., serce) i nastrój scen (groove / napięcie / cisza) są w partyturze, bo partytura czyta te same czasy co animacja.
4. **Weryfikacja bez słuchu.** Model nie słyszy, ale może sprawdzić MIDI (liczba nut, kanały, czasy), a na WAV: głośność (`volumedetect`, `loudnorm`), spektrogram (`showspectrumpic` → PNG do obejrzenia), obecność pasm (talerze w górze, taiko w dole).

## 3. Instalacja (jednorazowo)
```bash
brew install fluid-synth
mkdir -p ~/.cache/soundfonts
# pobierz GeneralUser-GS.sf2 ze strony projektu (link niżej) do ~/.cache/soundfonts/
```
- **GeneralUser GS** (S. Christian Collins): ~30 MB, darmowy, zgodny z GM/GS, dobra jakość jak na rozmiar. Licencja (v2.0, `documentation/LICENSE.txt` w repo projektu) pozwala używać go bez ograniczeń w muzyce, także komercyjnie. Autor prosi, by strony **nie linkowały bezpośrednio do pliku**, tylko do strony projektu, więc tak robimy. Soundfontu **nie wrzucamy do repo** (rozmiar); w repo jest tylko wynikowy `music.mp3` osadzony w HTML.
- Alternatywa: FluidR3_GM (~140 MB).

## 4. Użycie
**W repo używamy renderera w JS** (`spessasynth_core`, npm): ten sam soundfont i MIDI, bez kompilacji. Homebrew 2026-10 nie miał gotowych paczek `fluid-synth` 2.6.1 i budował go ze źródeł przez ponad 15 minut.
```bash
node music/score.mjs                     # partytura (kod) -> music/score.mid
node music/render.mjs                    # score.mid + GeneralUser GS -> music.wav (60 s w ~3 s)
ffmpeg -i music/music.wav -af loudnorm=I=-18:TP=-1.5 -ac 1 -b:a 96k music/music.mp3
node embed.mjs                           # vo/*.mp3 + music.mp3 -> storm.html
```
To samo przez fluidsynth (gdy jest zainstalowany):
```bash
fluidsynth -ni -g 0.5 -r 44100 -F music/music.wav ~/.cache/soundfonts/GeneralUser-GS.sf2 music/score.mid
ffmpeg -i music/music.wav -af loudnorm=I=-18 -ac 1 -b:a 96k music/music.mp3
```
- `-ni`: bez interaktywnej powłoki i bez wejścia MIDI z urządzeń · `-F plik.wav`: render do pliku zamiast na głośniki · `-g`: głośność syntezatora (za wysoka = przester) · `-r`: częstotliwość próbkowania.
- Lista instrumentów w soundfoncie: `echo "inst 1" | fluidsynth -n ~/.cache/soundfonts/GeneralUser-GS.sf2`.

## 5. Ograniczenia
- Brzmienie zależy od soundfontu: GM to „instrumenty ogólne”, nie biblioteka filmowa. Erhu, guzheng i gong trzeba udawać (koto, chińskie talerze, taiko) albo dosyntetyzować.
- Gotowy plik audio gra „od sekundy X”, więc odtwarzacz musi go synchronizować z czasem animacji (start z przesunięciem, restart przy przewijaniu).
- Barwę i miks ocenia człowiek.

## Źródła
- [FluidSynth](https://www.fluidsynth.org/) · [GeneralUser GS](https://github.com/mrbumpy409/GeneralUser-GS) · [General MIDI: lista instrumentów (Wikipedia)](https://en.wikipedia.org/wiki/General_MIDI)
