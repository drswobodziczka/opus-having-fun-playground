# v7.4: szczegóły rundy (postmortem)

> 2026-10-09. Krótki widok zmian: [`CHANGES.md`](CHANGES.md).

## Co poszło nie tak w v7.3 (uczciwie)
- Wiry i podmuchy oceniałem na **pojedynczych stopklatkach** (12 kadrów). Z jednej klatki nie da się ocenić ruchu: „pióropusze” i „dym” wiru wyglądały dobrze na stopklatce, a w ruchu jak ogień i wybuchy.
- Uprząż (41 testów) **nie widzi efektów tła**: sprawdza fabułę (log zdarzeń), widzialność i kości postaci. Skan klatka po klatce dotyczy stawów, nie cząsteczek.

## Jak teraz
- **Pole wiatru:** `windPhase(t)` = całka prędkości (1 + podmuchy jako gładkie skoki), więc pozycje drobinek są ciągłe przy przyspieszaniu i przewijaniu; `windGust(t)` 0..1 = natężenie (gęstość, długość i krycie smug). Jedno pole dla wszystkich planów wydm; arena bez zmian (v7.3).
- **Wir:** 110 ziaren na orbitach (wysokość rośnie powoli, kąt = ω·T), każde rysowane jako łuk elipsy perspektywicznej wzdłuż orbity (przód jaśniejszy, tył ciemniejszy) → obrót czytelny; 36 ziaren wciąganych spiralą przy ziemi; 40 ziaren odrywanych stycznie (pozioma składowa prędkości obwodowej + wiatr, potem grawitacja); profil lejka `3 + h²·R + (1−h)⁴·9`.
- **Weryfikacja ruchu:** `tools/strip.mjs` (pasek 16 klatek co 1/30 s, powiększenie 3×) dla wiru; para klatek spokój/podmuch przy podobnej kamerze dla wiatru (pierwsza para była niemiarodajna: różne zbliżenie kamery).

## Lekcje
- **Efekt ruchu = test ruchu.** Każdy efekt cząsteczkowy sprawdzać paskiem kolejnych klatek, nie stopklatką. Do skilla i kitu: `strip` jako krok walidacji; docelowo detektor w uprzęży (np. ciągłość pozycji cząstek, kierunek przepływu).
- Nazwy części testów są nieaktualne („heart rip” zamiast kręgosłupa): poprawić w v8 razem z nowym fatality.
