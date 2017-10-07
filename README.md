# freestyler

`freestyler` is a **fourth generation** [React](https://reactjs.org/) styling library; it is *lightning fast*, super lean (only few hundred
lines of code), and gives every freestyler a [gazillion of features](#feat).

```
    Yeah, straight from the top of my dome
    As I rock, rock, rock, rock, rock the microphone
    Yeah, straight from the top of my dome
    As I rock, rock, rock, rock, rock the microphone…
```

- Bomfunk MC's - [Freestyler](https://www.youtube.com/watch?v=ymNFyxvIdaM) 

## Feat

  - [Fourth generation](#fourth-generation)
  - [Lightweight](#lightweight)
  - Lightning fast
  - *"Styled"* component syntax
  - Theming
  - Media queries
  - HOC
  - FaCC
  - Render props
  - Lazy
  - Globals
  - Static styles
  - Dynamic styles
  - Variables
  - Mixins
  - Nested selectors
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

> ## Terminology
>
> **CSS template**
>
> A *CSS template* is a *plain* JavaScript object of the form:
>
> ```js
> const template = {
>     color: 'red',
>     'border-radius': '3px',
> };
> ```
>
> Or, it can be a function that returns a CSS template in object form, with the following signature:
>
> ```js
> const template = (props, state, context) => {
>     return {
>         color: 'red',
>         'border-radius': '3px',
>     };
> };
> ```
>
> **Static vs Dynamic templates**
>
> *Static template* is injected into the DOM only *once* and only when the component is actually rendered
> *for the first time*. It stays in the DOM forever.
>
> *Dynamic template* is updated on *every* re-render of a component and is removed from the DOM once the component
> in unmounted.
>
> **First generation**
> 
> First generation React styling don't allow you to write styling in JavaScript, instead, you have to use a *CSS pre-processor*.
>
>   - *Notable example*: [`css-modules`](https://github.com/css-modules/css-modules)
>
> **Second generation**
> 
> Second generation React styling libraries emit inline styles in `style` property of your JSX elements (i.e. use *inline styles*).
>
>   - *Notable example*: [`Radium`](https://github.com/FormidableLabs/radium)
>
> **Third generation**
> 
> Third generation React styling libraries emit CSS into DOM in `<style>` tags and generate unique scoped `className`
> properties, but the styles are *static*.
>
>   - *Notable examples*: [`aphrodite`](https://github.com/Khan/aphrodite), [`cssx`](https://github.com/krasimir/cssx)
>
> **Fourth generation**
> 
> Fourth generation React styling libraries also emit CSS into DOM `<style>` tags, but the styles are *dynamic*, 
> i.e. the CSS changes when `props` or `state` changes.
>
>   - *Notable examples*: `freestyler`, [`styled-components`](https://github.com/styled-components/styled-components), [`glamorous`](https://github.com/paypal/glamorous)
>
> **Fifth generation**
> 
> Please report any fifth generation React styling libraries, I know only of [fifth generation planes](https://en.wikipedia.org/wiki/Fifth-generation_jet_fighter).


### Fourth generation

`freestyler` is a 4.5th generation React styling library - it injects CSS into `<style>` tags at runtime, only when
your React component is being rendered for the first time and styles can dynamically depend on `props`, `state`, and `context`.

### Lightweight

`freestyler` itself is only a couple hundred lines of code and depends on [`css-light`](https://www.npmjs.com/package/css-light)
which is only hundred lines of code.

### Lightning fast

`freestyler` should be much faster than [`styled-components`](https://github.com/styled-components/styled-components) (I hope so, fingers crossed, somebody pls bench).

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

### Atoms

> R.I.P. [`absurdjs`](https://github.com/krasimir/absurd), your [Atoms](http://absurdjs.com/pages/css-preprocessing/organic-css/atoms/) will be in our hearts forever.

Are you a freestyler?
