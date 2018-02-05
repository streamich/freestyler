# `hyperstyle()` `styleName` Interface

Allows you to add styles to React elements by overwriting HyperScript function `h`.

## Usage

First add `/** @jsx */` pragma as the very first line in your file, to tell JSX transpiler to
use hyperscript function `h` instead for `React.createElement` for JSX element generation.

Import `hyperstyle()` function.

```js
import hyperstyle from 'freestyler/lib/react/hyperstyle';
```

Import React's hyperscript function.

```js
import {createElement} from 'react';
```

Now define you styles.

```js
const h = hyperstyle(createElement, {
    container: {
        textAlign: 'center',
    },
    button: () => ({
        background: 'red',
        width: '320px',
        padding: '20px',
        borderRadius: '5px',
        border: 'none',
        outline: 'none',
        '&:hover': {
            color: '#fff',
        },
        '&:active': {
            position: 'relative',
            top: '2px',
        },
    }),
});
```

Finally, use your styles using `styleName` props.

```jsx
<div styleName='container'>
    <button styleName='button'>
        This is button
    </button>
</div>
```
