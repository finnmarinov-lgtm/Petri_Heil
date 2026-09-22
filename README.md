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

## Auf dem eigenen PC testen

```
node serve.js
```

Danach http://localhost:4173 im Browser öffnen. Für die Installation als App muss die Seite über `http://localhost` oder eine `https`-Adresse laufen, als lokale Datei geht es nicht.

## Veröffentlichen (GitHub Pages)

1. Auf github.com ein Repository anlegen, zum Beispiel `petri-heil`, öffentlich.
2. Den Inhalt dieses Ordners hochladen.
3. Unter *Settings → Pages* als Quelle den Branch `main` und den Ordner `/ (root)` wählen.
4. Nach ein bis zwei Minuten läuft das Spiel unter `https://<benutzername>.github.io/petri-heil/`.

## Zwei Versionen

- **Claude-Version** (https://claude.ai/artifact/4vhhCU325fb1sQ8sFM71y3): mit gemeinsamer Rangliste, Spielstand hängt am Claude-Konto und ist auf allen Geräten gleich.
- **App-Version** (GitHub Pages): installierbar, offline spielbar, ohne Konto. Spielstand liegt nur im jeweiligen Browser, keine gemeinsame Rangliste.

Beide entstehen aus derselben `game.html`.
