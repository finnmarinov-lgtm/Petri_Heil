# Petri Heil

Pixel-Arcade-Angelspiel im Browser. 60 Sekunden pro Runde, dazu Angelladen, Fangbuch, Rekord und eine gemeinsame Rangliste.

## Dateien

| Datei | Zweck |
|---|---|
| `game.html` | **Die Quelldatei.** Hier wird das Spiel bearbeitet. |
| `index.html` | Erzeugt aus `game.html`. Die Version fürs Web, installierbar als App. Nicht von Hand bearbeiten. |
| `build.js` | Macht aus `game.html` die Datei `index.html`. |
| `manifest.webmanifest` | Name, Icon und Farben der App. |
| `sw.js` | Service Worker, macht das Spiel offline spielbar. |
| `make-icons.js` | Erzeugt `icon-192.png` und `icon-512.png`. |
| `serve.js` | Testserver für den eigenen PC. |

## Ändern und neu bauen

```
node build.js
```

Das Icon nur neu erzeugen, wenn es geändert wurde:

```
node make-icons.js
```

`build.js` setzt dabei automatisch einen neuen Cache-Namen in `sw.js`, damit installierte Geräte die neue Fassung bekommen.

## Auf dem eigenen PC testen

```
node serve.js
```

Danach `http://localhost:4173` im Browser öffnen. Für die Installation als App muss die Seite über `http://localhost` oder eine `https`-Adresse laufen, als lokale Datei geht es nicht.

## Veröffentlichen (GitHub Pages)

Repository: `Petri_Heil` von `finnmarinov-lgtm`, Adresse https://finnmarinov-lgtm.github.io/Petri_Heil/

Nach Änderungen die geänderten Dateien dort über *Add file → Upload files* hochladen.

## Onlinekonto (nur App-Version)

Spielstand und Rangliste liegen bei Supabase (Projekt `Petri_heil`). Jedes Gerät bekommt beim ersten Start einen Spielercode wie `PETRI-A1B2-C3D4`. Mit diesem Code holt man den Spielstand auf ein anderes Gerät.

Der Schlüssel in `game.html` ist der *publishable key* und darf öffentlich sein: Die Tabelle `spieler` ist für Fremdzugriff gesperrt, möglich sind nur die drei Funktionen `stand_laden`, `stand_speichern` und `rangliste`. Wer einen fremden Spielercode nicht kennt, kommt an diesen Spielstand nicht heran.

Ohne Netz läuft alles lokal weiter und wird beim nächsten Speichern hochgeladen.

## Zwei Versionen

- **Claude-Version** (https://claude.ai/artifact/4vhhCU325fb1sQ8sFM71y3): Rangliste und Spielstand laufen über claude.ai, dafür braucht man ein Claude-Konto.
- **App-Version** (GitHub Pages): installierbar, offline spielbar, ohne Claude-Konto. Spielstand und Rangliste laufen über Supabase und den Spielercode.

Beide entstehen aus derselben `game.html`. Die Ranglisten sind getrennt, weil die Claude-Seite keine fremden Server anfragen darf.
