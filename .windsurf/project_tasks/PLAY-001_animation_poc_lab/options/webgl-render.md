# Opcja: ładniejszy render (WebGL) i silniki animacji

> 2026-10-07. Status: **rekomendacja zaakceptowana przez usera**, następny krok: spike na jednej scenie.

## Pytanie
Czy przepisać filmy na coś „pięknie wyglądającego” (WebGL) i czy użyć gotowego silnika animacji (Remotion lub alternatywy)?

## Co mamy i czego nie chcemy stracić
Silnik PoC-ów to **deterministyczna symulacja** (zegar 60 Hz, scenariusz `at()/sys()`, rig + IK, kamera z ujęciami, log zdarzeń) z kontraktem `window.anim` dla uprzęży: asercje fabuły i widzialności, skan klatka po klatce, test powtórki, TIMELINE, MP4 przez ffmpeg. Brzydota (a raczej skromność) siedzi w **warstwie rysowania**: Canvas 2D, linie i wypełnienia, bez shaderów.

## Kandydaci
| Narzędzie | Co to jest | Licencja / stan (2026-10) | Co by nam dało | Czego nie da |
|---|---|---|---|---|
| **Remotion** | wideo jako komponenty React, render klatka po klatce w headless Chrome, render w chmurze (Lambda) | darmowy dla osób prywatnych, firm do 3 osób i non-profit; większe firmy: licencja firmowa (`LICENSE.md` w repo) | składanie (napisy, montaż, szablony), odtwarzacz w React | ładnej grafiki (to tylko rama); dubluje nasz potok klatki → MP4; wymusza React |
| **Motion Canvas** | animacje w TypeScript (generatory) + edytor z osią czasu | MIT, aktywny (~19 tys. gwiazdek) | wygodne animowanie kształtów, tekstu, wykresów, edytor | symulacji walki ani riga; styl „explainer”, nie bijatyka |
| **Revideo** | fork Motion Canvas nastawiony na render programowy | repo przeniesione/niedostępne pod dawnym adresem: **niepewne** | jw. + render w API | jw. |
| **Theatre.js** | wizualny edytor osi czasu dla three.js | Apache-2.0, **brak zmian od 2024-08** | ręczne dopieszczanie ujęć | ryzyko porzuconego projektu |
| **PixiJS** | szybki render 2D w WebGL (sprite'y, filtry, shadery) | MIT, bardzo aktywny (~48 tys. gwiazdek) | **shadery i filtry**: rozlewający się tusz, faktura papieru, poświata, deszcz, błyski, rozmycie ruchu; zostaje 2D, czyli nasz rig | 3D |
| **three.js** | render 3D w WebGL | MIT, standard | prawdziwe 3D, światło, cienie | wymagałby nowego riga i modeli; duży skok |

## Decyzja (rekomendacja)
**Zostawiamy własny silnik symulacji i wymieniamy tylko warstwę rysowania na PixiJS (WebGL) z shaderami.** Remotion i Motion Canvas nie wchodzą.

Uzasadnienie:
1. **Uroda to sprawa renderu, nie ramy.** Remotion, Motion Canvas i Revideo organizują czas i montaż, a to już mamy: zegar, scenariusz, ujęcia, MP4. Ładny wygląd dają shadery i filtry, czyli PixiJS.
2. **Uprząż zostaje bez zmian.** Asercje, skan klatek, test powtórki i TIMELINE czytają stan symulacji (`window.anim`), a nie piksele. Wymiana renderu nie psuje weryfikacji.
3. **Determinizm.** Render dalej jest sterowany naszym zegarem (`seek`/`step`), więc klatka w 41,2 s jest zawsze ta sama, także w WebGL (ten sam stan → ten sam obraz).
4. **Ryzyko i koszt.** PixiJS to MIT i aktywny projekt. Ładuje się z CDN dozwolonego w artefaktach (cdnjs/jsdelivr). Rig 2D zostaje. three.js oznaczałoby nowy rig i modele (za duży skok na teraz).
5. **Licencje.** Remotion ma warunek wielkości firmy. Nas to nie dotyczy, ale to zbędne ryzyko dla publicznego repo i przyszłego skilla.

## Plan spike'a
- Scena **S6** (monsun, parowanie, ujęcie z obrotem) z v7: ta sama symulacja, render PixiJS: papier (tekstura z szumu), pędzel z rozmyciem krawędzi, poświata nocą, krew jako plamy tuszu.
- Wynik: arkusz klatek **v7 (Canvas 2D) | spike (WebGL)** z tych samych chwil, wydajność na żywo, rozmiar pliku, działanie w headless Chrome (WebGL w trybie programowym, SwiftShader) do MP4.
- Kryterium sukcesu: user widzi wyraźny skok jakości, a uprząż przechodzi bez zmian w asercjach.

## Zobacz też
- [`docs/ideas-webgl.md`](../../../../docs/ideas-webgl.md): wcześniejszy backlog pomysłów WebGL/3D z PoC #2 (orbita, 2.5D, shadery, cząsteczki).

## Źródła
- [Remotion: LICENSE.md](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md) · [Motion Canvas](https://github.com/motion-canvas/motion-canvas) · [Theatre.js](https://github.com/theatre-js/theatre) · [PixiJS](https://github.com/pixijs/pixijs) (licencje i aktywność z API GitHuba, 2026-10-07)
