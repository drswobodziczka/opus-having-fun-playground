# Koncepcja: Reżyserka (edytor-odtwarzacz z notatkami)

> Status: **koncepcja**, nic nie zbudowane. Wspólny pomysł usera („artefakt osadzony w edytorze z architektem, który renderuje sceny w locie”) i Claude („artefakt-reżyserka z notatkami w bazie”).

## Problem
- W filmie nie widać sekund ani scen, więc trudno wskazać, co poprawić. *(Częściowo załatane: znacznik `S10 · 40.5 s` w kadrze.)*
- Feedback przez plik (`FEEDBACK.md`) jest nieefektywny, a przez czat nieformalny i niepowtarzalny.
- Kontrola potrzebna na trzech poziomach: **film → scena → sekunda**.

## MVP (1 artefakt)
1. **Odtwarzacz filmu** (ten sam deterministyczny silnik, wbudowany w stronę) ze znacznikiem sceny i sekundy.
2. **Pasek scen S1..Sn** pod filmem: kolorowe bloki z nazwą. Klik przewija do początku sceny, najechanie pokazuje opis CO / JAK / PO CO z briefu.
3. **Podziałka sekund** z miniaturkami po najechaniu (render w locie przez `seek`, bez plików).
4. **Notatki w miejscu:** klik w film, scenę albo sekundę → pole: poziom (film/scena/sekunda), tag (ruch, kamera, dźwięk, styl, tekst, tempo), opis. Notatka pamięta dokładny czas.
5. **Lista notatek** ze statusami: `nowa → w pracy → zrobione`. Przy zrobionych jest link do arkusza PRZED/PO.
6. **Zapis w bazie artefaktu** (capability `db`): Claude czyta notatki sam (`read_db`), poprawia film, publikuje pod tym samym linkiem i oznacza notatki jako zrobione (`write_db`).

## Później („kombajn”)
- Przełącznik wersji A/B w tej samej sekundzie (v1 kontra v2).
- Podgląd kolejnej sceny i renderowanie sceny „w locie” po zmianie parametrów (np. suwak tempa sceny).
- Edycja briefu i scenariusza z poziomu reżyserki.
- Eksport notatek jako paczki do commita.

## Do sprawdzenia przed budową
- Dostępność capability `db` (i ewentualnie `assets`) w artefaktach tego konta.
- Jak osadzić silnik filmu w reżyserce: jeden plik (film + UI) czy film jako moduł wspólny dla obu stron.
- Scenariusz musi mieć sceny jako dane (`SCENES` z opisem CO/JAK/PO CO), co jest też wymaganiem TIMELINE v2.
