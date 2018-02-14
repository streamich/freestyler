# Low-level API

As a React user you will never have to use these low-level APIs,
you can safely skip to 3<sup>rd</sup>+ generation interfaces.
At the core of [`freestyler`](https://www.npmjs.com/package/freestyler) library is
`Renderer` class, which is a framework agnostic CSS renderer that simply generates and injects CSS.

Here is how you can use the renderer, first import it.

```js
import Renderer from 'freestyler/lib/renderer/Renderer';
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

That's it, now the background color of your page will be red. Read [reference](#reference) below for more.


## Reference

- `.format()` &mdash; parses CSS-like object's AST and returns a raw CSS string.
- `.renderAnon()` &mdash; injects *anonymous* global CSS into the page.
- `.renderStatic()` &mdash; injects component's static CSS.
- `.render()` &mdash; injects instance's dynamic CSS.
- `.unrender()` &mdash; removes instance's dynamic CSS.


### `.format(styles[, selector])`

Arguments

- `styles` &mdash; object of styles.
- `selector` &mdash; optional, selector string used to replace `&` references.

__Example 1__

```js
renderer.format({
  a: {
    ta: 'center'
  },
  div: {
    textAlign: 'center'
  },
  span: {
    'text-align': 'center'
  }
});
```

*Returns*

```css
a{text-align:center;}div{text-align:center;}span{text-align:center;}
```

__Example 2__

```js
renderer.format({
  display: 'block',
  '& > a': {
    td: 'underline'
  }
}, '.my-class')
```

*Returns*

```css
.my-class > a{text-decoration:underline;}.my-class{display:block;}
```


### `.renderAnon(styles)`

Simply renders global styles.

__Example__

```js
renderer.renderAnon({
  html: {
    col: 'red'
  }
});
```

Will inject into the page:

```css
html{color:red}
```


### `.renderStatic(Comp, template[, args])`

Renders static styles of some component; static styles are the ones that never change and
will always stay the same for that component.

Note, that `Comp` component does not have to be a React
component it can be any object that uniquely identifies some component.

Arguments:

- `Comp` &mdash; UI component.
- `template` &mdash; style object or a function that returns a style object.
- `args` &mdash; optional, array of arguments to provide to `template` if it is a function.

Returns a string containing a list of class names generated for that component.

__Example__

```js
const tpl = () => ({
    border: '1px solid tomato'
});

const classNames = renderer.renderStatic(MyButton, tpl);
```


### `.render(Comp, instance, el, tpl, args)`

Renders and re-renders dynamic styles of some component's instance. You can call this method
every time that component's instance re-renders.

Arguments

- `Comp` &mdash; component type or a constructor of some component.
- `instance` &mdash; instance of that component.
- `el` &mdash; optional, root DOM element of that component.
- `tpl` &mdash; style object or a function that returns a style object.
- `args` &mdash; optional, array of arguments to provide to `tpl` if it is a function.

`Comp` can be any object that uniquely identifies some UI component, it does not necessarily
have to be a React component.

`instance` is any object that uniquely identifies that component's rendered instance, it does
not have to be a React component instance.

`el` is an optional (use `null` otherwise) root DOM node reference of the component's instance used
for extra performance. If `el` is provided, renderer will try to use that node to apply inline
styles when possible and set [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
directly on this node for performance, instead of setting global CSS variables.

Returns a string, which is a list of class names you should apply to the root element of your
component's instance.

__Example__

```js
let App, instance, tpl;

tpl = () => ({
    border: '1px solid tomato'
});

App = () => {
    const classNames = renderer.render(App, instance, null, tpl, []);
    return <div className={classNames}>Hello world!</div>
};

instance = ReactDOM.render(<App />, el);
```

The dynamic `.render()` method can be called every time your component re-renders, which
allows your component's CSS to change with props or state of your component. The renderer
will generate actual CSS, so you can use media queries and all the other CSS features.


### `.unrender(Comp, instance, el)`

Removes dynamic styles created by `.render()` method. Call this
method when your component instance un-mounts, for example, in React you would
do that in [`.componentWillUnmount()` life-cycle hook](https://reactjs.org/docs/react-component.html#componentwillunmount).

Arguments `Comp`, `instance`, and `el` have the same semantics as in the `.render()` method.
