<!--
SZABLON BRIEFU (kit/templates/BRIEF.md). Punkt wyjścia, nie formularz.
Jak używać:
- Kopiuj do pocs/<temat>/BRIEF.md. Wypełniaj z userem: pytania pogłębiające (§1) → szkic → iteracja → akceptacja (Bramka 2) → dopiero kod.
- Sekcje oznaczone [opcjonalne] usuwaj, jeśli film ich nie potrzebuje. Dopisuj własne, jeśli temat tego wymaga.
- Tabela scen (§3) jest obowiązkowa: ID S1..Sn są wspólne dla BRIEF, kodu (SCENES), TIMELINE i feedbacku (@S6).
- Każda scena ma kolumnę „Sprawdzenie”: z niej powstają asercje uprzęży. Akceptując brief, akceptujesz też asercje.
- Komentarze HTML (wskazówki jak ta) usuń przed akceptacją.
-->
# BRIEF: <Tytuł filmu>

> PoC: `pocs/<temat>/` · status: **szkic** | do akceptacji | zaakceptowany <RRRR-MM-DD> · długość: <N s> · wersja startowa: `v1-<opis>`

## 1. Założenia (z pytań ad1..adN)
<!-- Pytania pogłębiające: 2–3 dla małego filmu, 5–8 dla większego. Bank pytań na dole pliku. -->
| # | Pytanie (skrót) | Ustalenie |
|---|---|---|
| ad1 | Czas i tempo | <np. 60 s, gęsto: 2–4 akcje/s> |
| ad2 | Styl wizualny | <np. tusz / pixel / flat; czy zmienia się w trakcie> |
| ad3 | … | … |

## 2. Bohaterowie [opcjonalne]
<!-- Postacie, obiekty, „aktorzy” (także nieożywieni). Muszą się różnić sylwetką lub kolorem. -->
| | **<A>** | **<B>** |
|---|---|---|
| Sylwetka i kolor | | |
| Charakter / temperament | | |
| Sposób działania (styl walki, ruchu) | | |
| Ruchy specjalne / cechy | | |
| Głos | | |

## 3. Sceny
<!-- Jedna scena = jeden cel. CO: co widać. JAK: kamera, tempo, rytm. PO CO: co scena wnosi do całości.
Zwrot akcji zapisuj jako: zapowiedź → moment → konsekwencja (wszystkie widoczne w kadrze). -->
| ID | Czas | Nazwa | CO się dzieje | JAK (kamera, tempo) | PO CO | Sprawdzenie (asercja) |
|---|---|---|---|---|---|---|
| S1 | 0:00–0:03 | Intro | | | | <np. tytuł widoczny do 2,5 s> |
| S2 | | | | | | |
| … | | | | | | |

**Zwroty akcji** [opcjonalne]: <lista: S4 = ZWROT 1 …>

## 4. Styl
<!-- Paleta, technika, tło i paralaksa, światło, efekty, typografia, HUD, referencje. Jeśli styl zmienia się w trakcie: od której sceny. -->
- **Technika:**
- **Paleta:**
- **Tło / świat:**
- **Efekty:**
- **Typografia / HUD:**
- **Referencje:**

## 5. Dźwięk [opcjonalne]
<!-- Obsada głosów: kto mówi co (lektor vs postacie). Kwestie muszą zmieścić się w czasie do następnej kwestii. -->
- **Głosy (obsada):** <rola → głos/charakter> · narzędzie: <ElevenLabs model / inne>
- **Kwestie:**

| Kwestia | Kto | Kiedy (scena / s) | Limit długości |
|---|---|---|---|
| | | | |

- **Muzyka:** <charakter, instrumenty, tempo, skala; czy reaguje na sceny i zdarzenia>
- **Efekty (SFX):**
- **Miks:** <co ma być na wierzchu>

## 6. Wykonanie
- **Technika:** <jeden plik HTML, Canvas 2D / WebGL, 60 Hz; które klocki z `kit/`>
- **Nowe w tym PoC:** <co testujemy po raz pierwszy>
- **Uprząż:** asercje z §3 + skan klatka po klatce + test powtórki + arkusze (<które sceny>) + MP4
- **Wyjście:** artefakt (link na wersję) · MP4 · TIMELINE
- **Szacunek:** <rozmiar, czas generowania, koszt kredytów TTS>

## 7. Decyzje (zaakceptowane <data>)
1.

## 8. Rewizje (zmiany decyzji po feedbacku)
> Brief opisuje aktualny film. Każda runda, która zmienia decyzję z §1–7, dopisuje się tutaj. Szczegóły w `CHANGES.md` danej wersji.

| Wersja | Zmiana decyzji | Zastępuje |
|---|---|---|

<!--
BANK PYTAŃ (wybierz pasujące, nie wszystkie):
- Czas: ile sekund? tempo (spokojnie / gęsto)? pętla czy zakończenie?
- Gatunek i ton: bijatyka, wyścig, bajka, explainer, teledysk? humor czy powaga? przemoc i krew?
- Styl: technika (tusz, pixel, flat, cut-out, CRT), paleta, czy zmienia się w trakcie, referencje?
- Bohaterowie: kto/co, ilu, czym się różnią, charakter, sposób ruchu?
- Fabuła: zwroty akcji (ile, jakie), kto wygrywa, puenta?
- Kamera: statyczna czy filmowa (najazd, odjazd, obrót)? które momenty?
- Dźwięk: lektor (styl, język), głosy postaci, muzyka (charakter, instrumenty), efekty?
- Tekst w kadrze: tytuł, napisy, HUD?
- Wyjście: artefakt, MP4, format (16:9, pion)?
- Ograniczenia: koszt (kredyty), czas, narzędzia nowe do wypróbowania?
-->
