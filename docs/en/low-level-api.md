# Low-level API

At the core of [`freestyler`](https://www.npmjs.com/package/freestyler) library is
[`freestyler-renderer`](https://www.npmjs.com/package/freestyler-renderer) package, which is library agnostic and just
generates and injects CSS.

Here is how you can use the renderer, first import it.

```js
import {Renderer} from 'freestyler-renderer';
```

Now, create your `renderer` instance and inject some CSS onto the page.

```js
const renderer = new Renderer;

renderer.renderAnon({
    body: {
        background: 'tomato'
    }
});
```

That's it, now the background color of your page will be red.


