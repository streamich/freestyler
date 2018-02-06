# Terminology


## CSS-like Object

A *CSS-like* object is a *plain* JavaScript object of the following form in kebab-case.

```js
const template = {
    color: 'red',
    'border-radius': '3px',
};
```

Or in camel-case.

```js
const template = {
    color: 'red',
    borderRadius: '3px',
};
```

Or using [atoms](./feat/atoms.md).

```js
const template = {
    col: 'red',
    bdrad: '3px',
};
```


## CSS Template

A *CSS template* is a function that returns a CSS-like object.

```js
(props, state, context) => {
    return {
        color: 'red',
        'border-radius': '3px',
    };
};
```

Or sometimes:

```js
({props, state, context}) => {
    return {
        color: 'red',
        'border-radius': '3px',
    };
};
```


## Static Template

*Static template* is injected into the DOM only *once* and only when the component is actually rendered
*for the first time*. It stays in the DOM until there is at least one mounted component that uses that template.


## Dynamic Template

*Dynamic template* is updated on *every* re-render of a component it is specific to that component's instance
and is removed from the DOM once the component in unmounted.


## 1<sup>st</sup> Generation

First generation React styling libraries don't allow you to write styling in JavaScript, instead,
you have to use *CSS pre-processors*. The CSS source file is stored in a separate `.*css` file.

  - *Notable example*: [`css-modules`][lib-css-modules]


## 2<sup>nd</sup> Generation

Second generation React styling libraries emit __inline styles__ in `style` property of your JSX
elements.

  - *Notable example*: [`Radium`][lib-radium]



## 3<sup>rd</sup> Generation

Third generation React styling libraries allow you to write CSS in JavaScript and inject __CSS__ into
DOM in `<style>` tags and generate unique scoped `className` properties. However, the style templates are *static*,
they are defined in module scope, thus they don't depend component `props`. The reason why they are "static" is
because they have access only to module scope JavaScript variables, that can be determined using static code analysis
tools, third generation templates evaluate once when module is used for the first time.

*Examples*: [`aphrodite`][lib-aphrodite], [`cssx`][lib-cssx], [`glamor`][lib-glamor], [`typestype`][lib-typestype], [`styletron`](lib-styletron)


## 4<sup>th</sup> Generation

Just like 3rd generation libraries, fourth generation React styling libraries also emit CSS into DOM `<style>` tags,
but the styles are *dynamic*, i.e. the CSS changes when `props` or `state` of your component changes.

*Examples*: [`styled-components`][lib-styled-components], [`glamorous`][lib-glamorous]


## 5<sup>th</sup> Generation

Fifth generation React styling libraries are even more dynamic than fourth generation, fifth generation libraries
can use JavaScript variables from component's `.render()` function scope.

*Examples*: [`freestyler`][lib-freestyler], [`style-it`][lib-style-it], [`superstyle`][lib-superstyle]


*Summary*

|Generation|Supports CSS|Module scope variables|Component scope variables|Render method scope variables|
|----------|------------|----------------------|-------------------------|-----------------------------|
|1<sup>st</sup> Genration|✅|❌|❌|❌|
|2<sup>nd</sup> Genration|❌|✅|✅|✅|
|3<sup>rd</sup> Genration|✅|✅|❌|❌|
|4<sup>th</sup> Genration|✅|✅|✅|❌|
|5<sup>th</sup> Genration|✅|✅|✅|✅|



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
