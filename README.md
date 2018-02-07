![libreact logo](./docs/assets/freestyler.png)

# freestyler

[![][npm-badge]][npm-url] [![][travis-badge]][travis-url]

[**5<sup>th</sup> generation**](./docs/en/generations.md) [React styling library][npm-url] &mdash;
it is *lightning fast*, *lean*, and with *gazillion* [__*feat*ures__](#feat).

```
        Yeah, straight from the top of my dome
            As I rock, rock, rock, rock, rock the microphone
                Yeah, straight from the top of my dome
                    As I rock, rock, rock, rock, rock the microphone...
```

- Bomfunk MC's &mdash; [Freestyler](https://www.youtube.com/watch?v=ymNFyxvIdaM)


## feat.

- [Fifth generation](./docs/en/feat/fifth-generation.md)
- [Lightweight](./docs/en/feat/lightweight.md)
- [Lightning fast](./docs/en/feat/fast.md)
- [JIT CSS](./docs/en/feat/jit-css.md)
- [Code splitting](./docs/en/feat/code-splitting.md)
- [Dead code elimination](./docs/en/feat/dead-code-elimination.md)
- [Variables](./docs/en/feat/variables.md)
- [Scoped styles without selectors](./docs/en/feat/scoped.md)
- [Nested selectors](./docs/en/feat/nesting.md)
- [Mixins](./docs/en/feat/mixins.md)
- [Media queries, keyframes, ...](./docs/en/feat/media.md)
- [Atoms](./docs/en/feat/atoms.md)
- [Global styles](./docs/en/feat/global.md)
- [CSS Resets](./docs/en/feat/resets.md)
- [*"Styled"* component generator](./docs/en/feat/styled-components.md)
- [Theming](./docs/en/feat/theming.md)


## Reference

- [Terminology](./docs/en/terminology.md)
- [Generations](./docs/en/generations.md)
- [Interfaces](./docs/en/interfaces.md)
- __Generic__ [Low-level API](./docs/en/low-level-api.md)
- __Generic__ [__3<sup>rd</sup> Generation Interfaces__](./docs/en/3rd-gen.md)
    - [`rule()` Interface](./docs/en/rule.md)
    - [`StyleSheet.create()` Interface](./docs/en/StyleSheet.md) with lazy rendering
    - [`hyperstyle()` `styleName` Interface](./docs/en/hyperstyle.md)
- __React.js__ [__4<sup>th</sup> Generation Interfaces__](./docs/en/4th-gen.md)
    - [`styled()()` Component Interface](./docs/en/styled.md)
    - [`@css` Static Class Decorator Interface](./docs/en/css-static-class-decorator.md)
    - [`@css()` Class Decorator Interface](./docs/en/css-class-decorator.md)
    - [`@css()` `.render()` Decorator Interface](./docs/en/css-render-decorator.md)
    - [`hoc()` Generator Interface](./docs/en/hoc-generator.md)
    - [`Component` Class Interface](./docs/en/component-class.md)
- __React.js__ [__5<sup>th</sup> Generation Interfaces__](./docs/en/5th-gen.md)
    - [`styleit()` and `<Styleit>` Interfaces](./docs/en/styleit.md)
    - [`jsxstyle()`, `<Block>`, `<Inline>`, `<InlineBlock>`, `<Row>`, and `<Column>` Interfaces](./docs/en/jsxstyle.md)
- [Environment variables](./docs/en/env-vars.md)


## Installation

<pre>
npm i <a href="https://www.npmjs.com/package/freestyler">freestyler</a> --save
</pre>


## Usage

<pre>
<span style="color:#d73a49">import</span> {
    <a href="https://github.com/streamich/freestyler/blob/master/docs/en/css-static-class-decorator.md">css</a>,
    <a href="https://github.com/streamich/freestyler/blob/master/docs/en/styled.md">styled</a>,
    <a href="https://github.com/streamich/freestyler/blob/master/docs/en/rule.md">rule</a>,
    <a href="https://github.com/streamich/freestyler/blob/master/docs/en/StyleSheet.md">StyleSheet</a>,
    <a href="https://github.com/streamich/freestyler/blob/master/docs/en/Component.md">Component</a>,
    <a href="https://github.com/streamich/freestyler/blob/master/docs/en/hyperstyle.md">hyperstyle</a>,
    <a href="https://github.com/streamich/freestyler/blob/master/docs/en/hoc.md">hoc</a>,
    <a href="https://github.com/streamich/freestyler/blob/master/docs/en/styleit.md">styleit</a>,
    <a href="https://github.com/streamich/freestyler/blob/master/docs/en/styleit.md">Styleit</a>,
    <a href="https://github.com/streamich/freestyler/blob/master/docs/en/jsxstyle.md">jsxstyle</a>,
    Box,
    Block,
    Inline,
    InlineBlock,
    Row,
    Column
} <span style="color:#d73a49">from</span> <span style="color:#032f62">'freestyler'</span>;
</pre>

Decorate *stateful* components.

```jsx
@css({
    border: '1px solid tomato',
})
class App extends Component {
    render () {
        return <div>Hello world!</div>;
    }
}
```

Or, create *"styled" stateless* components.

```jsx
const Bordered = styled.div({
    border: '1px solid tomato',
});
const App = () =>
    <Bordered>Hello world!</Bordered>;
```


## Packages

  - [`libreact`](https://github.com/MailOnline/libreact) &mdash; must-have utilities for every React project.
  - [`themestyler`](https://www.npmjs.com/package/themestyler) &mdash; theming primitives designed for `freestyler`, but can be used in any React project.
  - [`freestyler-context`](https://www.npmjs.com/package/freestyler-context) &mdash; generic React context pub/sub that shallowly merges contexts with the same name.
  - [`freestyler-observable`](https://www.npmjs.com/package/freestyler-observable) &mdash; observable factory.


## License

[Unlicense](./LICENSE) &mdash; public domain.


-------

<div style="text-align:center"><center><i>Are you a freestyler?</i></center></div>


[npm-url]: https://www.npmjs.com/package/freestyler
[npm-badge]: https://img.shields.io/npm/v/freestyler.svg
[travis-url]: https://travis-ci.org/streamich/freestyler
[travis-badge]: https://travis-ci.org/streamich/freestyler.svg?branch=master
