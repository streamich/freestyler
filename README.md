# freestyler

`freestyler` is a **fifth generation** [React](https://reactjs.org/) styling library; it is *lightning fast*, super lean (only few hundred
lines of code), and gives every freestyler a [gazillion of features](#feat).

```
    Yeah, straight from the top of my dome
    As I rock, rock, rock, rock, rock the microphone
    Yeah, straight from the top of my dome
    As I rock, rock, rock, rock, rock the microphone…
```

- Bomfunk MC's - [Freestyler](https://www.youtube.com/watch?v=ymNFyxvIdaM) 

## feat.

  - [Fifth generation](#fifth-generation)
  - [Lightweight](#lightweight)
  - [Lightning fast](#lightning-fast)
  - [Variables](#variables)
  - [Nested selectors](#nesting-selectors)
  - [Mixins](#mixins)
  - [Global styles](#global-styles)
  - *"Styled"* component syntax
  - Theming
  - Media queries
  - [HOC generator](#hoc-generator)
  - FaCC
  - Render props
  - Lazy
  - Static styles
  - Dynamic styles
  - Excellent DX
  - Auto-prefixer (pluggable by env vars);
  - Atoms
  - Smallest footprint *"css-in-js"* library
  - Scoped styles without selectors
  - Avoids specificity conflicts
  - Source order independence
  - Dead code elimination
  - Highly expressive
  - Keyframes animation helper
  - Browser state styles to support `:hover`, `:focus`, and `:active`
  - middleware


-----


## Terminology

**CSS template**

A *CSS template* is a *plain* JavaScript object of the form:

```js
const template = {
    color: 'red',
    'border-radius': '3px',
};
```

Or, it can be a function that returns a CSS template in object form, with the following signature:

```js
const template = (props, state, context) = {
    return {
        color: 'red',
        'border-radius': '3px',
    };
};
```

**Static vs Dynamic templates**

*Static template* is injected into the DOM only *once* and only when the component is actually rendered
*for the first time*. It stays in the DOM until there is at least one mounted component that uses that template.

*Dynamic template* is updated on *every* re-render of a component it is specific to that components instance
and is removed from the DOM once the component in unmounted.

**First generation**

First generation React styling libraries don't allow you to write styling in JavaScript, instead, you have to use a *CSS pre-processors*.

  - *Notable example*: [`css-modules`](https://github.com/css-modules/css-modules)

**Second generation**

Second generation React styling libraries emit inline styles in `style` property of your JSX elements (i.e. use *inline styles*).

  - *Notable example*: [`Radium`](https://github.com/FormidableLabs/radium)

**Third generation**

Third generation React styling libraries allow you to write CSS in JavaScript and emit CSS into
DOM in `<style>` tags and generate unique scoped `className` properties. However, the style templates are *static*,
they are defined in module scope, thus they don't depend component `props`.

  - *Notable examples*: [`aphrodite`](https://github.com/Khan/aphrodite), [`cssx`](https://github.com/krasimir/cssx)

**Fourth generation**

Just like 3rd generation libraries, fourth generation React styling libraries also emit CSS into DOM `<style>` tags, 
but the styles are *dynamic*, i.e. the CSS changes when `props` or `state` of you component changes.

  - *Notable examples*: [`styled-components`](https://github.com/styled-components/styled-components), [`glamorous`](https://github.com/paypal/glamorous)

**Fifth generation**

Fifth generation React styling libraries have all the features of fourth generation but the templates are even more 
dynamic (similar to how FaCCs are more dynamic than HOCs):

  - Styled components can be created dynamically inside `render` functions
  -  

  - *Notable example*: `freestyler`
  
Please report any other fifth generation React styling libraries, 
I have found only [fifth generation planes](https://en.wikipedia.org/wiki/Fifth-generation_jet_fighter).

-----

# Features

### Fifth generation

`freestyler` is 5th generation React styling library - it injects CSS into `<style>` tags at runtime, only when
your React component is being rendered for the first time and styles dynamically depend not only on `props`, `state`, and `context`,
but also the CSS template itself can be changed dynamically.

### Lightweight

`freestyler` itself is only a couple hundred lines of code and depends on [`css-light`](https://www.npmjs.com/package/css-light)
which is only one hundred lines of code.

### Lightning fast

`freestyler` should be much faster than [`styled-components`](https://github.com/styled-components/styled-components) (I hope so, fingers crossed, somebody pls bench).

### Variables

Use JavaScript variables in your CSS templates:

```js
const color = 'red';
const border = `${borderWidth}px solid red`;
const template = {
    color,
    border,
    background: '#eee',
}
```

### Mixins

Use JavaScript's spread syntax for mixing:

```js
const mixinRedText = {
    color: 'red',
};
const template = {
    ...mixinRedText,
    background: '#eee',
};
```

### Nesting selectors

`freestyler` template selectors can be nested arbitrarily deep. However, don't overuse this feature, multiple levels
deep selectors is an anti-patter in React.

Nesting example:

```js
const template = {
    color: 'red',
    '> div': {
        background: '#eee',
    },
    '> .item': {
        'border-left': '1px solid green',
    },
};
```

The `&` operand allows you reference the parent selector:

```js
const template = props => ({
    color: 'red',
    '&:hover': {
        color: props.color,
    }
});
```

`&` can be placed anywhere in the selector string, so you can even reference global parent class names:

```js
const template = {
    color: 'red',
    '.is-mobile &': {
        color: 'blue',
    }
};
```

### Styled components

`freestyler` allows you to write *"presentational"* components using the "styled component" syntax:

```js
const RedText = css.span({
    color: 'tomato',
});

const Bordered = css.div({
    border: '1px solid papayawhip',
});
```

Style any HTML tag, for example, `<nav>`:

```js
const MyNavigation = css.styled('nav')({
    background: 'palevioletred',
});
```

Reference:

```js
css.span(staticTemplate, dynamicTemplate);
css.div(staticTemplate, dynamicTemplate);
css.styled(tagName)(staticTemplate, dynamicTemplate);
```

### Global styles

Global styling is an anti-pattern, use them sparingly. In all CSS templates 
you can use `:global` or `_` escape hatch to emit global styles:

```jsx
class Button extends Component {
    @css({
        ':global': {
            '.btn-rendered': {
                // ...
            }
        },
    })
    render() {
        // ...
    }
}
```

To make your component's styles conditional on some parent global class name, better use
nesting operand `&` instead of global styles (however it is an anti-pattern as well):

```jsx
const Frame = css.styled({
    '.is-mobile &': {
        // Make the frame look different on mobile.
    }
});
```

You can use this feature to create a HOC that will allow you to just emit global CSS:

```jsx
const Null = () => null;
const GlobalCssHoc = (staticTemplate, dynamic) =>
    css.styled(Null)({_: staticTemplate}, (...args) => ({_: dynamic ? dynamic(...args) : {}}));
```

Now set some basic global styles for your App:

```jsx
const GlobalStyles = GlobalCssHoc({
    body: {
        'font-family': 'monospace',
        // More global styling...
    }
});

<GlobalStyles />
```

CSS reset:

```jsx
const CssReset = GlobalCssHoc({
    html: {
        bxz: 'border-box',
        fz: '16px',
    },
    '*, *:before, *:after': {
        bxz: 'inherit',
    },
    'body, h1, h2, h3, h4, h5, h6, p, ol, ul': {
        mar: 0,
        pad: 0,
        fw: 'normal',
    },
});

<CssReset />
```

Customize global styles with props and make global styles change dynamically
as your theme changes:

```jsx
const DynamicGlobalStyles = GlobalCssHoc(null, ({background, theme}) => ({
    body: {
        background,
        // Change globa styles dynamically as `theme` mutates.
        col: theme.textColor,
    }
}));

<DynamicGlobalStyles background="#eee" />
```

Create a *css-prop* `<Style>` component:

```jsx
const Style = ({children}) => {
    const EmitCss = GlobalCssHoc(null, () => children);
    return h(EmitCss);
};
```

Now use it anywhere in your JSX like this:

```jsx
// Matrix theme.
<div>
    <Style>{{
        body: {
            background: 'black',
            color: 'green',            
        }
    }}</Style>
</div>
```

### Atoms

Atoms are a shorthand notation for common CSS rules. For example, instead of writing

```js
const template = {
    width: '100px',
    height: '100px',
    'border-radius': '5px',
    'background-color': 'yellow',
};
```

you can instead use atoms:

```js
const template = {
    w: '100px',
    h: '100px',
    bdrad: '5px',
    bgc: 'yellow',
};
```

List of supported atoms:

```js
{
    d:      'display',
    mar:    'margin',
    mart:   'margin-top',
    marr:   'margin-right',
    marb:   'margin-bottom',
    marl:   'margin-left',
    pad:    'padding',
    padt:   'padding-top',
    padr:   'padding-right',
    padb:   'padding-bottom',
    padl:   'padding-left',
    bd:     'border',
    bdt:    'border-top',
    bdr:    'border-right',
    bdb:    'border-bottom',
    bdl:    'border-left',
    bdrad:  'border-radius',
    col:    'color',
    op:     'opacity',
    bg:     'background',
    bgc:    'background-color',
    fz:     'font-size',
    fs:     'font-style',
    fw:     'font-weight',
    ff:     'font-family',
    lh:     'line-height',
    bxz:    'box-sizing',
    cur:    'cursor',
    ov:     'overflow',
    pos:    'position',
    ls:     'list-style',
    ta:     'text-align',
    td:     'text-decoration',
    fl:     'float',
    w:      'width',
    h:      'height',
    trs:    'transition',
    out:    'outline',
    vis:    'visibility',
    ww:     'word-wrap',
    con:    'content',
}
```
> R.I.P. [`absurdjs`](https://github.com/krasimir/absurd), your [Atoms](http://absurdjs.com/pages/css-preprocessing/organic-css/atoms/) will be in our hearts forever.

## 4th Generation vs 5th Generation styling libraries



Are you a freestyler?
