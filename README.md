# LöwenKasse (PWA)

Theken-Kasse für den Lions Club Bitburg-Beda als **Progressive Web App**. Läuft auf jedem iPhone und Android-Handy ohne App Store, ohne Apple Developer Account, ohne Gebühren.

## Wie's funktioniert

Die App ist eine Webseite, die sich auf dem Handy „wie eine richtige App" anfühlt. Einmal hochgeladen, kann jede Kellnerin sie über den Browser einmalig auf den Home-Screen hinzufügen — danach ist sie genau wie eine App: eigenes Icon, Vollbild, läuft auch ohne Internet.

## Schritt 1: Icons vorbereiten

Im Ordner liegt `icon.svg` (das Lions-Löwen-Icon). Für PWAs brauchen wir PNG-Versionen davon. **Einmalig:**

Geh auf [cloudconvert.com/svg-to-png](https://cloudconvert.com/svg-to-png), lade `icon.svg` hoch, exportiere drei Mal in unterschiedlicher Größe und speichere sie im gleichen Ordner:

- `icon-180.png` (180×180) — für iOS Home-Screen
- `icon-192.png` (192×192) — für Android
- `icon-512.png` (512×512) — für Splash-Screen und große Displays
- `icon-512-maskable.png` (512×512) — gleiche Datei kann man kopieren

(Alternativ mit Kommandozeile, falls du Lust hast: `brew install librsvg`, dann `rsvg-convert -w 180 icon.svg -o icon-180.png` usw.)

## Schritt 2: Lokal testen

Bevor wir hochladen — kurz im Browser ausprobieren:

```bash
cd loewen-kasse-pwa
python3 -m http.server 8000
```

Dann im Browser auf [http://localhost:8000](http://localhost:8000) gehen. Du siehst die LöwenKasse genauso, wie sie auf dem Handy aussehen wird.

(Wenn `python3` nicht da ist, geht alternativ `npx http-server -p 8000` oder einfach mit der VS-Code-Extension „Live Server".)

## Schritt 3: Online stellen — drei Wege, alle kostenlos

### A) Netlify Drop (der einfachste Weg, kein Account nötig)

1. Geh auf [app.netlify.com/drop](https://app.netlify.com/drop)
2. Zieh den Ordner `loewen-kasse-pwa` per Drag & Drop ins Fenster
3. Netlify gibt dir eine URL wie `https://heitere-eichkatze-12345.netlify.app`
4. Diese URL an alle Kellnerinnen schicken — fertig

Für eine **eigene Adresse** wie `loewenkasse.bitburg-beda.de` musst du dich kurz bei Netlify registrieren (kostenlos) und die Domain hinterlegen. Geht in 5 Minuten.

### B) Vercel (ähnlich einfach, kostenloser Account nötig)

1. Account bei [vercel.com](https://vercel.com) anlegen (kostenlos, kein Kreditkarte)
2. `npm i -g vercel` einmalig installieren
3. Im Projekt-Ordner: `vercel`
4. URL kommt im Terminal

Für Updates später einfach wieder `vercel --prod` — neue Version ist live.

### C) GitHub Pages (für die, die GitHub eh nutzen)

1. Auf GitHub ein neues, **öffentliches** Repo anlegen (Pages funktioniert auf kostenlosen Accounts nur mit Public Repos)
2. Den Ordner-Inhalt hochladen
3. Im Repo: Settings → Pages → Source: „main branch / root" → Save
4. Nach 1-2 Minuten ist die App unter `https://<dein-username>.github.io/<repo-name>/` erreichbar

## Schritt 4: Auf dem iPhone installieren

Jede Kellnerin macht **einmalig**:

1. Die URL der App in **Safari** öffnen (geht nur in Safari, nicht in Chrome auf iOS!)
2. Unten in der Mitte den **Teilen-Knopf** antippen (Quadrat mit Pfeil nach oben)
3. Nach unten scrollen → **„Zum Home-Bildschirm"**
4. Name bestätigen (LöwenKasse), Hinzufügen tippen
5. Das LöwenKasse-Icon ist jetzt auf dem Home-Screen — wie jede andere App

Beim ersten Öffnen aus dem Home-Screen läuft die App im Vollbild-Modus, ohne Safari-Leiste.

## Schritt 5: Updaten — was passiert, wenn du was änderst

1. Du änderst lokal eine Datei (z.B. fügst einen Wein hinzu, änderst Farben)
2. Du lädst die Dateien neu hoch (bei Netlify: drag & drop, bei Vercel: `vercel --prod`)
3. **Wichtig:** In `service-worker.js` ganz oben die `CACHE_NAME`-Versionsnummer hochzählen (`'loewenkasse-v1'` → `'loewenkasse-v2'`), sonst behalten die Handys die alte Version!
4. Beim nächsten Öffnen der App auf dem Handy lädt sich die neue Version (wenn Internet da ist)

## Was die App kann

- **Bestellaufnahme** mit 4 Tabs (Flaschen / Gläser Wein / Alkoholfrei / Pfand)
- **Live-Gesamtpreis** immer sichtbar
- **Automatisches Glaspfand** auf alle Gläser Wein
- **Extra Pfand-Ausgabe** und **Pfand-Rückgabe** für Sonderfälle
- **Barzahlung** mit Schnellwahl-Beträgen und Rückgeld-Berechnung
- **Einstellungen** für Weine, alkoholfreie Getränke und Pfandpreis — werden im Browser gespeichert und überleben App-Neustarts
- **Funktioniert offline** dank Service Worker — perfekt für den Vereinsabend ohne stabiles WLAN

## Was nicht geht (gegenüber einer nativen App)

- Keine Push-Notifications (brauchst du nicht)
- Keine Verbindung zu Bluetooth-Druckern / Kassenbons (falls das mal wichtig wird, müssten wir den Weg umdenken)
- Updates muss man triggern (CACHE_NAME hochzählen)

Wenn das alles passt, bist du in 20 Minuten online.
