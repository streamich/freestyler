# Renderer

Freestyler styled component interface:

```js
const Button = styled('button')({
  border: 'none',
  color: '#fff',
}, ({background}) => ({
  background
}));
```

Main render methods:

  - `renderer.renderStatic(Comp, template, args)`
  - `renderer.render(Comp, instance, el, template, args)`

## Example

CSS:

```js
{
  display: 'block',
  cursor: 'pointer',
  width: '320px',
  background: 'red',
  pad: '20px',
  borderRadius: '5px',
  border: 'none',
  outline: 'none',
  color: 'white',
  '&:hover': {
      color: '#fff',
  },
  '&:active': {
      position: 'relative',
      top: '2px',
  },
}
```

#### First render

Uses a more complex version of [Virtual CSS](https://ryantsao.com/blog/virtual-css-with-styletron).

![](https://ryantsao.com/5873a17687cb382dae8a8e6324d42ec9.svg)

Groups declarations by cardinality.

Low cardinality declarations, returns class names `a b`:

```js
{
  display: 'block',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  '&:active': {
      position: 'relative',
  },
}
```

High cardinality declarations, return class names `c d`:

```js
{
  width: '320px',
  pad: '20px',
  borderRadius: '5px',
  '&:active': {
      top: '2px',
  },
}
```

Infinite cardinality declarations:

```js
{
  background: 'red',
  color: 'white',
  '&:hover': {
      color: '#fff',
  },
}
```

First assumes they don't change, and returns class names `e f`.

Result

```html
<button class="a b c d e f" />
```

#### On re-render

Now assume a color changes on re-render:

```js
{
  display: 'block',
  cursor: 'pointer',
  width: '320px',
  background: 'blue', // <----- HERE
  pad: '20px',
  borderRadius: '5px',
  border: 'none',
  outline: 'none',
  color: 'white',
  '&:hover': {
      color: '#fff',
  },
  '&:active': {
      position: 'relative',
      top: '2px',
  },
}
```

Low and high cardinality class names stay the same.

Infinite cardinality "static" set is reduced to:

```js
{
  background: 'red',
  '&:hover': {
      color: '#fff',
  },
}
```

and returns class names `f g`.

The new color is applied inline for performance.

Result:

```html
<button class="a b c d e f" style="background:blue" />
```

#### On another re-render

Now assume another color changes on re-render, but now in a *pseudo-selector*:

```js
{
  display: 'block',
  cursor: 'pointer',
  width: '320px',
  background: 'blue',
  pad: '20px',
  borderRadius: '5px',
  border: 'none',
  outline: 'none',
  color: 'white',
  '&:hover': {
      color: 'yellow', // <----- HERE
  },
  '&:active': {
      position: 'relative',
      top: '2px',
  },
}
```

Low and high cardinality class names stay the same.

Infinite cardinality "static" set is reduced to:

```js
{
  background: 'red',
}
```

and returns a class name `f`.

The changed color is inject into a style sheet as a CSS Custom Property:

```css
._1 {
  color: --1_color;
}
```

The CSS *variable* is set on the DOM element for performance.

Result:

```html
<button class="a b c d f" style="background:blue; --1-color:yellow" />
```
