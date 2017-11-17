# Renderer

  - `renderer.renderStatic(Comp, template, args)`
  - `renderer.render(Comp, instance, el, template, args)`


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

Uses a more complex version of [Virtual CSS](https://ryantsao.com/blog/virtual-css-with-styletron).

![](https://ryantsao.com/5873a17687cb382dae8a8e6324d42ec9.svg)

Groups declarations by cardinality. Low cardinality declarations:

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