# Server-side Rendering

First render your app.

```js
const ReactDOMServer = require('react-dom/server');

const html = ReactDOMServer.renderToString(<App />);
```

Then flush the generated CSS styles.

```js
const renderer = require('freestyler/lib/renderer').renderer;

const css = renderer.flush();
```

And send your page.

```js
req.end(`
    <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            <div>${html}</div>
        </body>
    </html>
`);
```
