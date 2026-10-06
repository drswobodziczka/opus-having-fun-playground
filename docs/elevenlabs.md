# ElevenLabs: research i samouczek (lektor do filmów)

> Stan na 2026-10-07, na podstawie oficjalnych stron ElevenLabs (linki niżej). Ceny i zasady zmieniały się w 2026 r., więc **przed większym użyciem sprawdź swój dashboard**.

## 1. Czy API jest płatne „niezależnie” od darmowych 10 000 kredytów?
**Krótko: nie musi być.** Według dokumentacji rozliczeń:
- **najpierw zużywane są kredyty z planu** (u ciebie darmowe 10 000/mies.), a dopiero potem saldo PAYG (doładowanie w dolarach);
- **PAYG (pay-as-you-go)** to *dodatkowe* doładowanie dla każdego planu, także darmowego. Odblokowuje API, które na darmowym planie są wyłączone (dokumentacja wymienia **Music, Sound Effects** itd.). **Text-to-Speech nie jest na tej liście**, więc powinien działać na darmowych kredytach;
- strona cennika API podaje ceny w dolarach ($0,08 / 1000 znaków dla modeli multilingual/v3, $0,04 dla Flash/Turbo, do 12.10 promocja na v4). To cennik PAYG, czyli to, co płacisz **po wyczerpaniu** kredytów z planu.

**Niepewność:** źródła ElevenLabs nie są w pełni spójne (starsza pomoc: „API zużywa kredyty”, nowy cennik: „API w dolarach”). Najprościej sprawdzić to w praktyce: **jedno krótkie wywołanie** (~20 znaków ≈ 20 kredytów) pokaże w dashboardzie, czy ubyło kredytów, czy dolarów.

## 2. Ile to kosztuje u nas
- Lektor jednego filmu: ~14 kwestii, **~250 znaków**.
- Model multilingual / v3: 1 znak = 1 kredyt, czyli **~250 kredytów na film** z 10 000, więc **~40 filmów miesięcznie za darmo**. Próbki głosów do wyboru (3 głosy × 3 kwestie) to dodatkowe ~300 kredytów.
- Flash/Turbo: 0,5–1 kredytu za znak, jeszcze taniej.
- **Licencja:** darmowy plan **nie ma licencji komercyjnej**. Na niekomercyjny poligon to wystarczy. Wymogi atrybucji dla darmowego planu: **do sprawdzenia** w regulaminie.

## 3. Samouczek krok po kroku

### 3.1. Klucz API
1. Zaloguj się i wejdź w **Settings → API Keys**: https://elevenlabs.io/app/settings/api-keys
2. Utwórz klucz. Możesz ograniczyć mu uprawnienia do Text-to-Speech i odczytu głosów.
3. **Zapisz go w pęku kluczy macOS** (w zwykłym Terminalu, nie przez `!` w sesji Claude, bo komenda pyta o hasło interaktywnie):
   ```bash
   security add-generic-password -a "$USER" -s elevenlabs-api -w
   ```
   - `add-generic-password`: dodaje wpis do pęku kluczy (szyfrowany, odblokowywany logowaniem do Maca)
   - `-a "$USER"`: nazwa konta (ty), `-s elevenlabs-api`: etykieta, po której go znajdziemy
   - `-w` bez wartości: **zapyta o klucz**, więc ten nie trafia do historii terminala ani do żadnego pliku
4. Odczyt (tak będą go pobierać skrypty): `security find-generic-password -s elevenlabs-api -w`

**Dlaczego nie `.env`:** `.env` to zwykły tekst w katalogu projektu, a nasze repo jest **publiczne**: jeden przypadkowy commit i klucz wycieka. Keychain nigdy nie leży w repo.

### 3.2. Pierwsze wywołanie (test kosztu)
```bash
KEY=$(security find-generic-password -s elevenlabs-api -w)
curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb?output_format=mp3_44100_128" \
  -H "xi-api-key: $KEY" -H "Content-Type: application/json" \
  -d '{"text": "Round one. Fight!", "model_id": "eleven_multilingual_v2"}' -o test.mp3 && afplay test.mp3
```
Potem zajrzyj do dashboardu (Usage), czy ubyło ~17 kredytów.

### 3.3. Wybór głosu
- Głosy ElevenLabs mają `voice_id`. Przykład z dokumentacji: `JBFqnCBsd6RMkjVDRZzb` („George”).
- Do lektora bijatyki szukamy w **Voice Library** głosów typu *announcer / trailer / deep*. Dodajesz je do „My Voices” i bierzesz ich `voice_id`.
- Lista twoich głosów z API: `curl -s -H "xi-api-key: $KEY" https://api.elevenlabs.io/v1/voices`
- Plan: wygeneruję po 3 próbki dla 3 głosów, a ty wybierzesz uchem (jak przy Danielu).

### 3.4. Parametry, które mają znaczenie
| Pole | Co robi | Dla lektora |
|---|---|---|
| `model_id` | model mowy: `eleven_multilingual_v2` (domyślny), `eleven_v3`, w quickstarcie polecany `eleven_v4` | zaczniemy od v2/v3, porównamy |
| `voice_settings.stability` (0–1) | niżej = więcej emocji i zmienności | ~0,3–0,4 (krzyk, energia) |
| `voice_settings.similarity_boost` (0–1) | trzymanie się barwy oryginału | ~0,75 |
| `voice_settings.style` (0+) | wzmacnia charakter mówcy | 0,3–0,6 |
| `voice_settings.speed` | tempo | 0,9–1,0 |
| `output_format` | format pliku | `mp3_44100_128` |

### 3.5. Jak to wejdzie do filmu
Tak samo jak teraz `say`: skrypt generuje `vo/*.mp3` (te same nazwy: `round1`, `fight`, `ko`, `finish`, `fatality`, `spine`, …), a potem osadzamy je w HTML i miksujemy do MP4. Zmienia się tylko źródło głosu. Ewentualnie zostawiamy obróbkę ffmpeg (lekkie echo).

## Źródła
- [Cennik API](https://elevenlabs.io/pricing/api) · [Cennik planów](https://elevenlabs.io/pricing) · [Pay As You Go (dokumentacja)](https://elevenlabs.io/docs/overview/administration/pay-as-you-go)
- [Obniżka cen i PAYG (blog, 2026)](https://elevenlabs.io/blog/weve-lowered-api-agents-pricing-and-introduced-pay-as-you-go) · [Ile kosztuje API (help center)](https://elevenlabs.io/docs/help-center/technical/how-much-does-it-cost-to-use-the-api)
- [Quickstart](https://elevenlabs.io/docs/quickstart) · [API: text-to-speech convert](https://elevenlabs.io/docs/api-reference/text-to-speech/convert)
