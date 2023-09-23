# Creare una string html con un DOM virtuale

Per poter creare un environment `DOM` like sul server possiamo utilizzare il pacchetto [jsdom](https://www.npmjs.com/package/jsdom)

Installa il paccheto

    $ bun install jsdom

## Creazione del DOM Virtuale

Utilizza jsdom per creare un oggetto DOM virtuale da una stringa HTML o da zero, a seconda delle tue esigenze. Ad esempio:

```js
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Crea un oggetto JSDOM
const dom = new JSDOM();

// Ottieni il documento del DOM virtuale
const document = dom.window.document;
```

## Manipolazione del DOM Virtuale

Utilizza il documento ottenuto per manipolare il DOM virtuale. Ad esempio, aggiungi elementi, attributi o testo come desideri:

```js
// Crea un nuovo elemento div
const newDiv = document.createElement("div");
newDiv.textContent = "Contenuto del nuovo div";

// Aggiungi il nuovo div al documento
document.body.appendChild(newDiv);
```

## Renderizzazione del DOM Virtuale in una Stringa HTML

Usa dom.serialize() per renderizzare il DOM virtuale in una stringa HTML:

```js
const renderedHTML = dom.serialize();
```

## Invia la stringa al browser

```js
const headers = {
  "Content-Type": "text/html", // Imposta il tipo di contenuto a HTML
};
return new Response(renderedHTML, { headers });
```
