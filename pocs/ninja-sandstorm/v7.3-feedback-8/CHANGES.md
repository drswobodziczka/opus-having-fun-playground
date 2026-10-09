# v7.3: co się zmieniło względem v7.2

> Artefakt v7.3: https://claude.ai/code/artifact/a7422c7c-f502-416b-a86f-f3aa524aab8b · v7.2: https://claude.ai/code/artifact/d692f9bc-9b1d-4652-8949-d89c3b15e45b
> Brief tej wersji: [`BRIEF.md`](BRIEF.md) · różnica briefów: `git diff --no-index ../v7.2-feedback-7/BRIEF.md BRIEF.md` · szczegóły: [`POSTMORTEM.md`](POSTMORTEM.md) · porównanie: [`compare-v72-v73.png`](compare-v72-v73.png) · rozpiska: [`TIMELINE.md`](TIMELINE.md)

| # | Uwaga usera | Zmiana | Status |
|---|---|---|---|
| 1 | stopy trochę kwadratowe / za długie dla czarnego | stała, krótsza długość (nie zależy od grubości łydki), czubek zwężony | ✅ |
| 2 | nie czuć burzy na wydmach: stały ciurek, co jakiś czas większy podmuch | ciurek z grzbietów dalszych i bliższych wydm + co kilka sekund pióropusz piasku zrywany z grzbietu | ✅ |
| 3 | wiry mało efektowne; wir powinien rozdmuchiwać piasek | wyższe i gęstsze wiry, kłąb kurzu u podstawy, ziarna spiralą w górę i wyrzucane na boki, smuga za wirem | ✅ |
| 4 | krzaki bardziej krzaczaste, jakby w 3D (dalej / bliżej) | splątane gałązki ze sterczącymi patykami; 5 krzaków w różnych głębokościach, bliższe przed postaciami | ✅ |
| 5 | podmuchy piasku bezpośrednio na scenie walki | piasek stale sunie nad ziemią + co ~4 s podmuch (mgiełka i smugi ziaren) przez scenę | ✅ |

**Testy:** 41/41, zdarzenia jak w v7.2. **Niesprawdzone:** ruch na żywo (płynność wirów i podmuchów, czy podmuch nie zasłania akcji za mocno).
