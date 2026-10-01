# Backlog pomysłów: WebGL / prawdziwe 3D

> Odłożone z PoC #2 (decyzja ad3: na razie pseudo-3D w 2D). Każdy pomysł to kandydat na osobny PoC.

| Pomysł | Co daje | Narzędzie (cdnjs) | Koszt |
|---|---|---|---|
| **Prawdziwa orbita kamery** wokół walczących | obrót o dowolny kąt z poprawną perspektywą | Three.js | średni |
| **Postacie 2.5D:** płaskie sprite’y (billboardy) w scenie 3D | wygląd 2D, ruch kamery 3D (jak w nowszych bijatykach) | Three.js | średni |
| **Mode-7-style podłoga:** obracana płaszczyzna w perspektywie | klimat 16-bitowych wyścigów na arenie | czysty WebGL / shader | niski–średni |
| **Shadery post-process:** CRT (scanlines, krzywizna), bloom, aberracja | „monitor arcade” | WebGL fragment shader | niski |
| **Cząsteczki na GPU:** wióry, iskry, atrament w tysiącach | gęstsze efekty bez spadku FPS | Three.js Points / instancing | niski |
| **Postacie low-poly 3D** (ołówek to sześciokątny graniastosłup) | pełne 3D, ujęcia filmowe | Three.js | wysoki |
| **Kamera filmowa** (keyframe’y, dolly, zoom z rozmyciem) | „cutscenki” między rundami | Three.js + własny timeline | średni |

## Uwagi
- Determinizm trzymamy tak samo: stały krok + `seek()`. Render WebGL czyta stan, nie czas rzeczywisty.
- Uprząż: headless Chrome z WebGL zwykle działa (SwiftShader), do sprawdzenia w praktyce.
- Biblioteki tylko z cdnjs z przypiętą wersją (wymóg artefaktów Claude).
