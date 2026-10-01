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
