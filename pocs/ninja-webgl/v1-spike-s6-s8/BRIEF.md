# BRIEF: Ninja WebGL (spike renderu, „kinowo”)

> PoC: `pocs/ninja-webgl/` · status: **zaakceptowany 2026-10-09** · długość: 2 fragmenty, ok. 10 s · wersja startowa: `v1-spike-s6-s8` · baza: ninja v7 (`pocs/ninja-sandstorm/v7-feedback-6/`) · decyzja: [PLAY-001 options/webgl-render.md](../../.windsurf/project_tasks/PLAY-001_animation_poc_lab/options/webgl-render.md)

## 1. Założenia (ad1–ad3, 2026-10-09)
| # | Pytanie (skrót) | Ustalenie |
|---|---|---|
| ad1 | Zakres | **S6** (21–26,4 s: parowanie, dźwignia, BLACK MONSOON, K.O., dzień) + **S8 z początkiem S9** (30–34 s: noc, pioruny, ROUND TWO, FIGHT!, pierwsza wymiana) |
| ad2 | Kierunek wizualny | **Kinowo:** tusz++ (papier, pędzel, krew-tusz) + bloom, rozmycie ruchu, głębia ostrości, cząsteczki piasku na GPU, światło piorunów na postaciach |
| ad3 | Rozdzielczość | **1280×720 natywnie** (dziś 480×270 ×3) |

**Zasada spike'a:** symulacja, scenariusz, kamera i dźwięk zostają **bez zmian** z v7. Wymieniamy tylko render (Canvas 2D → PixiJS/WebGL). Dzięki temu porównanie jest uczciwe: ta sama klatka, inny pędzel.

## 2. Bohaterowie
Bez zmian z v7: BISHUKIJ (jasnoszary, szal), ALAMANDRO (czarny, kaptur, biała szczelina oczu). Ten sam rig i te same pozy, inna technika rysowania (niżej).

## 3. Sceny
| ID | Czas | Nazwa | CO się dzieje | JAK (kamera, render) | PO CO (w spike'u) | Sprawdzenie (asercja) |
|---|---|---|---|---|---|---|
| S6 | 21,0–26,4 | ZWROT 2: monsun | skok BISHUKIJA, parowanie, chwyt, dźwignia, śmiech, BLACK MONSOON (12 trafień), K.O. | najazd + obrót do frontu ALAMANDRO, odjazd na monsunie (jak v7); **rozmycie ruchu** na ciosach, **głębia ostrości** w zbliżeniu, krew jako **rozlewające się plamy tuszu**, cząsteczki piasku przy uderzeniach | test pędzla, krwi, ruchu i zbliżeń w świetle dziennym | zdarzenia S6 identyczne z v7; obie postacie w kadrze w kluczowych chwilach (jak v7); klatki niepuste |
| S8 | 30,0–33,0 | Runda 2 (noc) | ROUND TWO, piorun 31,3 s, FIGHT! | noc: tusz na ciemnym laserunku, **bloom** księżyca i piorunów, **piorun oświetla postacie** (poświata od strony błysku), deszcz piasku na GPU | test nocy, światła i bloomu | piorun 31,3 s widoczny jako skok jasności kadru; napisy czytelne |
| S9a | 33,0–34,0 | Wymiana (b), start | pierwsze ciosy rundy 2, pierwsza krew ALAMANDRO | jak S6: rozmycie ruchu, krew-tusz, nocą | czy efekty działają w szybkiej akcji nocą | zdarzenia identyczne z v7 |

## 4. Styl („kinowo”)
- **Papier:** faktura papieru ryżowego z szumu (fbm) w shaderze, włókna, lekka winieta; nocą ciemny laserunek z tą samą fakturą.
- **Pędzel:** kontury i wypełnienia postaci z poszarpaną, „chłonącą” krawędzią (zniekształcenie szumem), mokre krawędzie lekko się rozlewają; ALAMANDRO głęboka czerń, BISHUKIJ szary laserunek.
- **Krew:** plamy tuszu w czerwieni, które rozlewają się po papierze przez ~0,5 s; kropelki z rozmyciem ruchu.
- **Ruch:** rozmycie ruchu na szybkich kończynach i przy ciosach (kierunkowe), krótki błysk na trafieniach.
- **Głębia:** tło (wydmy, słońce/księżyc) rozmyte mocniej przy zbliżeniach kamery, ostre postacie.
- **Światło:** bloom na słońcu, księżycu, piorunach i błyskach trafień; piorun daje poświatę na krawędziach postaci od strony błysku.
- **Cząsteczki:** tysiące ziaren piasku na GPU (burza w tle + wyrzut przy uderzeniach i lądowaniach).
- **Typografia / HUD:** jak v7 (pędzel + piksel), renderowane w wyższej rozdzielczości.
- **Referencje:** v7 (to samo ujęcie) jako punkt odniesienia.

## 5. Dźwięk
Bez zmian z v7 (głosy, muzyka, efekty). W MP4 spike'a: dźwięk wycięty z tych samych sekund filmu v7.

## 6. Wykonanie
- **Technika:** kopia `storm.html` z v7; render podmieniony na **PixiJS 8.19** (cdnjs) + **pixi-filters 6.1.4** (jsdelivr: na cdnjs brak plików) + własne shadery (papier, pędzel). Symulacja nietknięta. Canvas 1280×720.
- **Kit (Decision #5):** przy okazji wydzielam **`kit/harness`** z v7 (Chrome, skan klatka po klatce, test powtórki, widzialność, arkusze, MP4) i używam go na **obu** filmach: v7 (dowód: 41/41 jak dziś) i spike.
- **Uprząż spike'a:** zdarzenia i stawy identyczne z v7 w oknach S6 i S8–S9a; skan klatek i powtórka; brak błędów WebGL; klatki niepuste (wariancja pikseli); widzialność postaci.
- **Wyjście:**
  - arkusz **v7 | WebGL** z tych samych chwil (np. 21,1 · 22,6 · 23,5 · 24,1 · 31,3 · 33,5 s);
  - MP4 720p obu fragmentów z dźwiękiem;
  - pomiar: FPS na żywo w przeglądarce, czas renderu klatki w headless Chrome (WebGL programowy, SwiftShader), rozmiar pliku;
  - artefakt (odtwarzacz z wyborem fragmentu).
- **Szacunek:** render ~600–1000 linii nowego kodu; generowanie ~15–30 min; ryzyko: wydajność WebGL w headless Chrome (plan B: render klatek przez Chrome z GPU w trybie z oknem albo niższa rozdzielczość dla uprzęży).

## 7. Decyzje (zaakceptowane 2026-10-09)
1. Nazwa i miejsce: `pocs/ninja-webgl/v1-spike-s6-s8/`.
2. Kryterium sukcesu: **Ty** widzisz wyraźny skok jakości na arkuszu i w MP4, a asercje symulacji przechodzą bez zmian.
3. Jeśli sukces: kolejny krok to v8 ninja w całości na WebGL (osobna runda).

## 8. Rewizje (zmiany decyzji po feedbacku)
> Brief opisuje aktualny film. Każda runda, która zmienia decyzję z §1–7, dopisuje się tutaj. Szczegóły w `CHANGES.md` danej wersji.

| Wersja | Zmiana decyzji | Zastępuje |
|---|---|---|
