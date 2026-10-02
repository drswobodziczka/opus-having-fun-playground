# Postmortem: The Storm Chose Black, v1 (tusz → piksel, 60 s)

> Sesja 2026-10-02, ok. 01:45–02:11 CEST. Czasy pochodzą z dat modyfikacji plików, nie z pomiaru każdego narzędzia.
> Artefakt: https://claude.ai/code/artifact/5dfacc58-2d7a-40aa-a5ae-83c6f9d9ee73 · brief: [`../BRIEF.md`](../BRIEF.md)

## TL;DR
To trzecia produkcja i druga przez bramki preprodukcji. Od zatwierdzenia decyzji do gotowego MP4 z dźwiękiem minęło **~10 minut**. **32/32 asercji** przeszło po dwóch poprawkach kamery. Nowe w tej wersji:
- **asercje widzialności**, które od razu złapały 3 problemy kadru;
- **MP4 z pełnym dźwiękiem** z renderu offline w przeglądarce;
- **lektor z pliku** (`say` + ffmpeg) zamiast `speechSynthesis`;
- **szkielet z IK**, dzięki któremu chwyty i rzuty mają widoczny kontakt.

## Oś czasu
| Kiedy | Co | Ile |
|---|---|---|
| 01:45 | próbki lektora (3 głosy × obróbka ffmpeg) + wyszukanie cen TTS | ~1 min |
| → 02:00:55 | odpowiedzi usera → planowanie (scenariusz, rig, kamera, audio) → zapis decyzji w BRIEF | do ~15 min, głównie myślenie przed pierwszym narzędziem |
| 02:01:01 | 13 kwestii lektora: `say -v Daniel` → ffmpeg (pitch −26%, kompresja, echo) → mp3 | ~5 s |
| ~02:01–02:07 | `Write`: `storm.html` (1261 linii) | ~6 min |
| ~02:07 | osadzenie lektora (base64, 217 KB), test składni, `Write`: `check.mjs` (uprząż v2) | <1 min |
| ~02:08 | 1. przebieg: 29/32. Fabuła OK, **3 × widzialność FAIL** | 9,7 s |
| ~02:09 | poprawki kamery i asercji → 32/32 | 6 s |
| ~02:09 | `Read`: arkusz zwrotów → 2 poprawki (napis na słońcu, cienkie kończyny w pikselu) | sekundy |
| ~02:10 | MP4 z dźwiękiem + pomiar głośności (ffmpeg `volumedetect`, RMS per sekunda) | 25 s + 5 s |
| ~02:10 | `Read`: arkusz fabuły → kanciasta plama tuszu → poprawka → ponowny MP4 | ~1 min |
| 02:11 | publikacja artefaktu | sekundy |

## Narzędzia
| # | Narzędzie | Po co |
|---|---|---|
| 1 | `WebSearch` ×2 | ceny chmurowego TTS (backlog) |
| 2 | `Bash`: `say` + **ffmpeg** | lektor: synteza, obniżenie, kompresja, echo, mp3 |
| 3 | `Write` | animacja, uprząż v2 |
| 4 | `Bash` + python | osadzenie mp3 jako base64, chirurgiczne poprawki |
| 5 | `Bash` + node (puppeteer-core) | asercje, trace, arkusze, render klatek, **render audio offline** |
| 6 | `Bash` + ffmpeg/ffprobe | sklejenie MP4 (wideo + WAV), **pomiar głośności** |
| 7 | `Read` (PNG) ×2 | arkusz zwrotów, arkusz fabuły |
| 8 | `Artifact` | publikacja |

## Co zbudowano (nowe względem PoC #2)
- **Rig szkieletowy:** 10 kości z FK i pozami kluczowymi (31 póz). **IK 2-kościowe** przykleja dłonie do szyi, pasa, klatki albo pięści przeciwnika (`gripF/gripB`).
- **Automatyczny zasięg ciosu:** atakujący dosuwa się do realnego zasięgu przed trafieniem (lekcja P4 z PoC #2).
- **Kamera z ujęciami:** śledzenie + 5 ujęć z płynnym wejściem i wyjściem. Najazd 1,8× (duszenie), odjazd 1,45→0,72× (monsun), obrót do 100° za łukiem rzutu z szybkim powrotem, najazd 2× z obrotem 20° (serce), odjazd końcowy.
- **Dwa style w jednym silniku:** pędzel z „boil” (krawędzie drgają co 0,1 s jak w ręcznej animacji) kontra piksel z obrysem i blikiem. Przejście: ściana piasku → plama tuszu.
- **Audio oparte na kolejce sygnałów:** symulacja emituje sygnały (`sfx`, `mus`, `vo`, `wind`). Na żywo grają od razu, a do MP4 ta sama kolejka renderuje się w `OfflineAudioContext`, potem WAV → ffmpeg. **Jedno źródło prawdy dla obrazu i dźwięku.**

## Problemy (prosto)
### P1: trzy zwroty „niewidoczne” mimo poprawnej fabuły
- **Rzut, konsekwencja:** kamera wracała z obrotu sinusoidą przez 1,5 s, więc w chwili lądowania wciąż była przekręcona o ~80° i leżący wypadał poza kadr. **Poprawka:** obrót narasta za lotem, a przy lądowaniu szybko wraca (dwie krzywe).
- **Serce, moment:** najazd 2× z definicji ucina ciała. **Asercja była źle postawiona.** W zbliżeniu sprawdzamy punkty kluczowe (głowy, dłoń z sercem).
- **Serce, konsekwencja:** odjazd za wolny. Skrócony z 3,4 do 2,5 s.
- **Lekcja:** asercje widzialności działają (3 trafienia w pierwszym przebiegu), ale muszą rozróżniać **plan ogólny** od **zbliżenia**.

### P2: czytelność na arkuszu
- Czerwony napis „BLACK MONSOON” na czerwonym słońcu. Dodałem obwódkę w kolorze papieru.
- Kończyny w pikselu wyglądały jak rurki. Pogrubiłem je o 30%.
- Plama tuszu w przejściu była kanciastym wielokątem. Teraz ma 160 punktów krawędzi, dwie oktawy szumu i rozbryzgi.

### P3: dźwięk nadal niesłyszalny dla modelu
Tym razem **zmierzony**: ścieżka ma średnio −26,7 dB, szczyt −3,6 dB (bez przesteru). Najgłośniej jest przy monsunie i uderzeniu rzutu. Na 27–30 s jest cisza ~−45 dB, bo w przejściu po K.O. gra tylko wiatr. Do oceny przez usera: czy ta cisza działa, czy przeszkadza. Barwę, balans i lektora ocenia user.

## Co zadziałało
- **Bramki + lekcje z PoC #2 wpisane w brief:** zero przepisywania, każdy zwrot ma zapowiedź, moment i konsekwencję.
- **Asercje widzialności:** pierwszy automatyczny sygnał o problemach z kamerą, zanim obejrzał to człowiek.
- **Kolejka sygnałów audio:** MP4 z muzyką, efektami i lektorem bez osobnego miksu.
- **Pomiar głośności zamiast słuchu:** tani sposób, żeby model wiedział, że dźwięk w ogóle jest i gdzie.

## Do v2 / backlog
- Gładsza, „malowana” grafika (ad4 z PoC #2) i bogatsze sylwetki w pikselu (cieniowanie mięśni, strój).
- Przejście (a)→(b) mogłoby wynikać z akcji (BISHUKIJ wbija się w ścianę burzy → plama tuszu z jego sylwetki).
- Chmurowy TTS (ElevenLabs / OpenAI) jako porównanie z `say`.
- Asercja „brak nakładania napisów na ważne elementy” (bbox napisów kontra bbox postaci i słońca).

## Pliki
- `storm.html`: animacja (lektor osadzony)
- `check.mjs`: uprząż v2 (`node check.mjs [--mp4] [--fps=30]`)
- `vo/*.mp3`: 13 kwestii lektora (źródło osadzenia)
- `events.json`, `trace.txt`, `sheet-twists.png`, `sheet-story.png`, `phone.png`: wyniki
- `storm.mp4`: generowane lokalnie, **poza gitem** (~26 MB)
