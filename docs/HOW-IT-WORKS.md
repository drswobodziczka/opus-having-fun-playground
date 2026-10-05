# Jak to działa: proces animacji (high level)

> Do zrozumienia i edukacji, nie jako dokumentacja na zawsze. Stan: PoC #3 (The Storm Chose Black).

## 1. Proces od pomysłu do filmu

```mermaid
flowchart TD
  U(["Ty"]) -->|"temat, styl, czas"| Q["Bramka 1: pytania pogłębiające<br/>(ad1..adN)"]
  Q --> BR["BRIEF.md<br/>sceny S1..Sn, zwroty, styl, decyzje"]
  BR -->|"Bramka 2: akceptacja"| CODE

  subgraph FILE["Plik HTML = cały film (np. storm.html)"]
    CODE["Scenariusz<br/>at(t, kto, akcja, wynik), sys(t, ...)"]
    ENG["Silnik<br/>(szczegóły niżej)"]
    API["window.anim<br/>seek / step / state / events / script / scenes"]
    CODE --> ENG --> API
  end

  API --> H["Uprząż: check.mjs<br/>Node + Puppeteer + headless Chrome"]
  H --> AS["Asercje<br/>fabuła + widzialność"]
  H --> SH["Arkusze klatek PNG"]
  H --> TL["TIMELINE.md<br/>(tools/timeline.mjs)"]
  AS --> C(("Claude"))
  SH -->|"Read = wzrok"| C
  C -->|"poprawki"| CODE

  H -->|"klatki + WAV z renderu offline"| FF["ffmpeg"] --> MP4["MP4 z dźwiękiem"]
  FILE -->|"Artifact"| ART["Artefakt na claude.ai<br/>(przeglądarka liczy klatki na żywo)"]
  ART --> U
  MP4 --> U
  U -->|"film / S6 / @41.2: co zmienić"| C
```

## 2. Co to jest „silnik”
Silnik to część pliku HTML, która **zamienia scenariusz w obraz i dźwięk**. Nie jest osobnym programem. Każdy PoC ma własną kopię silnika, a skill ma go kiedyś ujednolicić.

```mermaid
flowchart LR
  SC["Scenariusz<br/>lista zdarzeń z czasami"] --> CLK["Zegar 60 Hz<br/>stały krok = determinizm"]
  CLK --> SIM["Symulacja<br/>akcje, ruch, trafienia, HP"]
  SIM --> RIG["Rig szkieletowy + IK<br/>pozy, chwyty"]
  SIM --> CAM["Kamera<br/>śledzenie + ujęcia: najazd, odjazd, obrót"]
  SIM --> LOG["Log zdarzeń<br/>(dla testów i TIMELINE)"]
  SIM --> CUE["Kolejka sygnałów audio"]
  RIG --> RND["Render Canvas 2D<br/>tło, paralaksa, postacie, efekty, HUD"]
  CAM --> RND
  CUE --> LIVE["Web Audio na żywo<br/>(artefakt)"]
  CUE --> OFF["OfflineAudioContext<br/>→ WAV → MP4"]
  VO["Lektor: say + ffmpeg<br/>mp3 osadzone w pliku"] --> CUE
```

## 3. Pętla poprawek

```mermaid
sequenceDiagram
  participant U as Ty
  participant C as Claude
  participant F as Plik HTML
  participant H as Uprząż (headless Chrome)
  U->>C: S10 rzut za szybki · @51 kamera za blisko
  C->>C: TIMELINE: sekunda/scena → zdarzenia w scenariuszu
  C->>F: zmiana scenariusza / kamery / rysowania
  C->>H: check.mjs
  H-->>C: asercje + arkusze PNG
  C->>H: frames.mjs --before=HEAD
  H-->>C: arkusz PRZED | PO
  C->>U: co zmieniłem + PRZED/PO + ten sam link artefaktu
```

## 4. Toolset: czego używam i po co
| Narzędzie | Rola | Kiedy |
|---|---|---|
| **Claude Code `Write` / `Edit`** | piszę kod animacji, uprzęże, dokumenty | budowa, poprawki |
| **`Bash`** | uruchamiam node, ffmpeg, say, python, git | wszędzie |
| **`Read`** | czytam pliki i **obrazy PNG**, czyli mój „wzrok” | ocena arkuszy klatek |
| **`Artifact`** | publikuję film jako stronę na claude.ai | po każdej wersji/poprawce |
| **Przeglądarka: Canvas 2D** | rysowanie klatek | w artefakcie i w testach |
| **Przeglądarka: Web Audio / OfflineAudioContext** | synteza muzyki i SFX, render ścieżki do MP4 | dźwięk |
| **Node.js + `puppeteer-core`** | steruje przeglądarką bez okna | uprząż, TIMELINE, PRZED/PO |
| **Chrome headless shell** | przeglądarka bez okna (z cache Puppeteera) | jw. |
| **ffmpeg / ffprobe** | klatki → MP4, miks audio, obróbka głosu, pomiar głośności | eksport, lektor |
| **macOS `say`** | synteza mowy (lektor) | nagranie kwestii |
| **python3** | chirurgiczne podmiany w kodzie, osadzanie mp3 jako base64 | poprawki |
| **git / gh** | wersje, PRZED (`--before=HEAD`), GitHub | commit, push |
| **Google Fonts** | fonty strony (pędzel, piksel) | ładowane przez przeglądarkę |
| `WebSearch` / `WebFetch` | research (np. ceny TTS) | **nie** do samej animacji |

## 5. Słowa, które padają najczęściej
- **Uprząż (test harness):** skrypt (`check.mjs`), który otwiera film w przeglądarce bez okna, przewija go, zbiera log i stan, sprawdza asercje, robi arkusze klatek i MP4. To „stanowisko testowe” filmu.
- **Liczbowe kontrole:** sprawdzenia na liczbach zamiast na obrazie, np. „K.O. między 24 a 24,5 s”, „obie postacie w kadrze w 40,3 s”, „trafienie z odległości ≤ 90 px”. Są szybkie i mogą objąć każdą klatkę, a model nie musi niczego oglądać.
- **Arkusz klatek:** jeden PNG z siatką kadrów z wybranych chwil. Pokazuje próbki, nie całość, więc łapie problemy wizualne tylko w tych chwilach.

Więcej pojęć: [`pocs/GLOSSARY.md`](../pocs/GLOSSARY.md).
