# Słowniczek poligonu

| Termin | Znaczenie |
|---|---|
| **Klatka (frame)** | Jeden obraz animacji. Nasze PoC-e liczą 60 kroków symulacji na sekundę. |
| **Deterministyczne** | To samo wejście daje zawsze ten sam wynik, więc da się przewinąć (`seek`) do dowolnej chwili i dostać tę samą klatkę. |
| **Scenariusz (script)** | Lista zdarzeń „w chwili t zawodnik X robi Y, wynik Z”. Fabuła należy do scenariusza, nie do fizyki. |
| **Trace liczbowy** | Tabela stanu animacji próbkowana w czasie (pozycje, HP, stany). Dla agenta to tańszy i pewniejszy sygnał niż obraz. |
| **Log zdarzeń** | Lista tego, co się wydarzyło, z czasem (trafienie, blok, K.O.). Na nim opierają się asercje uprzęży. |
| **Arkusz klatek (contact sheet)** | Jeden obraz z siatką klatek z różnych chwil, podpisanych `t=…`. Pozwala modelowi „zobaczyć” wiele momentów naraz. |
| **Uprząż testowa (harness)** | Skrypt, który otwiera animację w headless Chrome, przewija ją, zbiera trace/log, robi arkusze i sprawdza asercje. |
| **Hitstop** | Krótkie zamrożenie po trafieniu, żeby cios „siadł”. Uwaga: zamrażając tylko ciała, rozjeżdża się zegar ciał względem zegara scenariusza (bug z Clip Fightera v2). |
| **Dithering** | Udawanie odcieni przez szachownicę dwóch kolorów (macierz Bayera). Daje „16-bitowe” gradienty. |
| **Paralaksa** | Tło z kilku warstw, które przesuwają się z różną prędkością: bliskie szybko, dalekie wolno. Oko odbiera to jako głębię (jak widok z okna pociągu). |
| **Rzut aksonometryczny** | Rysowanie 3D „pod kątem” bez perspektywy: obiekty dalsze nie maleją. Ma trzy odmiany poniżej. |
| ↳ **izometryczny** | Wszystkie trzy osie skrócone jednakowo, kąty między nimi po 120°. |
| ↳ **dimetryczny** | Dwie osie skrócone jednakowo, trzecia inaczej. Klasyczny „izometryczny” pixel art (linie 2:1, ~26,6°) to w rzeczywistości rzut dimetryczny: daje czyste schodki pikseli. |
| ↳ **trymetryczny** | Każda oś skrócona inaczej. Najbardziej „naturalny”, najrzadziej używany w grach. |
| **Roll (kamery)** | Obrót kadru wokół osi patrzenia: horyzont się przechyla, a przy 360° świat robi pełny obrót. |
| **Orbita (fałszywa)** | Iluzja obejścia kamery wokół postaci w 2D: warstwy paralaksy jadą w przeciwne strony, a postacie zamieniają się stronami ekranu. |
| **Squash & stretch** | Zgniatanie i rozciąganie kształtu w ruchu (podstawowa zasada animacji). Daje wrażenie „gumowości”. |
| **Super flash** | Przyciemnienie tła i rozbłysk przy ciosie specjalnym (konwencja bijatyk z lat 90.). |

## Produkcja muzyczna

| Termin | Znaczenie |
|---|---|
| **Partytura** | Wielogłosowy zapis nutowy utworu dla zespołu instrumentów lub głosów, w którym wszystkie partie są ułożone pionowo jedna pod drugą. U nas partytura jest **kodem** (`music/score.mjs`): każda partia (koto, flet, bas, bębny) to funkcja, która wstawia nuty w czasie. |
| **Partia** | Część utworu dla jednego instrumentu lub głosu (np. partia fletu). W MIDI zwykle jeden kanał. |
| **MIDI** | Zapis **nut, nie dźwięku**: który instrument, jaka wysokość, kiedy, jak mocno, jak długo. Plik ma kilka kB i sam nie brzmi. |
| **Soundfont (`.sf2`)** | Bank nagranych próbek instrumentów + reguły ich odtwarzania. „Orkiestra w pudełku”, która gra plik MIDI. |
| **General MIDI (GM)** | Standard numeracji 128 instrumentów i zestawu perkusji (kanał 10), dzięki któremu każdy soundfont GM zagra ten sam plik MIDI. |
| **Syntezator programowy** | Program, który gra MIDI próbkami z soundfontu i zapisuje dźwięk (u nas `spessasynth_core`, alternatywnie fluidsynth). |
| **Velocity** | Siła uderzenia nuty (1–127). Wpływa na głośność i często barwę. |
| **BPM** | Uderzenia na minutę, czyli tempo. 150 BPM = szesnastka co 0,1 s. |
| **Szesnastka (krok)** | Najmniejsza jednostka siatki rytmicznej w naszych partyturach; takt 4/4 = 16 kroków. |
| **Takt** | Powtarzalna grupa uderzeń (u nas 4 ćwierćnuty = 16 kroków). |
| **Pentatonika** | Skala pięciodźwiękowa (np. E G A B D). Brzmi „dalekowschodnio” i trudno w niej o fałsz. |
| **Ostinato** | Krótki motyw powtarzany w kółko (u nas koto: pryma, kwinta, oktawa, kwinta). Napędza rytm. |
| **Groove** | Wzór perkusji i basu, który „niesie” scenę. U nas zmienia się z trybem sceny (wymiana / napięcie). |
| **Fill (przejście)** | Krótka zagrywka bębnów na końcu frazy, zapowiada nowy fragment. |
| **Stinger (akcent)** | Krótki mocny dźwięk zsynchronizowany ze zdarzeniem (parowanie, rzut, K.O.). U nas: orchestra hit + taiko + talerz. |
| **Glissando** | Szybkie przejechanie po kolejnych dźwiękach w górę lub w dół (u nas koto jak guzheng). |
| **Tremolo** | Szybkie powtarzanie dźwięku (smyczki w scenach napięcia). |
| **Bordun (drone)** | Długo trzymany niski dźwięk pod resztą; buduje nastrój. |
| **Transpozycja** | Przesunięcie całości o interwał (runda 2 jest o ton wyżej, żeby podnieść energię). |
| **Miks** | Ustawienie proporcji głośności między muzyką, głosem i efektami. |
| **Loudnorm / LUFS** | Normalizacja głośności do poziomu odczuwanego przez ucho (LUFS). Wyrównuje kwestie lektora między sobą. |
| **Limiter** | Ogranicza szczyty sygnału, żeby suma dźwięków nie przesterowała. |
| **Spektrogram** | Obraz dźwięku: czas × częstotliwość × energia. Pozwala modelowi „zobaczyć” muzykę, której nie słyszy. |

## Render i grafika (WebGL)

| Termin | Znaczenie |
|---|---|
| **GPU** | Karta graficzna: tysiące małych rdzeni liczących równolegle (np. kolor każdego piksela naraz). U ciebie: Apple M3 Pro (GPU wbudowane w układ). |
| **WebGL** | Interfejs przeglądarki do rysowania na GPU (wersja 2 = WebGL2). Strona wysyła do GPU dane i małe programy (shadery), GPU liczy obraz. |
| **Shader** | Mały program uruchamiany **na GPU**, pisany w języku GLSL. **Vertex shader** mówi, *gdzie* są wierzchołki kształtu; **fragment shader** liczy *kolor każdego piksela*. Filtry (papier, pędzel, bloom) to fragment shadery. |
| **Tekstura** | Obraz w pamięci GPU; shader może z niej „próbkować” kolory. U nas warstwy narysowane Canvasem 2D stają się teksturami. |
| **Uniform** | Parametr shadera ustawiany z JS co klatkę (np. siła błysku pioruna, numer klatki dla ziarna). |
| **Filtr (post-process)** | Przejście po gotowym obrazie: scena → tekstura → shader przelicza każdy piksel. Koszt ≈ liczba pikseli × liczba filtrów. |
| **Metal** | Natywny interfejs graficzny Apple (odpowiednik DirectX na Windows i Vulkana na Linuksie/Androidzie). Na Macu to on naprawdę rozmawia z GPU. |
| **ANGLE** | Warstwa tłumacząca w Chrome: przyjmuje wywołania WebGL (standard OpenGL ES) i zamienia je na natywne API systemu: **Metal** na Macu, DirectX na Windows, Vulkan na Linuksie. Dzięki niej ten sam kod WebGL działa wszędzie. |
| **SwiftShader** | „Programowe GPU” od Google: udaje kartę graficzną na zwykłym procesorze (CPU). Działa wszędzie, także bez GPU (serwery, okrojony Chrome), ale jest ~20× wolniejszy. U nas: zapas w uprzęży. |
| **Headless Chrome** | Chrome bez okna, sterowany skryptem (Puppeteer). **Headless shell** = okrojona wersja bez GPU (WebGL tylko przez SwiftShader); **pełny Chrome w trybie headless** używa prawdziwego GPU (Metal). |
| **PixiJS** | Biblioteka JS do szybkiej grafiki 2D na GPU (WebGL/WebGPU): sprite'y, kontenery, filtry, własne shadery. Patrz [`docs/pixijs.md`](../docs/pixijs.md). |
| **Sprite** | Obrazek (tekstura) umieszczony w scenie z pozycją, skalą, obrotem i przezroczystością. U nas: warstwy i ziarna piasku. |
| **Bloom** | Poświata wokół jasnych miejsc (jak światło w obiektywie). |
| **Głębia ostrości (DOF)** | Rozmycie planów poza ostrością (u nas: tło przy zbliżeniu kamery). |
| **LUT (grading)** | Tabela przekształcenia kolorów: każdy kolor wejściowy → kolor wyjściowy. Jeden obrazek-tablica nadaje całemu filmowi spójny „look” (jak filtr w aplikacji do zdjęć). |
| **God rays** | Promienie światła widoczne w pyle lub mgle (światło „przebija” się przez cząstki). |
| **Displacement (zniekształcenie)** | Przesuwanie pikseli według mapy szumu: falowanie gorącego powietrza, woda, „żywy” tusz. |
