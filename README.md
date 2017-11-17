# freestyler

[![][npm-badge]][npm-url] [![][travis-badge]][travis-url]

[npm-url]: https://www.npmjs.com/package/freestyler
[npm-badge]: https://img.shields.io/npm/v/freestyler.svg
[travis-url]: https://travis-ci.org/streamich/freestyler
[travis-badge]: https://travis-ci.org/streamich/freestyler.svg?branch=master


[`freestyler`][npm-url] is a [**fifth generation**](#fifth-generation) [React](https://reactjs.org/) styling library;
it is *lightning fast*, super lean and gives every freestyler a [gazillion of features](#feat).

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
    - [ ] Use `$` for nesting
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
  - [ ] TODO: Uses CSS variables for dynamic templates
  - [ ] TODO: Testing, snapshots
  - [ ] TODO: Middleware
  - [ ] TODO: Renderers
  - [ ] TODO: Type-safe, typescript support
  - [ ] TODO: Use ["virtual CSS"](https://ryantsao.com/blog/virtual-css-with-styletron) in static templates

# Usage

Install:

    npm install --save freestyler themestyler
    yarn add freestyler themestyler

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

### Reference

  - API
    - React
      - 5th generation:
        - `styleit` syntax
        - `jsxstyle`
        - `facc` generator
      - 4th generation:
        - `styled` components
        - `@css` class decorator
        - `@css` render method decorator
        - `hoc` generator
        - Radium
        - Component
        - hyperstyle
        - connect (HOC)
    - [ ] TODO: P4 Components
    - [ ] TODO: Vue.js
    - [ ] TODO: Angular 4
    - Generic, 3rd generation class name scoping:
      - `rule` pattern
      - `StyleSheet` with lazy rendering
  - Low-level
    - `Renderer`
    - [ ] TODO: AST
    - [ ] TODO: Middleware

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

First generation React styling libraries don't allow you to write styling in JavaScript, instead, you have to use *CSS pre-processors*.

  - *Notable example*: [`css-modules`][lib-css-modules]

**Second generation**

Second generation React styling libraries emit inline styles in `style` property of your JSX elements (i.e. use *inline styles*).

  - *Notable example*: [`Radium`][lib-radius]

**Third generation**

Third generation React styling libraries allow you to write CSS in JavaScript and emit CSS into
DOM in `<style>` tags and generate unique scoped `className` properties. However, the style templates are *static*,
they are defined in module scope, thus they don't depend component `props`.

*Examples*: [`aphrodite`][lib-aphrodite], [`cssx`][lib-cssx], [`glamor`][lib-glamor], [`typestype`][lib-typestype], [`styletron`](lib-styletron)

**Fourth generation**

Just like 3rd generation libraries, fourth generation React styling libraries also emit CSS into DOM `<style>` tags,
but the styles are *dynamic*, i.e. the CSS changes when `props` or `state` of your component changes.

*Examples*: [`styled-components`][lib-styled-components], [`glamorous`][lib-glamorous]

*Note: please report any other 4th gen solutions.*

**Fifth generation**

Fifth generation React styling libraries have all the features of fourth generation but the templates are even more
dynamic (similar to how FaCCs are more dynamic than HOCs):

  - Styled components can be created dynamically inside `render` functions
  - The css template can change dynamically at any point, even inside the `render` functions or in FaCC functions

*Examples*: [`freestyler`][lib-freestyler], [`style-it`][lib-style-it], [`superstyle`][lib-superstyle]



[lib-css-modules]: https://github.com/css-modules/css-modules
[lib-radium]: https://github.com/FormidableLabs/radium
[lib-aphrodite]: https://github.com/Khan/aphrodite
[lib-cssx]: https://github.com/krasimir/cssx
[lib-glamor]: https://github.com/threepointone/glamor
[lib-typestype]: https://github.com/typestyle/typestyle
[lib-styletron]: https://github.com/rtsao/styletron
[lib-styled-components]: https://github.com/styled-components/styled-components
[lib-glamorous]: https://github.com/paypal/glamorous
[lib-restyles]: https://github.com/tkh44/restyles
[lib-freestyler]: https://github.com/streamich/freestyler
[lib-style-it]: https://github.com/buildbreakdo/style-it
[lib-superstyle]: https://github.com/jxnblk/superstyle

*Note: Please report any other fifth generation React styling libraries,
Not [fifth generation planes](https://en.wikipedia.org/wiki/Fifth-generation_jet_fighter).*

|Generation|Libraries|
|----------|---------|
|First generation|`css-modules`|
|Second generation|`Radium`|
|Third generation|`aphrodite`, `glamor`, `jsxstyle`, `styletron`|
|Fourth generation|`styled-components`, `glamorous`|
|Fifth generation|`freestyler`, [`style-it`][lib-style-it], [`superstyle`][lib-superstyle]|

[API](#api) patterns:

|Usage|Libraries|
|-----|---------|
|*style-it* pattern|[`freestyler`][lib-freestyler], [`style-it`][lib-style-it]|
|CSS as props|[`freestyler`][lib-freestyler], [`jsxstyle`][]|
|Render props|[`restyles`][lib-restyles]|
|rule pattern|[`freestyler`][lib-freestyler], [`jsxstyle`][]|


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

`freestyler` template selectors can be nested arbitrarily deep. However, don't overuse this feature, multiple levels deep selectors is an anti-patter in React.

Use `$` syntax for nesting:

```js
const template = {
    color: 'red',
    $item: {
        'border-left': '1px solid green',
    },
};
```

Use `&` operand for nesting, it is expanded into the parent selector:

```js
const template = {
    color: 'red',
    '& > div': {
        background: '#eee',
    },
    '& .item': {
        'border-left': '1px solid green',
    },
};
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

Atoms are shorthand notations for common CSS rules. For example, instead of writing

```js
const template = {
    width: '100px',
    height: '100px',
    'border-radius': '5px',
    'background-color': 'yellow',
};
```

you can instead write:

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
you can emit global styles:

```jsx
class Button extends Component {
    @css({
        '.btn-rendered': {
            // ...
        }
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
        // Change global styles dynamically as `theme` mutates.
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

`freestyler` allows you to write *presentational* components using the "styled component" syntax:

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
a separate package [`themestyler`](./packages/themestyler/). It is a generic React theme manager you can use
in any project, but works best with `freestyler`.

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

To put it simply, a CSS template in 4th generation styling libraries is a function of props:

    (props) => CSS

In `freestyler` the template is a closure that is being returned by another function:

    () => (props) => CSS

This way the template `(props) => CSS` itself is a variable.





# Packages

  - `themestyler` - theming primitives designed for `freestyler`, but can be used in any React project.
  - `freestyler-context` - generic React context pub/sub that shallowly merges contexts with the same name.
  - `freestyler-observable` - observable factory.


# Environment variables

  - `FREESTYLER_NUMBERS_TO_PX` - if set, `freestyler` will convert number values of declartions that
  are not unitless to pixel units, like `width: 100` will be converted to `width: '100px'`. It will
  ignore unitless declarations, for example, `zIndex: 10` will stay `zIndex: 10`.
  - `FREESTYLER_JSXSTYLE_MEDIA_QUERIES` - if set, enables `jsxstyle` media query syntax in addition
  to regular media query syntax.

# Reference

  - [ ] TODO: Primitives
  - [ ] TODO: `wrap`
  - [ ] TODO: Low-level API
  - [ ] TODO: Middleware
  - [ ] TODO: Renderers
  - [ ] TODO: Add env var for adding `!import` to all rules just like `aphrodite`.



-------



Are you a freestyler?
