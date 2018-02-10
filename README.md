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

- *[fifth generation](./docs/en/feat/fifth-generation.md)*, *[lightweight](./docs/en/feat/lightweight.md)*, *[lightning fast](./docs/en/feat/fast.md)*, *[JIT CSS](./docs/en/feat/jit-css.md)*, *[code splitting](./docs/en/feat/code-splitting.md)*, *[dead code elimination](./docs/en/feat/dead-code-elimination.md)*, *[JavaScript variables](./docs/en/feat/variables.md)*

![Typing and autocompletion](./docs/assets/typing.gif)

## CSS Templates

- [__Scoped__ styles without selectors](./docs/en/feat/scoped.md)
- [__Nested__ selectors](./docs/en/feat/nesting.md)
- __[Mixins](./docs/en/feat/mixins.md)__
- __[Atoms](./docs/en/feat/atoms.md)__
- [__Media queries__, keyframes, ...](./docs/en/feat/media.md)
- [__Global__ styles](./docs/en/feat/global.md)
- [CSS __resets__](./docs/en/feat/resets.md)
- __[Theming](./docs/en/feat/theming.md)__


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

```js
import {
    css,
    styled,
    rule,
    StyleSheet,
    Component,
    hyperstyle,
    hoc,
    styleit,
    Styleit,
    jsxstyle,
    Box,
    Block,
    Inline,
    InlineBlock,
    Row,
    Column
} from 'freestyler';
```

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


## License

[Unlicense](./docs/en/LICENSE.md) &mdash; public domain.


-------

<div style="text-align:center"><center><i>Are you a freestyler?</i></center></div>


[npm-url]: https://www.npmjs.com/package/freestyler
[npm-badge]: https://img.shields.io/npm/v/freestyler.svg
[travis-url]: https://travis-ci.org/streamich/freestyler
[travis-badge]: https://travis-ci.org/streamich/freestyler.svg?branch=master
