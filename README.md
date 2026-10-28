# St Bartholomew the Less — digitaal erfgoedverhaal

Een statische, Nederlandstalige publiekswebsite over St Bartholomew the Less in Londen. De site combineert een ingebed Sketchfab-model met een tijdlijn, architectuuruitleg, modelafgeleide tekeningen en transparante bronvermelding.

De website is voorbereid voor GitHub Pages en heeft geen buildstap, database of package manager nodig.

## Inhoud

- publieksvriendelijk erfgoedverhaal in een visuele stijl die is geïnspireerd op `cultureelerfgoed.nl`;
- klik-om-te-laden 3D-viewer van Sketchfab;
- indicatief bovenaanzicht en zijaanzicht/langsdoorsnede als downloadbare SVG;
- tijdlijn van 1123 tot heden;
- technische modelmetadata en kopieerbare bronverwijzing;
- responsive vormgeving, toetsenbordbediening en ondersteuning voor verminderde beweging;
- bron- en rechtenoverzicht;
- automatische publicatie via GitHub Actions.

## Mappen

```text
dist/                         De complete website
  index.html
  assets/
    app.js
    styles.css
    model-interior.jpg
    bovenaanzicht.svg
    zijaanzicht.svg
    favicon.svg
.github/workflows/pages.yml  GitHub Pages-publicatie
LICENSES.md                   Rechten en naamsvermelding
```

## Lokaal bekijken

Open een terminal in deze projectmap en start een eenvoudige webserver:

```bash
python -m http.server 8000 --directory dist
```

Open daarna `http://localhost:8000`. Rechtstreeks openen van `dist/index.html` werkt grotendeels ook, maar een lokale webserver benadert GitHub Pages beter.

## Publiceren via GitHub Pages

1. Maak op GitHub een nieuwe repository en plaats alle bestanden uit deze projectmap daarin.
2. Push naar de branch `main`.
3. Ga in de repository naar **Settings → Pages**.
4. Kies bij **Build and deployment → Source** voor **GitHub Actions**.
5. Open zo nodig het tabblad **Actions** om de workflow `Deploy static site to GitHub Pages` te volgen.

Na een geslaagde run staat de site doorgaans op:

```text
https://GEBRUIKERSNAAM.github.io/REPOSITORYNAAM/
```

De workflow publiceert uitsluitend de inhoud van `dist/`. Elke nieuwe push naar `main` publiceert de site opnieuw. Je kunt de workflow ook handmatig starten via **Actions → Run workflow**.

## Aanpassen

- Tekst en structuur: `dist/index.html`
- Kleuren en opmaak: `dist/assets/styles.css`
- Interacties: `dist/assets/app.js`
- Tekeningen: de twee SVG-bestanden in `dist/assets/`

De stijllaag gebruikt bewust geen RCE-logo en noemt de site een onafhankelijk publieksproject. Houd die afzenderduidelijkheid in stand als je de site publiceert.

## Externe inhoud

De 3D-viewer wordt pas geladen nadat een bezoeker op de startknop klikt. Vanaf dat moment maakt de browser verbinding met Sketchfab. De meegeleverde modelafbeelding is lokaal opgeslagen zodat de rest van de pagina zonder externe beeldserver blijft werken.

Zie [LICENSES.md](LICENSES.md) voor verplichte naamsvermelding en bronvoorwaarden.

