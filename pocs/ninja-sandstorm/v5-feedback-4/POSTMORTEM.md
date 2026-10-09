# v5: szczegóły rundy (postmortem)

> Dawny gruby `CHANGES.md` (do 2026-10-09). Krótki widok zmian: [`CHANGES.md`](CHANGES.md), brief tej wersji: [`BRIEF.md`](BRIEF.md).
> Runda 2026-10-07. Artefakt v5: https://claude.ai/code/artifact/c62a9c64-1114-4cef-9c01-d2480995bd54 · v4: https://claude.ai/code/artifact/f860679c-12f5-4d5a-a761-28fcb378472d
> Porównanie v4 | v5: [`compare-v4-v5.png`](compare-v4-v5.png) · arkusz S3: [`sheet-s3.png`](sheet-s3.png) · przegląd: [`sheet-story.png`](sheet-story.png) · rozpiska: [`TIMELINE.md`](TIMELINE.md)

| # | Uwaga usera | Zmiana | Status |
|---|---|---|---|
| 1 | postacie wyglądają inaczej w dzień i w nocy; ujednolicić „jak runda 2 v4” (wybór z pytania) | jeden projekt postaci w całym filmie: pędzel + obwódka (nocą jasna poświata, w dzień ciemna obwódka tuszu), BISHUKIJ zawsze jasnoszary, ALAMANDRO czarny; trofeum w tym samym kolorze | ✅ |
| 2 | podcięcie wolniejsze, obie ręce na podłożu | `sweep` 1,0 s (było 0,65 s): przysiad z **obiema dłońmi przyklejonymi do ziemi** (IK do punktów na podłożu), obrót na dłoniach z nogą przy ziemi, trafienie przy 9,48 s, upadek do ~9,93 s. Kolejne ruchy przesunięte | ✅ (obrót słabo czytelny na stopklatkach, do oceny na żywo) |
| 3 | muzyka: nie pasuje do walki, brzmi sztucznie, melodia kiczowata (wybór z pytania) | **bez melodii i smyczka**. Perkusyjna muzyka filmowa: bębny w stylu taiko, tomy, stuknięcia, narastające talerze, niski bordun, gong. **Adaptacyjna:** tryb wg sceny (intro/rytm serca/rytm/napięcie/bordun/fatality/koniec), **akcenty muzyczne na zdarzeniach** (parowanie, chwyt, dźwignia, podcięcie, rzut, K.O., fatality, poza zwycięzcy), werbel narastający do fatality i cisza w momencie kontaktu. Na wyjściu limiter | ✅ (zmierzone, nieodsłuchane) |
| — | (znalezione) przester przy K.O. (24 s): sumowanie bębnów, gongu i efektów | kompresor-limiter na wyjściu (na żywo i w MP4): szczyt −2,6 dB | ✅ |

## Weryfikacja
- Uprząż **40/40**. Skan klatka po klatce bez przeskoków ≥ 60 px.
- Głośność MP4 per sekunda pokazuje **kształt walki**: ciche intro i koniec (−32…−40 dB), wymiany ~−27 dB, szczyty na K.O. (24 s), rzucie (40 s) i fatality (51 s), cisza tuż po kontakcie (52 s).
- **Nie sprawdziłem:** brzmienia (model nie słyszy) i wyraźności obrotu przy podcięciu.
