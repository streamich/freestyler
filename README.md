# freestyler

`freestyler` is a [**fifth generation**](#fifth-generation) [React](https://reactjs.org/) styling library; it is *lightning fast*, super lean (only few hundred
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
  - [Just-in-time CSS](#just-in-time-css)
  - [Code splitting](#code-splitting)
  - [Dead code elimination](#dead-code-elimination)
  - [Variables](#variables)
  - [Scoped styles without selectors](#scoped-styles)
  - [Nested selectors](#nesting-selectors)
  - [Mixins](#mixins)
  - [Media queries, keyframes, ...](#media-queries)
  - [Atoms](#atoms)
  - [Global styles](#global-styles)
  - [CSS Resets](#css-resets)
  - [ ] TODO: Static styles
  - [ ] TODO: Dynamic styles
  - [*"Styled"* component generator](#styled-components)
  - [HOC generator](#hoc-generator)
  - [Theming](#theming)
  - [ ] TODO: FaCC
  - [ ] TODO: Render props
  - [ ] TODO: Excellent DX
  - [ ] TODO: Auto-prefixer
  - [ ] TODO: Avoids specificity conflicts
  - [ ] TODO: Source order independence
  - [ ] TODO: Highly expressive
  - [ ] TODO: Browser state styles to support `:hover`, `:focus`, and `:active`
  - [ ] TODO: Middleware
  - [ ] TODO: Uses CSS variables for dynamic templates
  - [ ] TODO: Testing, snapshots

# Example

First import the library:

```js
import {css} from 'freestyler';
```

Style *stateful* components:

```jsx
class App extends Component {
    @css({
        border: '1px solid red',
    })
    render () {
        return <div>Hello world!</div>;
    }
}
```

Create *"styled"* components:

```jsx
const Bordered = css.div({
    border: '1px solid red',
});

const App = () => <Bordered>Hello world!</Bordered>;
```

-----


# Terminology

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
const template = (props, state, context) => {
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

*Notable examples*:

  - [`aphrodite`](https://github.com/Khan/aphrodite)
  - [`cssx`](https://github.com/krasimir/cssx)
  - [`glamor`](https://github.com/threepointone/glamor)

**Fourth generation**

Just like 3rd generation libraries, fourth generation React styling libraries also emit CSS into DOM `<style>` tags, 
but the styles are *dynamic*, i.e. the CSS changes when `props` or `state` of you component changes.

*Notable examples*:

  - [`styled-components`](https://github.com/styled-components/styled-components)
  - [`glamorous`](https://github.com/paypal/glamorous)
  
*Note: please report any other 4th gen solutions.*

**Fifth generation**

Fifth generation React styling libraries have all the features of fourth generation but the templates are even more 
dynamic (similar to how FaCCs are more dynamic than HOCs):

  - Styled components can be created dynamically inside `render` functions
  - The css template can change dynamically at any point, even inside the `render` functions or in FaCC functions

*Notable example*:
  
  - `freestyler`
  
*Note: please report any other 5th gen solutions.*
  
Please report any other fifth generation React styling libraries, 
I have found only [fifth generation planes](https://en.wikipedia.org/wiki/Fifth-generation_jet_fighter).

-----

# Features



### Fifth generation

`freestyler` is 5th generation React styling library - it injects CSS into `<style>` tags at runtime, only when
your React component is being rendered for the first time and styles dynamically depend not only on `props`, `state`, and `context`,
but also the CSS template itself can be changed dynamically.




### Lightweight

Smallest footprint *"css-in-js"* library, `freestyler` is only few hundred lines of code it is 
based on [`css-light`](https://www.npmjs.com/package/css-light), which itself is only one hundred lines of code.




### Lightning fast

`freestyler` could be really fast (I hope so, fingers crossed, somebody pls bench).
It has different pluggable [*renderers*](#renderers), so performance will only improve in the future.


### Just-in-time CSS

`freestyler` will not emit any CSS into the DOM if it is not used. It emits CSS only when a component is rendered for
the first time. It also cleans-up CSS after component un-mounts (depends on the [renderer](#renderer)), so if you unmount
all your React components all the CSS will disappear as well, magic!



### Code splitting

When your CSS lives right next with your components you get CSS code-splitting out-of-the box.




### Dead code elimination

Your component's CSS lives right next to the `render()` function, if you delete the component, CSS goes with it.






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



### Scoped styles

Simply write CSS declarations without class names, your components will be scoped and assigned a class name automatically:

```js
const template = (props) => ({
    color: 'red',
    background: props.theme.background,
});
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



### Media queries

Use `@media` queries `@keyframes` and other CSS at-rules:

```js
const template = {
    color: 'red',
    '@media (max-width: 1200px)': {
        color: 'tomato',
    },
};
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
const atoms = {
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

`freestyler` exposes a convenience function `global(static, dynamic)` to emit global styles:

```js
import {global} from 'freestyler/globals';

const CssReset = global({
    '*': {
        pad: 0,
        mar: 0,
    }
});

<CssReset />
```

Here is how you can create a simplified version yourself:

```jsx
const Null = () => null;
const global = template => css.styled(Null)({':global': template});
```

You can use it to, for example, write your own CSS reset, or use [one of many shipped with `freestyler`](#css-resets):

```jsx
import {global} from 'freestyler/globals';

const CssReset = global({
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
import {global} from 'freestyler/globals';

const DynamicGlobalStyles = global(null, ({background, theme}) => ({
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
import {global} from 'freestyler/globals';

const Style = ({children}) => {
    const EmitCss = global(null, () => children);
    return <EmitCss/>;
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
// Is Neo the chosen one? Or is it papa biceps?
```



### CSS Resets

`freestyler` ships with a collection of CSS resets for your pleasure:

  - [`<CssResetEricMeyer/>`](./packages/freestyler/src/globals/CssResetEricMeyer.ts)
  - [`<CssResetEricMeyerCondensed/>`](./packages/freestyler/src/globals/CssResetEricMeyerCondensed.ts)
  - [`<CssResetMinimalistic/>`](./packages/freestyler/src/globals/CssResetMinimalistic.ts)
  - [`<CssResetMinimalistic2/>`](./packages/freestyler/src/globals/CssResetMinimalistic2.ts)
  - [`<CssResetMinimalistic3/>`](./packages/freestyler/src/globals/CssResetMinimalistic3.ts)
  - [`<CssResetShaunInman/>`](./packages/freestyler/src/globals/CssResetShaunInman.ts)
  - [`<CssResetSiolon/>`](./packages/freestyler/src/globals/CssResetSiolon.ts)
  - [`<CssResetTantek/>`](./packages/freestyler/src/globals/CssResetTantek.ts)
  - [`<CssResetTripoli/>`](./packages/freestyler/src/globals/CssResetTripoli.ts)
  - [`<CssResetUniversal/>`](./packages/freestyler/src/globals/CssResetUniversal.ts)
  - [`<CssResetYahoo/>`](./packages/freestyler/src/globals/CssResetYahoo.ts)
  - [ ] TODO: Add [`glamor` CSS reset](https://github.com/threepointone/glamor/blob/master/src/reset.js)

Here is how you use them:

```jsx
import CssResetEricMeyer from 'freestyler/globals/CssResetEricMeyer';

const App = () =>
    <div>
        <CssResetEricMeyer/>
        Look, Ma, frameborder has gone!
    </div>
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




### Theming

One of core objectives of `freestyler` is to be super-lightweight, therefore, theming has be extracted into
a separate package [`themestyler`](./packages/themestyler/).

It is a generic React theme manager you can use in any project, but works best with `freestyler`.

Create a theme:

```jsx
import {Theme} from 'themestyler';

const theme = {
    color: 'tomato',
};

const App = () =>
    <Theme value={theme}>
        {/* ... */}
    </Theme>;
```

Consume theme using HOC pattern:

```jsx
import {themed} from 'themestyler';

const Box = css.div(({theme}) => ({
    color: theme.color,
}));

const BoxThemed = themed(Box);

<BoxThemed>BOX</BoxThemed>
```

Or use the FaCC pattern:

```jsx
import {Themed} from 'themestyler';

<Themed>{(theme) => (
    <div style={{color: theme.color}}>BOX</div>;
)}</Themed>
```




# 4th Generation vs 5th Generation styling libraries

To put it simply, the 4th generation CSS styling libraries is a function of props:

    (props) => CSS
    
In `freestyler` the template is a closure that is being return by another level of functions:

    () => (props) => CSS
    
This way the template (`(props) => CSS`) itself can be changed at any time.


# Packages

  - `themestyler` - theming primitives designed for `freestyler`, but can be used in any React project.
  - `freestyler-context` - generic React context pub/sub that shallowly merges contexts with the same name.
  - `freestyler-observable` - observable factory.


-------



Are you a freestyler?
