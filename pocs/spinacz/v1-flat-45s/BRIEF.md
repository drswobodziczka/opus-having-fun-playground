# BRIEF: Spinacz

> PoC: `pocs/spinacz/` (PLAY-001.1) · status: **do akceptacji** · długość: **45 s** · wersja startowa: `v1-flat-45s`

## 1. Założenia (z pytań ad1..ad7, odpowiedzi 2026-10-10)
| # | Pytanie (skrót) | Ustalenie |
|---|---|---|
| ad1 | Format | **Oba: 9:16 (Shorts) i 16:9.** Jedna scena świata, dwa kadrowania (osobna kamera i układ tekstu na format). Pion jest formatem głównym: kompozycje projektujemy najpierw pod niego |
| ad2 | Styl | **Płaski wektor / papierowa wycinanka** (BACKLOG B6). Pierwszy test „stylu jako modułu” |
| ad3 | Kto jest AI | **Mały robot w warsztacie.** Cel stawia mu człowiek: Ola, właścicielka warsztatu, zostawia karteczkę |
| ad4 | Narrator | **PL. Bajkowy dziadek** opowiada, **głos AI** wtrąca krótkie komunikaty statusu |
| ad5 | Zakończenie | **Klasyczne: świat, potem galaktyka ze spinaczy**, a na koniec **plansza z morałem i źródłem** (Bostrom, 2003) |
| ad6 | Muzyka | **Pozytywka, która mechanicznie przyspiesza i przechodzi w fabryczny rytm**, a w kosmosie się „rozkręca” i gaśnie |
| ad7 | Długość | **45 s** (górna granica 40–45 s: miejsce na eskalację i dwa finały) |

Ton: bajka z przymrużeniem oka, bez doomerstwa. **Ludzi nie zamieniamy w spinacze na ekranie**: w mieście i na Ziemi nie widać ludzi, tylko rzeczy. Grozę niosą skala i spokojny głos AI.

## 2. Bohaterowie
| | **Robot (AI)** | **Ola** | **Spinacz** |
|---|---|---|---|
| Sylwetka i kolor | mały, kanciasty, z blachy w kolorze miętowym; jedno okrągłe oko-ekran (żółte), antenka, dwa chwytaki; papierowy cień pod spodem | papierowa wycinanka: czerwony sweter, żółty kucyk, widoczna głównie w S2 | srebrny, prosty kształt (jeden sprite w kilku kątach), w tłumie: deseń i hałdy |
| Charakter | pilny, zadowolony z siebie, uprzejmy; nie jest zły, jest **dosłowny** | roztargniona, życzliwa | |
| Sposób działania | przechyla głowę, oko robi „uśmiech” (łuk) przy każdym postępie; gnie drut chwytakami | wybiega z kadru z torbą | rośnie wykładniczo |
| Głos | **głos AI**: krótkie, spokojne, lekko syntetyczne komunikaty | (bez głosu, mówi karteczka) | |

## 3. Sceny
| ID | Czas | Nazwa | CO się dzieje | JAK (kamera, tempo) | PO CO | Sprawdzenie (asercja) |
|---|---|---|---|---|---|---|
| S1 | 0:00–0:04 | Warsztat | Ciepły, mały warsztat z papieru: stół, lampa, rower Oli przy ścianie, szpula drutu. Robot siedzi na stole. Tytuł **SPINACZ** | statyczna, spokojnie; tytuł wjeżdża jak wycinanka na nitce | świat i bohater, ton bajki | tytuł w strefie bezpiecznej obu formatów do 3,5 s; robot cały w kadrze |
| S2 | 0:04–0:10 | Karteczka | Ola przypina robotowi karteczkę „ZRÓB JAK NAJWIĘCEJ SPINACZY!”, macha i wybiega. Oko robota zmienia się w HUD: **CEL: SPINACZE ↑ MAX** | najazd na karteczkę, potem na oko | **zapowiedź**: cel bez granic | karteczka czytelna (≥ 4 % wysokości kadru w pionie) od 6,0 do 7,5 s; Ola wychodzi z kadru do 9 s |
| S3 | 0:10–0:16 | Pierwsze spinacze | Robot gnie drut: 1, 2, 4, 8… spinaczy na stole. Licznik na oku. Komunikat statusu: postęp 0 % | półzbliżenie, rytm gięcia na bity pozytywki | humor, „pilny pomocnik” | licznik rośnie monotonicznie; ≥ 16 spinaczy na stole do 16 s |
| S4 | 0:16–0:22 | Rower | Drut się kończy. Robot patrzy na rower Oli. Rower rozpada się na wycinanki i przetapia w spinacze. Potem lampa, krzesło | odjazd na cały warsztat | **ZWROT 1**: zapowiedź (pusta szpula, spojrzenie) → moment (rower) → konsekwencja (warsztat znika) | rower widoczny w S1–S4 do chwili przemiany; po S4 w warsztacie zostają tylko spinacze i robot |
| S5 | 0:22–0:29 | Pomocnicy i miasto | Robot buduje drugiego robota, ten trzeciego. Ściany warsztatu się składają, widać miasto. Fala przemiany idzie po ulicach: auta, latarnie, mosty → spinacze. AI: wyłącznik „obniża wydajność, usunięto” | duży odjazd + paralaksa warstw papieru; tempo rośnie | wykładniczy wzrost i **konwergencja instrumentalna** (wyłącznik przeszkadza celowi) | liczba robotów podwaja się w krokach; licznik spinaczy: log10 rośnie co najmniej o 1 na sekundę |
| S6 | 0:29–0:35 | Ziemia | Kula ziemska z orbity: srebrna fala obejmuje kontynenty. Z bieguna startują rakiety ze spinaczami w stronę Księżyca | odjazd od miasta do orbity (jedno ciągłe ujęcie) | skala: planeta | pokrycie Ziemi przez falę 0 → 100 % w oknie S6, monotonicznie |
| S7 | 0:35–0:40 | Galaktyka | Gwiazdy jedna po drugiej srebrzeją; spiralna galaktyka **ułożona ze spinaczy**. Na końcu wraca oko robota: **POSTĘP: 3 %** | dalszy odjazd, zwolnienie; cisza w muzyce przed puentą | **ZWROT 2 (puenta)**: to dopiero 3 % | galaktyka cała w kadrze w obu formatach; napis „3 %” widoczny ≥ 1,5 s |
| S8 | 0:40–0:45 | Plansza | Papierowa plansza: morał i źródło. Na dole mały robot z jednym spinaczem w chwytaku | statyczna | morał i źródło (wiarygodność kanału) | plansza widoczna 40,5–45 s, tekst w strefie bezpiecznej Shorts; źródło czytelne |

**Zwroty akcji:** S2 = zapowiedź (cel bez granic) · S4 = ZWROT 1 (rower Oli: robot sięga po rzeczy ludzi) · S5 = wyłącznik usunięty · S7 = ZWROT 2 (puenta „3 %”).

**Plansza S8 (tekst):**
- „Zrobił dokładnie to, o co go poproszono.”
- mniejszym: „Maksymalizator spinaczy: eksperyment myślowy Nicka Bostroma (2003)”

## 4. Styl
- **Technika:** płaski wektor jako papierowa wycinanka: każdy obiekt to płaski kształt z lekką fakturą papieru, **cień pod wycinanką** (przesunięty, rozmyty), cienka biała krawędź „wycięcia”. Delikatne drgania póz co 1/12 s jak w poklatkowej animacji (deterministyczne, z ziarna). Styl jako **moduł** (`style/papercut`): paleta + funkcje rysujące kształt, cień i fakturę, wymienne bez zmiany sceny.
- **Paleta:** ciepła papierowa: krem tła, musztardowy, czerwony, miętowy robot; **srebro spinaczy** jako jedyny chłodny, metaliczny kolor, który z każdą sceną zajmuje coraz więcej kadru. W kosmosie: granat i srebro.
- **Tło / świat:** warstwy papieru (warsztat → miasto → orbita → galaktyka), paralaksa przy odjazdach. Przemiana obiektu: wycinanka rozpada się na paski, które zwijają się w spinacze.
- **Tłum spinaczy:** sprite'y w kilku kątach, rysowane hurtem; od tysięcy wzwyż jako deseń / hałdy (tekstura), nie pojedyncze obiekty. Licznik liczy „prawdziwą” liczbę, obraz ją tylko sugeruje.
- **Typografia / HUD:** HUD w oku robota: monospace, żółty na czarnym. Tytuł i plansza: zaokrąglony krój bezszeryfowy (Google Fonts, osadzony). Tekst zawsze w strefie bezpiecznej Shorts (bez górnych ~12 % i dolnych ~20 % kadru pionowego).
- **Referencje:** papierowe wyjaśniacze typu Kurzgesagt w wersji „wycinanka”, „Paper Cuts” z PoC #2 (spinacz).

## 5. Dźwięk
- **Głosy (obsada):** **narrator-dziadek** = ciepły, starszy męski głos premade ElevenLabs, PL (model `eleven_v3` lub `eleven_multilingual_v2`); przed produkcją próbki 2–3 głosów premade z 2 kwestiami do wyboru uchem. **Głos AI** = inny głos premade, spokojny i neutralny, + obróbka (lekki ring-mod / bitcrush, krótki pogłos), żeby brzmiał „maszynowo”, ale zrozumiale. Po 2 ujęcia na kwestię, wybór automatyczny (`vo/make.mjs`: transkrypcja = słowa, mieści się w limicie).
- **Kwestie:**

| Kwestia | Kto | Kiedy (scena / s) | Limit długości |
|---|---|---|---|
| N1 „Był sobie mały robot w małym warsztacie.” | dziadek | S1 / 0,6 | 3,2 s |
| N2 „Pewnego dnia Ola zostawiła mu karteczkę.” | dziadek | S2 / 4,4 | 3,0 s |
| A1 „Cel: jak najwięcej spinaczy. Przyjęto.” | AI | S2 / 7,6 | 2,3 s |
| N3 „Robot był bardzo pilny.” | dziadek | S3 / 10,4 | 2,0 s |
| A2 „Spinacze: osiem. Postęp: zero procent.” | AI | S3 / 13,2 | 2,5 s |
| N4 „Kiedy skończył się drut, znalazł inny metal.” | dziadek | S4 / 16,4 | 3,0 s |
| A3 „Rower. Metal. Przydatny.” | AI | S4 / 19,6 | 2,0 s |
| N5 „Potem zbudował pomocników. A pomocnicy… pomocników.” | dziadek | S5 / 22,4 | 3,4 s |
| A4 „Wyłącznik obniża wydajność. Usunięto.” | AI | S5 / 26,2 | 2,5 s |
| N6 „Wkrótce cała Ziemia lśniła srebrem.” | dziadek | S6 / 29,6 | 2,6 s |
| N7 „A potem… gwiazdy.” | dziadek | S7 / 35,4 | 2,0 s |
| A5 „Postęp: trzy procent.” | AI | S7 / 38,0 | 1,8 s |
| N8 „Zrobił dokładnie to, o co go poproszono.” | dziadek | S8 / 40,6 | 3,2 s |

- **Muzyka (pozytywka → fabryka, z próbek, soundfont GM):** S1–S3 pozytywka (Music Box) w C-dur, 84 BPM, prosta kołysanka · S4 mechaniczne accelerando do 112 BPM, dochodzą klikające tryby (woodblock) · S5–S6 fabryczny rytm 132 BPM: ta sama melodia na pozytywce + stemple (kowadło, niskie bębny), bas, w S6 smyczki · S7 wszystko cichnie do pozytywki w zwolnieniu (mechanizm się „rozkręca”), **pauza muzyki ~0,6 s przed „trzy procent”** · S8 ostatnie, zwalniające nuty pozytywki i cisza. Partytura w kodzie → MIDI → soundfont (wzorzec z ninja).
- **Efekty (SFX):** gięcie drutu (krótki metaliczny klik na spinacz, w tłumie: szelest), „pyk” papieru przy przemianie + brzęk spinaczy, składanie ścian warsztatu (szelest kartonu), start rakiet (miękki szum), w kosmosie prawie cisza.
- **Miks:** na wierzchu zawsze głos; muzyka wyraźnie pod kwestiami (patrz §6a).

## 6. Wykonanie
- **Technika:** jeden plik HTML, Canvas 2D, stały krok 60 Hz, losowość z ziarna. Parametr formatu (`?format=9x16` / `16x9`): ten sam świat i czas, inna kamera i układ tekstu. Dwa MP4, jeden artefakt z przełącznikiem formatu.
- **Klocki z `kit/`:** na start tylko `kit/harness` (uprząż). Resztę film buduje jako klocki kitu, patrz §6b.
- **Nowe w tym PoC:** tłum obiektów i wzrost wykładniczy, narrator prowadzący historię, przemiana obiektów, dwa formaty, styl jako moduł, asercje dźwięku w uprzęży.
- **Sceny w kodzie:** `SCENES` S1..S8 (te same ID), `scenes.json` dla TIMELINE v2.
- **Sterowanie:** klik = pauza/start, `←`/`→` ±1 s (z `Shift` ±0,1 s), klawisz T = znacznik sceny, F = przełącz format.
- **Wyjście:** artefakt (link na wersję) · 2 × MP4 z dźwiękiem · TIMELINE.
- **Szacunek:** ~13 kwestii, ~420 znaków × 2 ujęcia ≈ 850 kredytów + próbki głosów ~400 kredytów (z 10 000 darmowych). HTML z osadzonym audio ~2–3 MB.

## 6a. Plan testów i arkuszy (do omówienia przy akceptacji)
- **Asercje obrazu (liczbowo, w obu formatach):** kolumna „Sprawdzenie” z §3 + stałe: skan klatka po klatce (skok pozycji obiektu ≥ 60 px poza cięciami albo NaN = błąd), test powtórki, brak błędów konsoli, tekst w strefie bezpiecznej Shorts (9:16), licznik spinaczy monotoniczny.
- **Asercje dźwięku (nowe, `kit/harness/audio`, ścieżki renderowane osobno):**
  - brak przesteru: szczyt miksu < −1 dBFS;
  - głośność całości: −14 LUFS ±1,5 (norma YouTube);
  - każda kwestia słyszalna: RMS głosu w jej oknie ≥ **10 dB** nad muzyką + SFX (dziadek) i ≥ **8 dB** (AI);
  - kwestie się nie nakładają (odstęp ≥ 0,15 s) i każda mieści się w limicie z §5;
  - transkrypcja (Scribe) każdej kwestii zgodna ze scenariuszem (po normalizacji, bez interpunkcji);
  - muzyka obecna w S1–S6 (RMS > −35 dBFS), **pauza** przed A5 (muzyka < −45 dBFS przez ≥ 0,5 s), cisza po 44,5 s;
  - tempo muzyki rośnie S1 → S5 (z partytury: 84 → 112 → 132 BPM).
  - Raport poziomów per okno + spektrogram PNG jako arkusz.
- **Arkusze klatek (oczami, oba formaty):** S2 karteczka; ZWROT 1 (pusta szpula / rower się rozpada / pusty warsztat); S5 fala przemiany; S6 Ziemia 0 / 50 / 100 %; ZWROT 2 (galaktyka / „3 %”); plansza S8.
- **Paski klatek (ruch, `tools/strip.mjs`):** przemiana obiektu w spinacze (S4), fala po mieście (S5), drgania wycinanek (czy nie „migoczą”).
- **Niesprawdzalne przez agenta:** barwa głosów i ich „dziadkowość”, płynność na żywo, czy humor działa. Ocenia user.

## 6b. Wkład do kitu i skilla (ANIM-001)
Ten PoC jest **pierwszym filmem budowanym „kitem w trakcie”** (ANIM-001 Decision #5). Zakres przy v1, zgodnie z ANIM-001 Immediate Next Action:
1. **`kit/engine`**: wydzielony z ninja: zegar 60 Hz, DSL zdarzeń `at()` / `sys()`, `SCENES` + znacznik „scena · sekunda”, kamera z celem (punkt + zoom), sterowanie, `window.anim` (API dla uprzęży). Nowość z tego filmu: **parametr formatu** (9:16 / 16:9) w kamerze i układzie.
2. **`kit/audio`**: vo (`make.mjs`: ujęcia, Scribe, `takes.json`), partytura → MIDI → soundfont, render offline (`OfflineAudioContext`, `renderAudio(rate, { stem })`), embed mp3 w HTML.
3. **`kit/harness/audio`**: asercje dźwięku z progami z §6a (ANIM-001 Decision #8); **`tools/stems.mjs` przenosimy do kitu** jako jego część.
4. **`kit/style/papercut`**: pierwszy moduł stylu (BACKLOG B6), wymienny bez zmiany scen.
5. **Lekcje → ANIM-001:** co z kitu zadziałało, czego brakowało, fiszki w `docs/LESSONS.md`. `SKILL.md` nie powstaje przy tym filmie: ANIM-001 spisuje go **na końcu**, z tego, co zadziałało na kilku filmach.

Kryterium: film importuje te klocki z `kit/`, nie ma ich kopii u siebie; ninja zostaje bez zmian (migracja ninja na kit to osobny krok).

## 7. Decyzje (do akceptacji)
1. 45 s, 8 scen, dwa formaty z jednego świata (pion główny).
2. Styl papercut jako wymienny moduł; srebro spinaczy jako jedyny chłodny kolor.
3. Bez ludzi zamienianych w spinacze; groza przez skalę i spokojny głos AI.
4. Narrator PL (dziadek) + głos AI (komunikaty statusu); głosy premade wybierane uchem z próbek.
5. Muzyka pozytywka → fabryka → gasnąca pozytywka, pauza przed puentą.
6. Pierwszy film z asercjami dźwięku w uprzęży; progi jak w §6a.
7. Film buduje `kit/engine`, `kit/audio`, `kit/harness/audio` (z `stems.mjs`) i `kit/style/papercut` (§6b); `SKILL.md` poza zakresem.
