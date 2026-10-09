# Feedback 7 (zebrany 2026-10-09) → v8

> **v7.2 (2026-10-09) zrobiło:** #1 częściowo (głos śmiechu w 25,95 s), #2 (stopy), #3 (paralaksa ×3, burza, życie na wydmach). Reszta poniżej → v8.

> Luźne pomysły i poprawki usera do bieżącego scenariusza. **Zmiany robimy w v7 (Canvas 2D) → v8, potem port do WebGL.** Przed kodem: krótkie pytania, potem nowy pełny brief `v8/BRIEF.md` (część to zmiany decyzji). Komentarze agenta: *kursywą*.

| # | Uwaga usera | Gdzie | Komentarz / plan | Zmiana briefu? |
|---|---|---|---|---|
| 1 | ALAMANDRO ma być **bardziej szalony, częściej się śmiać**; na koniec rundy 1 śmieje się bez głosu | S6 (25,6 s), cały film | *Potwierdzone: `laugh` w 25,6 s nie ma podpiętego głosu (jest tylko w 21,3 i 44,0 s). Plan: głos w 25,6 s + 2–3 nowe krótkie rechoty (np. po K.O., po teleporcie, nad trofeum), tik głowy i ramion w spoczynku.* | tak: charakter ALAMANDRO (§2) |
| 2 | **Postacie nie mają stóp** | rig | *Potwierdzone: nogi kończą się na kostce (`footF/footB` to koniec piszczeli). Plan: kość stopy (pięta–palce) z prostym IK do podłoża, stopa w kopnięciach wyprostowana.* | nie |
| 3 | **Paralaksa: trzeci poziom** i więcej życia na wydmach, widać burzę | tło | *Plan: plan dalszy (góry/ruiny), środkowy (wydmy z wirami piasku, przewalające się chmury), bliski (kępy, kamienie, przelatujące śmieci). Burza widoczna jako wędrujące ściany pyłu.* | tak: świat (§4) |
| 4 | **Mały stwór w oddali** ganiający za postacią; mógłby wskoczyć w **rundzie 3** i walczyć z ALAMANDRO | tło → nowa runda | *Fajny wątek: zapowiedź w tle w rundzie 1–2 (zauważalny, ale nie przeszkadza), wejście w rundzie 3. To wydłuża film (3 runda ~20–30 s) i zmienia finał: decyzja o długości i zakończeniu.* | tak: fabuła, długość (§1, §3) |
| 5 | **BISHUKIJ ma być robotem**: styl metalowy, robotyczny; głos też | postać, głos | *Plan: sylwetka zostaje (ruch), rysunek: płyty, nity, przeguby, świecący wizjer; dźwięk: serwa przy ruchu, metaliczne trafienia; głos: Callum + obróbka (ring-mod/wokoder, bitcrush) albo inny głos. W WebGL: Bevel, odbłyski, RGBSplit przy trafieniu.* | tak: postać (§2), dźwięk (§5) |
| 6 | Film **do publikacji**: zamiast wyrywania kręgosłupa **strzał energii à la Ryu** i **pełna dezintegracja** postaci | S12 | *Plan: ładowanie kuli energii (zbliżenie na dłonie), strzał, trafienie, robot rozpada się na odłamki/cząstki (u robota dezintegracja jest „czysta”, bez gore). Nazwa fatality do wyboru. Krew w całym filmie: do decyzji przy publikacji.* | tak: zwrot 4 (§1 ad6, §3) |
| 7 | (pytanie) Dlaczego ciosy są takie proste: bez skrętów tułowia, kucnięć, odchyleń, uników, bloków | wymiany S3, S5, S9 | *Patrz odpowiedź w czacie (2026-10-09). Plan: słownik ruchów v2 (uniki: slip, odchylenie, kucnięcie pod ciosem, krok w bok; skręt tułowia przy ciosie; bloki wysoko/nisko; zwody; kombinacje 3–5 ciosów z reakcjami) i reguła choreografii: każdy cios ma odpowiedź (blok, unik, kontra, trafienie).* | tak: wykonanie (§6) |

## Kolejność (propozycja)
1. Pytania (długość i runda 3, fatality, robot: wygląd i głos, krew przy publikacji).
2. v8 w Canvas 2D: stopy, śmiechy, słownik ruchów v2, robot, paralaksa 3 poziomy + burza, fatality energią.
3. Port v8 do WebGL (render warstwowy ze spike'a).
4. Runda 3 ze stworem: osobna runda feedbacku (większa zmiana fabuły).
