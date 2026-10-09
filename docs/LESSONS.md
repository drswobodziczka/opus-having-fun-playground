# Fiszki: lekcje z budowy animacji i studia nagrań

> Krótkie karty z nauką z PoC-ów. Każda: **co się stało → lekcja → jak stosować**. Źródła szczegółów: postmortemy wersji. Nowa lekcja = nowa karta (najnowsze na górze w swojej grupie). Kandydaci do skilla: ANIM-001.

## Proces i kontrola

### 🎯 Chirurgiczna precyzja: brief daje kierunek, zamrożony kod daje kontrolę
- **Co się stało:** filmy są w 100% powtarzalne i każda poprawka zmienia tylko to, o co prosił user. Pytanie: co by było, gdyby zbudować film jeszcze raz z samego briefu?
- **Lekcja:** agent (jak ludzki animator) za każdym razem **inaczej zinterpretuje brief**: ta sama fabuła i sceny, ale inne pozy, rytm, szczegóły, błędy. Precyzja nie bierze się z briefu, tylko z **zamrożenia kodu** po pierwszej wersji: od tego momentu każda zmiana to kopia poprzedniej wersji + chirurgiczne podmiany, a film jest deterministyczny (stały krok 1/60 s, losowość z ziarna, wyniki ciosów w scenariuszu, test powtórki).
- **Jak stosować:** (1) v1 z briefu = punkt startu, akceptowany jako całość; (2) od v2 nigdy „od nowa”: kopia + minimalne zmiany; (3) żadnego `Math.random()` ani zegara systemowego; (4) uprząż pilnuje, że to, czego nie dotykaliśmy, się nie zmieniło (zdarzenia, pozy). Eksperyment do zrobienia: [BACKLOG B11](../BACKLOG.md).

### 📄 Brief per wersja, cienki CHANGES
- **Co się stało:** wspólny brief + tabela rewizji sprawiał, że brief v7 przeczył sam sobie (piksel, Daniel, serce z v1).
- **Lekcja:** dokument „czym jest film” musi być pełny i aktualny dla każdej wersji; historia zmian to osobny, krótki dokument.
- **Jak stosować:** `vN/BRIEF.md` (czym jest) · `vN/CHANGES.md` (co się zmieniło) · `vN/POSTMORTEM.md` (jak). Tabela ról w `CLAUDE.md`.

## Weryfikacja (model nie widzi ruchu i nie słyszy)

### 🌪️ Efekt ruchu = test ruchu
- **Co się stało:** wiry i podmuchy w v7.3 ocenione na stopklatkach wyglądały dobrze, a w ruchu „paliły się” i „wybuchały”.
- **Lekcja:** z jednej klatki nie da się ocenić ruchu. Uprząż (asercje, skan kości) **nie widzi efektów tła**.
- **Jak stosować:** każdy efekt cząsteczkowy sprawdzaj paskiem kolejnych klatek (`tools/strip.mjs`, co 1/30 s, powiększenie). Porównania „przed/po” rób przy tej samej kamerze.

### 🔢 Asercje ≠ arkusze
- **Lekcja:** asercje są liczbowe (log zdarzeń, położenie na ekranie, kości) i nie oglądają obrazu; arkusze są dla oczu (agent przez `Read`, user). To dwa osobne procesy w jednym przebiegu uprzęży.
- **Jak stosować:** plan testów omawiany z userem przy briefie: co liczbowo, które momenty na arkusze, które na paski klatek.

### 🔁 Restart musi czyścić wszystko
- **Co się stało:** po pierwszym odtworzeniu BISHUKIJ trzymał rękę w górze (pole `deflectT` nie było zerowane).
- **Lekcja:** stan postaci, którego nie resetuje restart, psuje każde kolejne odtworzenie.
- **Jak stosować:** test powtórki w uprzęży (pozy na świeżej stronie = pozy po pełnym przebiegu); migawka „pierwszego przebiegu” musi być zrobiona przed czymkolwiek innym.

### 🎞️ Skan klatka po klatce to kręgosłup uprzęży
- **Co się stało:** v3: ~300 przeskoków póz, których nie widziały ani asercje, ani arkusze.
- **Jak stosować:** skok kości ≥ 60 px między klatkami poza znanymi cięciami = błąd; rozwijać o kolejne detektory.

## Studio nagrań (dźwięk)

### 👂 Model nie słyszy: mierz, transkrybuj, oglądaj spektrogram
- **Lekcja:** słowa sprawdza transkrypcja (ElevenLabs Scribe), muzykę spektrogram i głośność w czasie, miks pomiar poziomów w oknach (spokój / akcja / kwestia). Barwę ocenia człowiek.
- **Jak stosować:** każda zmiana dźwięku = pomiar przed/po w konkretnym oknie czasu, na ścieżkach osobno (`tools/stems.mjs`). Docelowo asercje dźwięku w uprzęży (ANIM-001 Decision #8), nie wiedza agenta.

### 🗣️ ElevenLabs v3: każde wywołanie to inne ujęcie
- **Lekcja:** ten sam tekst daje różne wykonania (raz krzyk, raz spokojnie). Klucz API ma własny limit kredytów, niezależny od konta. Na darmowym planie działają tylko głosy premade.
- **Jak stosować:** kilka ujęć na kwestię, wybór automatyczny (transkrypcja = słowa, mieści się w czasie, najgłośniejsze), raport ujęć w `vo/takes.json`.

### 🎼 Muzyka z próbek, nie z oscylatorów
- **Lekcja:** syntezowane w Web Audio „instrumenty” brzmią jak syntezator; partytura w kodzie + soundfont daje prawdziwe barwy i zostaje deterministyczna i adaptacyjna.

## Render

### 🖼️ WebGL daje światło i ruch, nie kształt
- **Lekcja:** shadery poprawiły noc, pioruny, ruch i atmosferę, ale postacie mają ten sam kształt pociągnięć. Uroda postaci to osobny problem (pędzel), nie sprawa silnika.
- **Pułapki:** minimalny „headless shell” Chrome nie ma GPU i po cichu wyłącza WebGL; **pełny Chrome w trybie headless używa GPU** (macOS: Metal, ~20× szybciej niż SwiftShader), więc uprząż WebGL odpala pełny Chrome, a SwiftShader to zapas; zawsze asercja „renderer = webgl”; przypisywanie `filters` co klatkę zabija wydajność; wspólne uniformy shaderów muszą mieć tę samą precyzję.
