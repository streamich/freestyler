# `hoc()()` Higher Order Component Interface

The `hoc()()` function creates [HOC](https://mailonline.github.io/libreact/en/Introduction.html#hoc)s that can style HTML elements.


## Usage

First import `hoc()`.

```js
import hoc from 'freestyler/lib/react/hoc';
```

Now let's create a HOC that will add orange border to HTML elements.

```jsx
const withOrangeBorder = hoc({
    border: '1px solid orange'
});

const DivWithRedBorder = withOrangeBorder('div');

<DivWithRedBorder>Hello world</DivWithRedBorder>
```
