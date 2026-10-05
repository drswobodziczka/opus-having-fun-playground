# v3 (feedback 2): zmiany względem v2

> Runda 2026-10-06. Artefakt v3: https://claude.ai/code/artifact/b3b82263-0c8a-4856-b229-96069f5e3bd9 · v2: https://claude.ai/code/artifact/42976001-7f2b-4178-963c-e159ff2bd672
> Porównanie v2 | v3: [`compare-v2-v3.png`](compare-v2-v3.png) · gęste arkusze: [`sheet-s6.png`](sheet-s6.png), [`sheet-s10.png`](sheet-s10.png) · skan: [`scan.txt`](scan.txt) · rozpiska: [`TIMELINE.md`](TIMELINE.md)

| # | Uwaga usera | Zmiana | Status |
|---|---|---|---|
| 1 | „przeiteruj klatka po klatce” | **skan wszystkich 3600 klatek** (skoki kości między klatkami, NaN) + gęste arkusze S6/S10 co ~0,06–0,11 s. Znalazł systemowe przeskoki póz (niżej) | ✅ |
| 2 | `S6` pięść ma lecieć w twarz, uchylenie, **widoczne odbicie**, szybki chwyt i **wykręcenie** | `parry`: odchylenie głowy + przedramię uderza w przedramię (iskra, ręka BISHUKIJA wyrzucona w górę), `catch`: chwyt nadgarstka, `armlocked`: ręka wykręcona za plecy, zgięty wpół, odwrócony tyłem (płynny obrót), przed monsunem obraca się z powrotem | ✅ |
| 3 | `S10` chwyt i przerzut **do tyłu przez głowę na głowę** | **suplex**: chwyt w pasie → przysiad → mostek, ALAMANDRO po łuku nad głową → **lądowanie na głowie** (iskra, fontanna piasku, krater) → chwila „na głowie” → przewraca się na plecy. Kamera stała, bez obrotów | ✅ |
| 4 | `[postać]` BISHUKIJ dziwnie skacze do tyłu w miejscu, bez sensu | przyczyna: powtarzany motyw choreografii „salto w tył → kopnięcie z wyskoku” bez powodu. Teraz **każde salto to unik** przed konkretnym ciosem, który trafia w powietrze (S3 kopnięcie, S5 podbródkowy, S9 kopnięcie) | ✅ |

## Znalezione skanem klatka po klatce (nie zgłaszane, naprawione)
| Problem | Przyczyna | Naprawa |
|---|---|---|
| ~300 przeskoków póz przy każdej zmianie akcji (do 124 px w 1 klatce) | silnik zapamiętywał poprzednią pozę, ale jej nie używał | **płynne przejście póz** 0,07–0,2 s, dłuższe przy dużej zmianie postury |
| obrót ciała „zawijał się” o 360° (lądowanie po K.O.) | interpolacja kąta bez normalizacji | interpolacja **po najkrótszym łuku** |
| natychmiastowe odwrócenia (lustro w 1 klatce) | autoobrót w stronę przeciwnika | **obrót w 0,16 s** (zwężenie → odwrócenie → rozszerzenie) |
| teleport przy chwycie duszenia (11,95 s) | ofiara odwracała się, gdy duszący przechodził jej za plecami | ofiara nie odwraca się podczas podejścia duszącego |
| dłonie „teleportują się” do celu i z powrotem | chwyty (IK) włączane i wyłączane w 1 klatce | dojście do celu i **płynny powrót puszczonej dłoni** (0,15 s) |
| wybicie do skoku, drgnięcia przy trafieniu, prosty cios | twarde przełączenia póz w kodzie | przejścia ciągłe |

**Wynik:** duże przeskoki (≥ 40 px na klatkę) spadły z kilkudziesięciu do 0, a ruch między klatkami to maksymalnie 45 px (szybkie ciosy monsunu, obrót przy dźwigni). Uprząż **39/39**, w tym nowe: dźwignia po chwycie, łuk i lądowanie na głowie, przewrócenie, każde salto = unik, brak przeskoków ≥ 60 px.
