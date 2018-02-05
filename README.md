![libreact logo](./docs/assets/freestyler.png)

# freestyler

[![][npm-badge]][npm-url] [![][travis-badge]][travis-url]

[**5<sup>th</sup> generation**](#fifth-generation) [React styling library][npm-url] &mdash;
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
- [Just-in-time CSS](./docs/en/feat/jit-css.md)
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


## Installation

<pre>
npm i <a href="https://www.npmjs.com/package/freestyler">freestyler</a> --save
</pre>


## Usage

```js
import {css, styled} from 'freestyler';
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

See more interfaces below.


## Reference

- [Terminology](./docs/en/terminology.md)
- __Generic:__ [Low-level API](./docs/en/low-level-api.md)
- __Generic:__ [3<sup>rd</sup> Generation Interfaces](./docs/en/3rd-gen.md)
    - [`rule()` Interface](./docs/en/rule.md)
    - [`StyleSheet.create()` Interface](./docs/en/StyleSheet.md) with lazy rendering
- __React:__ [4<sup>th</sup> Generation Interfaces](./docs/en/4th-gen.md)
    - [`styled()()` Component Interface](./docs/en/styled.md)
    - [`@css` Class Decorator Interface](./css-class-decorator.md)
    - [`@css` `.render()` Decorator Interface](./css-render-decorator.md)
    - `hoc` generator
    - Component
    - hyperstyle
- __React:__ 5<sup>th</sup> Generation Interfaces
    - `styleit` syntax
    - `jsxstyle`
    - `facc` generator
- [Environment variables](./docs/en/env-vars.md)


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
