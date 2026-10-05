# Toolbox: narzędzia i potrzeby warsztatowe

> Stan na 2026-10-02 (macOS arm64). Wersje sprawdzone lokalnie, chyba że oznaczono inaczej.

## 1. Czego używamy dziś

| Narzędzie | Wersja | Rola w poligonie | Status |
|---|---|---|---|
| **HTML + Canvas 2D + JS** | (przeglądarka) | sama animacja: rysowanie proceduralne, symulacja, scenariusz | ✅ używane (Clip Fighter v1/v2) |
| **Node.js** | v22.14.0 (nvm) | uruchamianie uprzęży testowej | ✅ |
| **puppeteer-core** | npm, najnowsze | sterowanie headless Chrome: `seek`, `state`, zrzuty, błędy konsoli | ✅ |
| **Chrome headless shell** | 131.0.6778.204 (cache `~/.cache/puppeteer`) | przeglądarka do testów, bez okna | ✅ (w cache są też Chrome 129/131/146/154) |
| **Python 3** | 3.14.3 | chirurgiczne podmiany bloków kodu w plikach | ✅ |
| **Claude Artifacts** | — | publikacja animacji jako prywatnej strony | ✅ |
| **Narzędzie `Read` (obrazy)** | — | „oczy” modelu: czyta PNG (arkusz klatek), nie czyta wideo | ✅ |
| **ffmpeg / ffprobe** | 8.0.1 (Homebrew) | eksport MP4 (skala 3× `neighbor`), gęsty arkusz z nagrania (`tile`) | ✅ używane (Paper Cuts v1) |
| **Web Audio API** | (przeglądarka) | syntezowana muzyka chiptune i SFX z logu zdarzeń | ✅ (niezweryfikowane odsłuchem) |
| **speechSynthesis** | (przeglądarka) | lektor („Round one”, „Fight!”) | ✅ (głos zależy od systemu) |

### Jak to się łączy
```
scenariusz (SCRIPT) ─► symulacja 60 Hz ─► Canvas ─► [post-process, np. dithering] ─► klatka
                              │
           window.<anim>.seek(t) / state()   ◄── puppeteer-core + headless Chrome (check.mjs)
                              │
                 trace.txt · sheet.png · błędy konsoli ─► Read (model) ─► poprawki ─► Artifact
```

## 2. Uprząż testowa: stan obecny (v0, `check.mjs`)
- Trace stanu co 0,25 s (pozycje, HP, stany).
- Arkusz 16 klatek z zadanych chwil.
- Zrzut na szerokości telefonu.
- Zbieranie błędów konsoli i strony.
- Czas: ~6 s na przebieg.
- Ograniczenia: ścieżka do Chrome wpisana na sztywno, hooki specyficzne dla Clip Fightera, brak asercji.

## 3. Potrzeby do wypróbowania (backlog warsztatowy)

### Uprząż v1 (priorytet)
- [x] **Log zdarzeń** (`events.json`) zamiast samego próbkowania stanu.
- [x] **Asercje scenariusza:** 16 sprawdzeń w Paper Cuts v1.
- [x] **Arkusz z kluczowych chwil** (24 nazwane momenty). Do zrobienia: automatycznie z logu zdarzeń.
- [x] **Kontrakt hooków:** `window.anim = { seek, step, state, events, script, duration }`.
- [x] **Autodetekcja Chrome** w `~/.cache/puppeteer`.
- [x] **Asercje widzialności** (PoC #3): postacie w kadrze przy każdym zwrocie; zbliżenia sprawdzają tylko punkty kluczowe.
- [ ] **Asercje nakładania:** napisy kontra postacie i ważne elementy tła.
- [ ] **Kontrole co klatkę (uprząż v3):** skoki kości > X px/klatkę (teleport), postać poza kadrem w planie ogólnym, nakładanie napisów. Obraz tylko dla klatek, które kontrola oznaczy.
- [ ] **Autoreview per scena przed oddaniem:** gęsty arkusz każdej sceny (np. 4 kl./s) + kontrole co klatkę, żeby user dostawał film po mojej własnej rundzie poprawek.
- [ ] Jedna komenda: `anim-check <plik.html> --expect …`.

### Wideo i ruch (ffmpeg)
- [x] **Render do MP4:** `step()` co klatkę → PNG → ffmpeg (120 s filmu w ~15 s).
- [ ] **GIF z paletą:** `palettegen` + `paletteuse` (ładny GIF z ograniczoną paletą).
- [x] ~~Gęsty arkusz z nagrania (ffmpeg z MP4)~~ **wycofany**: MP4 powstaje z tych samych klatek, które uprząż bierze prosto z animacji, więc nic nie wnosi. Zamiast tego gęste arkusze per scena prosto z `seek()`.
- [ ] Porównać z `page.screencast()` z Puppeteera (nagrywanie na żywo; z pamięci wymaga ffmpeg, do weryfikacji).

### Jakość i regresja
- [ ] **Pomiar FPS** (czas klatki w `requestAnimationFrame`, trace wydajności).
- [ ] **Regresja klatek:** porównanie PNG z poprzednią wersją (np. `pixelmatch`).
- [ ] Widoki: desktop, telefon, motyw jasny i ciemny.

### Dźwięk
- [x] **Web Audio API:** syntezowane efekty chiptune (square/noise) i sekwencer muzyki.
- [ ] **Głosy** („ROUND ONE”, „FIGHT!”, „K.O.”): `speechSynthesis` kontra próbki z modelu TTS osadzone jako data URI.
- [ ] Blokada autoplay: przycisk „włącz dźwięk”. Sprawdzić, czy Web Audio działa w podglądzie artefaktu.
- [x] Render audio offline (`OfflineAudioContext` z kolejki sygnałów) → WAV → MP4 (PoC #3).
- [x] Pomiar głośności (`volumedetect`, `astats` RMS per sekunda): model „słyszy” liczby.

### Grafika (pod v3: Rayman × SSF2T)
- [ ] Pseudo-3D w Canvas (skala, paralaksa, obrót sceny) kontra **WebGL / Three.js** (cdnjs) do obrotów kamery.
- [ ] Malowane tła: gradienty i szum proceduralny kontra obrazki generowane modelem i osadzone w pliku.
- [ ] Paleta „żywa”: walidacja kontrastu postać/tło.

### Lektor TTS z chmury (backlog z PoC #3, ad7 b)
- [ ] **ElevenLabs:** ~$0.10 / 1000 znaków (Multilingual v2/v3) albo ~$0.05 (Flash/Turbo); plany od $6/mies. Źródła podają różne liczby (stan 09.2026), więc przed budżetowaniem sprawdzić [oficjalny cennik](https://elevenlabs.io/pricing/api).
- [ ] **OpenAI gpt-4o-mini-tts:** ~$0.015 za minutę audio (rozliczane tokenami: $0.60 / 1M wejścia, $12 / 1M wyjścia audio), styl głosu sterowany instrukcją ([model](https://developers.openai.com/api/docs/models/gpt-4o-mini-tts)).
- [ ] Skala: lektor jednego filmu to ~15 kwestii (~250 znaków, ~20 s audio), czyli **ułamek centa** per film. Realny koszt to założenie konta i klucz API, nie samo użycie.
- [x] Lokalnie i za darmo: macOS `say` + ffmpeg (pitch, kompresja, echo). Próbki: `pocs/ninja-sandstorm/voice-samples/`. Użyte w PoC #3 (głos Daniel).

### Narzędzia animacyjne (do rozważenia)
- [ ] **Blender w trybie headless (Python):** 3D, światło, fizyka, render klatek. Największy skok jakości, ale wynik to wideo, a nie interaktywny artefakt.
- [ ] **Lottie / Rive / Spine:** formaty animacji 2D z krzywymi i rigami, odtwarzane w przeglądarce (np. `lottie-web` z cdnjs). Lepszy ruch, ale trudniej generować kodem niż Canvas.

### Do porównania
- [ ] **Modele wideo (np. fal.ai):** ten sam brief, porównanie kontroli, powtarzalności, kosztu i stylu. Wymaga klucza API, niesprawdzone.

## 4. Czego nie mamy / ograniczenia
- Model **nie widzi ruchu**, tylko pojedyncze obrazy, więc płynność oceniamy pośrednio (arkusze, FPS) albo oceniasz ją ty.
- Brak wbudowanego podglądu artefaktu w tej sesji, więc weryfikacja idzie przez własną uprząż.
- Artefakty są prywatne. Udostępnianie zostaje po twojej stronie (menu Share).
