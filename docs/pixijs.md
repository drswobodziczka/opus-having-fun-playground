# PixiJS: krótka notatka

> 2026-10-10. Używamy w ninja WebGL (spike v1, port v2). Słowniczek pojęć: [`pocs/GLOSSARY.md`](../pocs/GLOSSARY.md) („Render i grafika”). Efekty: [`webgl-effects.md`](webgl-effects.md).

**Co to:** otwartoźródłowa (MIT) biblioteka JavaScript do **szybkiej grafiki 2D na GPU**. Ukrywa niskopoziomowy WebGL (bufory, shadery, stany) za prostymi obiektami. Popularna w grach przeglądarkowych, reklamach interaktywnych i wizualizacjach. Wersja 8 umie WebGL i nowsze WebGPU.

**Główne klocki:**
| Klocek | Co robi | U nas |
|---|---|---|
| `Application` | tworzy płótno, renderer (WebGL/WebGPU), scenę | jedna aplikacja 1280×720 |
| `Container` | grupa obiektów (drzewo sceny), wspólne przesunięcie/filtry | „świat” (tło + postacie + przód), HUD osobno |
| `Sprite` + `Texture` | obrazek na GPU | warstwy z Canvas 2D jako tekstury, ziarna piasku |
| `Filter` | shader na obrazie kontenera (post-process) | papier, pędzel (własne), Blur, Bloom, Glow (gotowe) |
| `pixi-filters` | osobna paczka ~40 gotowych filtrów | bloom, glow, god rays, shockwave, LUT… |

**Jak go używamy (deterministycznie):** symulacja liczy stan (nasz zegar 60 Hz), malarze Canvas 2D rysują warstwy, Pixi tylko składa je na GPU z efektami (`app.renderer.render(stage)` na żądanie, bez własnej pętli `ticker`). Dzięki temu `seek(41.2)` daje zawsze tę samą klatkę, a uprząż działa jak przy Canvas 2D.

**Pułapki, które już znamy:** filtry przypisywać raz (nie co klatkę), wspólne uniformy shaderów z tą samą precyzją (`highp`), bez GPU (okrojony headless) Pixi po cichu przechodzi na Canvas.

**Alternatywy:** three.js (3D), Phaser (cały silnik gier na Pixi-podobnym renderze), czysty WebGL (pełna kontrola, dużo kodu). Źródło: [pixijs.com](https://pixijs.com), [github.com/pixijs/pixijs](https://github.com/pixijs/pixijs).
