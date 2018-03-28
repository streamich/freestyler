# Generations

The most important factor that differentiates CSS-in-JS libraries is how dynamic they are. By that we
mean whether a CSS-in-JS library can use JavaScript variables in its templates, and &mdash; if so &mdash;
to what scope of variables those templates have access to? Module scope? Component scope? Or maybe
`.render()` method scope?

Below we define five generations of CSS-in-JS libraries based on their template dynamicity and whether they
use inline styles or inject actual CSS; starting from generation one &mdash; for the most static libraries &mdash;
and going all the way up to generation five. Although not strictly true, this also corresponds to how React
styling libraries evolved over time.


## 1<sup>st</sup> Generation

First generation React styling libraries don't allow you to write styling in JavaScript and use any of
JavaScript variables, instead, you have to use *CSS pre-processors*. The CSS source files are usually
located in separate `.*css` files.

  - *Notable example*: [`css-modules`][lib-css-modules]


## 2<sup>nd</sup> Generation

Second generation React styling libraries emit __inline styles__ in `style` property of your React
elements, but are very dynamic, because they can use even `.render()` method scope variables. However,
they use inline styles, thus, you don't get all the benefits of CSS.

  - *Notable example*: [`Radium`][lib-radium]


## 3<sup>rd</sup> Generation

Third generation React styling libraries allow you to write CSS templates in JavaScript and inject actual *CSS* into
DOM `<style>` tags. However, the templates are *static*,
in a sense that they are defined in __module scope__, and thus they can't use component `props`. The reason why they are "static" is
because they have access only to module scope JavaScript variables, which evaluate only once when the module is imported for the first time.

*Examples*: [`aphrodite`][lib-aphrodite], [`cssx`][lib-cssx], [`glamor`][lib-glamor], [`typestype`][lib-typestype], [`styletron`](lib-styletron)


## 4<sup>th</sup> Generation

Just like 3<sup>rd</sup> generation libraries, fourth generation React styling libraries also emit CSS into DOM `<style>` tags,
but their templates are more *dynamic* because they have access to __component scope__ variables, such as `props` and `state`. Fourth generation
templates normally also re-render on every component prop or state change.

*Examples*: [`styled-components`][lib-styled-components], [`glamorous`][lib-glamorous]


## 5<sup>th</sup> Generation

Fifth generation React styling libraries are even more dynamic than fourth generation, fifth generation libraries
can use JavaScript variables from component's __`.render()` function scope__.

*Examples*: [`freestyler`][lib-freestyler], [`style-it`][lib-style-it], [`superstyle`][lib-superstyle]


## Summary

|Generation|Emits CSS|Module scope variables|Component scope variables|Render method scope variables|
|----------|---------|----------------------|-------------------------|-----------------------------|
|1<sup>st</sup> Generation|✅|❌|❌|❌|
|2<sup>nd</sup> Generation|❌|✅|✅|✅|
|3<sup>rd</sup> Generation|✅|✅|❌|❌|
|4<sup>th</sup> Generation|✅|✅|✅|❌|
|5<sup>th</sup> Generation|✅|✅|✅|✅|


## Survey


Libraries grouped by generation.

  - __1<sup>st</sup> Generation__
    - [`css-modules`][lib-css-modules], [`babel-plugin-css-in-js`][lib-babel-plugin-css-in-js], [`bloody-react-styled`][lib-bloody-react-styled],
    [`css-loader`][lib-css-loader], and [`lib-css-ns`][lib-css-ns]
  - __2<sup>nd</sup> Generation__
    - [`Radium`][lib-radium]
  - __3<sup>rd</sup> Generation__
    - [`aphrodite`][lib-aphrodite], [`glamor`][lib-glamor], [`jsxstyle`][lib-jsxstyle], [`styletron`][lib-styletron], [`Classy`][lib-classy],
    [`csjs`][lib-csjs], [`css-constructor`][lib-css-constructor], [`hyperstyles`][lib-hyperstyles], [`styletron`][lib-styletron]
  - __4<sup>th</sup> Generation__
    - [`styled-components`][lib-styled-components], [`glamorous`][lib-glamorous]
  - __5<sup>th</sup> Generation__
    - [`freestyler`][lib-freestyler], [`jsxstyle`][lib-jsxstyle], [`style-it`][lib-style-it], [`superstyle`][lib-superstyle]

[lib-css-modules]: https://github.com/css-modules/css-modules
[lib-babel-plugin-css-in-js]: https://github.com/martinandert/babel-plugin-css-in-js
[lib-bloody-react-styled]: https://github.com/martinandert/babel-plugin-css-in-js
[lib-classy]: https://github.com/inturn/classy
[lib-csjs]: https://github.com/rtsao/csjs
[lib-css-constructor]: https://github.com/siddharthkp/css-constructor
[lib-css-loader]: https://github.com/webpack-contrib/css-loader
[lib-css-ns]: https://github.com/jareware/css-ns
[lib-jsxstyle]: https://github.com/smyte/jsxstyle
[lib-hyperstyles]: https://github.com/colingourlay/hyperstyles
[lib-radium]: https://github.com/FormidableLabs/radium
[lib-aphrodite]: https://github.com/Khan/aphrodite
[lib-bloody-react-styled]: https://github.com/bloodyowl/react-styled
[lib-cssx]: https://github.com/krasimir/cssx
[lib-glamor]: https://github.com/threepointone/glamor
[lib-jsxstyle]: https://github.com/smyte/jsxstyle
[lib-typestype]: https://github.com/typestyle/typestyle
[lib-styletron]: https://github.com/rtsao/styletron
[lib-styled-components]: https://github.com/styled-components/styled-components
[lib-glamorous]: https://github.com/paypal/glamorous
[lib-restyles]: https://github.com/tkh44/restyles
[lib-freestyler]: https://github.com/streamich/freestyler
[lib-style-it]: https://github.com/buildbreakdo/style-it
[lib-superstyle]: https://github.com/jxnblk/superstyle
[lib-styletron]: https://github.com/rtsao/styletron
[lib-styled-jsx]: https://github.com/zeit/styled-jsx
[lib-css-modules]: https://github.com/css-modules/css-modules
[lib-radium]: https://github.com/FormidableLabs/radium
[lib-aphrodite]: https://github.com/Khan/aphrodite
[lib-glamor]: https://github.com/threepointone/glamor
[lib-styled-components]: https://github.com/styled-components/styled-components
[lib-glamorous]: https://github.com/paypal/glamorous
[lib-restyles]: https://github.com/tkh44/restyles
[lib-style-it]: https://github.com/buildbreakdo/style-it
