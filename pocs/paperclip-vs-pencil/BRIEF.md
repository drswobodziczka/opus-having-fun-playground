# BRIEF: Paper Cuts Super Turbo V (GEM vs HB)

> Status: **ZAAKCEPTOWANY** (2026-10-02) · PoC #2 w PLAY-001 · wersja briefu 1
> Inspiracje: estetyka platformówek z lat 90. z „bezkończynowymi” bohaterami (pływające dłonie i stopy, malowane, nasycone światy) oraz HUD i efekty bijatyk z ery CPS-2. **Bez używania nazw, postaci ani logotypów tych gier.**

## 1. Założenia (z odpowiedzi ad1–ad5)
| # | Ustalenie |
|---|---|
| ad1 | Czas: **2:00** (120 s), pętla |
| ad2 | **HB (ołówek):** szybki, bezwzględny, tnąco-kłujący jak brzytwa. Tarcza z gumki, czapka z żołędzia, język na wierzchu. **GEM (spinacz):** zwinny, gumowy, pływający, specjalista od dźwigni i rzutów |
| ad3 | Kamera: **pseudo-3D w 2D**, dwa obroty. WebGL → [`docs/ideas-webgl.md`](../../docs/ideas-webgl.md) |
| ad4 | **Dźwięk:** chiptune (Web Audio) + okrzyki lektora |
| ad5 | **Eksport MP4** przez ffmpeg |

## 2. Postacie
### GEM: gumowy spinacz (P1, kolor: stal + turkus)
- **Ciało:** spinacz z grubego, „gumowego” drutu, rozciąga się i sprężynuje (squash & stretch). Duże oczy w górnej pętli.
- **Bez kończyn:** pływające dłonie (okrągłe, 4 palce) i duże buty krążą przy ciele.
- **Ruch:** unosi się nad ziemią i lekko faluje („pływa” w powietrzu), uniki robi rozciąganiem.
- **Ciosy:** *Sprężyna* (odbicie i główka), *Dźwignia* (chwyt i wykręcenie, napis „LEVER!”), *Suplex* (rzut przez siebie), *Pętla* (chwyt z dystansu, ciało rozciąga się jak lasso).
- **Super (desperacki):** *ROZPROSTOWANIE*. Spinacz prostuje się w drut, oplata HB i kończy rzutem.

### HB: ołówek-brzytwa (P2, kolor: żółty lakier + grafit + róż gumki)
- **Ciało:** sześciokątny żółty ołówek, czapka z żołędzia, język wywalony na bok (macha nim przy ruchu).
- **Bez kończyn:** pływające dłonie; w jednej grafitowy szpic jak ostrze, w drugiej **tarcza z gumki**.
- **Ruch:** szybkie doskoki, zostawia za sobą kreskę (smugę grafitu).
- **Ciosy:** *Cięcie* (seria 3 cięć, licznik „3 HITS”), *Szpic* (pchnięcie z dashu), *Gumka* (blok, który **wymazuje** fragment przeciwnika), *Kreska* (rysuje w powietrzu linię, która tnie).
- **Super:** *OSTRZENIE*. Wkręca się w temperówkę na scenie, wypada „SUPER SHARP” ze złotymi wiórami i robi burzę cięć.

## 3. Scenariusz i rozkład scen (120 s)
| Czas | Scena | Co się dzieje | Zwrot akcji / kamera |
|---|---|---|---|
| 0:00–0:06 | **Tytuł** | logo „PAPER CUTS II TURBO”, migające „PRESS START” | |
| 0:06–0:12 | **VS** | portrety GEM i HB, imiona, flagi-nalepki | |
| 0:12–0:16 | **Runda 1, intro** | lektor: „Round one… Fight!” | |
| 0:16–0:46 | **Runda 1** | HB dominuje: dash i cięcia, GEM ucieka rozciąganiem. GEM próbuje dźwigni, HB blokuje gumką | **Zwrot A (0:33):** gumka **wymazuje** GEM-owi dłoń, GEM walczy jedną ręką. HB wygrywa przez K.O. (0:44) |
| 0:46–0:52 | Przerwa | dłoń GEM-a „dorysowuje się” z błyskiem, „ROUND 2” | |
| 0:52–1:28 | **Runda 2** | GEM się adaptuje: pływa nad ziemią, chwyta pętlą, dźwignia „LEVER!”, potem wielki suplex | **Obrót kamery #1 (~1:05): roll 360°** podczas suplexu, cały świat obraca się wokół zawodników. **Zwrot B (1:12):** szpic HB **łamie się** („SNAP!”), HB w panice z wiszącym językiem. GEM wygrywa rzutem (1:26) |
| 1:28–1:32 | Przerwa | „FINAL ROUND” | |
| 1:32–1:54 | **Runda 3** | **Zwrot C (1:33):** HB wbiega w temperówkę, „SUPER SHARP” i burza cięć. GEM na migającym pasku HP | **Obrót kamery #2 (~1:44): orbita 180°**, kamera przechodzi na drugą stronę, warstwy tła przesuwają się w przeciwnych kierunkach, a zawodnicy zamieniają się stronami ekranu. **Zwrot D (1:47):** GEM odpala ROZPROSTOWANIE: drut oplata HB, dźwignia i rzut. HB ląduje wbity w kubek na ołówki („BULLSEYE!”). K.O. (1:52) |
| 1:54–2:00 | **Wygrana** | „GEM WINS”, cytat zwycięzcy w stylu arcade: *„Kto się nie ugina, ten pęka.”* HB z językiem na wierzchu w kubku | pętla do tytułu |

Rytm: każda runda ma co najmniej jeden zwrot. Zwrotów jest łącznie 4, obroty kamery są w kulminacjach rund 2 i 3.

## 4. Styl
- **Rozdzielczość:** 384×224 (natywna rozdzielczość płyty CPS-2), skalowanie bez wygładzania, więc ostre piksele.
- **Paleta:** nasycona i „malowana”. Głęboki fiolet nieba, morski turkus, limonka, magenta, złote akcenty. Gradienty z delikatnym ditheringiem kolorowym (pasy jak na starych 16-bitowcach).
- **Scena: „Kredkowy Las”:** gigantyczne kredki jako drzewa, lampa biurkowa jako słońce, karteczki samoprzylepne jako latające platformy w tle, pływające świecące krople atramentu (kolekcjonerskie „kulki”). Temperówka i kubek na ołówki jako rekwizyty fabularne.
- **Paralaksa:** 4 warstwy (niebo, daleki las, bliski las, podłoga), każda przesuwa się z inną prędkością.
- **Animacja postaci:** squash & stretch, wyolbrzymione pozy, oczy grają emocje (złość, panika, triumf).
- **HUD:** żółte paski HP z czerwonym ubytkiem, licznik 99, imiona, znaczniki wygranych rund, **pasek SUPER** na dole, licznik combo „3 HITS”, „FIRST ATTACK” przy pierwszym trafieniu rundy.
- **Efekty:** kolorowe iskry trafień, hitstop, trzęsienie ekranu, slow-mo przy K.O., błysk tła przy superach (przyciemnienie + rozbłysk), smugi grafitu, wióry przy ostrzeniu.

## 5. Dźwięk
- **Muzyka:** chiptune syntezowany w Web Audio. Sekwencer: lead (square), bas (triangle), perkusja (noise). Temat walki i krótki „victory jingle”.
- **SFX (synteza):** cięcie (szum + sweep), uderzenie, blok gumką (miękki „thup”), rzut (głuche bum), SNAP, ostrzenie (zgrzyt), K.O. (bas + echo).
- **Lektor:** `speechSynthesis` w przeglądarce, po angielsku jak w arcade („Round one”, „Fight”, „K.O.”, „Final round”, „GEM wins”). Głos zależy od systemu.
- **Odblokowanie:** przycisk „WŁĄCZ DŹWIĘK”, bo przeglądarki blokują autoplay. Przewijanie suwakiem wycisza SFX, a muzyka wraca od właściwego miejsca.

## 6. Wykonanie
- **Technika:** jeden plik HTML, Canvas 2D, bez bibliotek, deterministyczny krok 60 Hz.
- **Scenariusz jako „beaty”:** sceny → zdarzenia z czasami i wynikami (`hit/block/miss/ko`). Fabuła należy do scenariusza (lekcja z Clip Fightera v2).
- **Kamera:** pozycja x/y, zoom i **roll** (obrót #1). **Orbita** (obrót #2) to iluzja: warstwy paralaksy jadą w przeciwne strony, scena lekko się skaluje, zawodnicy przechodzą na drugą stronę.
- **Kontrakt testowy:** `window.anim = { seek, state, events, duration }`.
- **Uprząż v1:**
  - log zdarzeń + asercje (zwycięzcy rund, czasy K.O., okna obrotów, 0 błędów konsoli);
  - arkusze klatek per scena;
  - **MP4 przez ffmpeg:** klatki zbierane sekwencyjnie, 30 fps (3600 klatek), plus gęsty arkusz z nagrania.
- **Wersjonowanie:** `pocs/paperclip-vs-pencil/v1-…`, postmortem po wersji.
- **Szacunek:** ~1500–2000 linii. Generowanie kodu ok. 30–45 min, potem iteracje z uprzężą.

## 7. Decyzje (zaakceptowane 2026-10-02)
1. **Zakończenie: podwójne K.O.** Runda 3: GEM wrzuca HB do kubka (K.O.), ale chwilę wcześniej HB dźgnął go naostrzonym szpicem, więc GEM pada sekundę później. „DOUBLE K.O.” → „DRAW GAME”.
2. **Tytuł:** „PAPER CUTS SUPER TURBO V”.
3. **Lektor:** angielski (`speechSynthesis`), muzyka i SFX syntezowane w Web Audio.
4. **Grafika:** ostre piksele 384×224 na start. Gładsza, „malowana” wersja to opcja ewolucji (v2).
5. **MP4 bez dźwięku** w tej iteracji. Artefakt (Canvas) **z dźwiękiem**. MP4 z dźwiękiem w kolejnej iteracji.

Scenariusz i rozkład scen: zaakceptowane („ogólnie approved”).
