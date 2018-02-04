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

