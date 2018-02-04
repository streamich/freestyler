![libreact logo](./docs/assets/freestyler.png)

# freestyler [![][npm-badge]][npm-url] [![][travis-badge]][travis-url]

[**5<sup>th</sup> generation**](#fifth-generation) [React styling library][npm-url] &mdash;
it is *lightning fast*, *lean*, and with *gazillion* of [__*feat*ures__](#feat).

```
        Yeah, straight from the top of my dome
        As I rock, rock, rock, rock, rock the microphone
        Yeah, straight from the top of my dome
        As I rock, rock, rock, rock, rock the microphone…
```

- Bomfunk MC's &mdash; [Freestyler](https://www.youtube.com/watch?v=ymNFyxvIdaM)


## feat.

- [Fifth generation](./docs/feat/fifth-generation.md)
- [Lightweight](./docs/feat/lightweight.md)
- [Lightning fast](./docs/feat/fast.md)
- [Just-in-time CSS](./docs/feat/jit-css.md)
- [Code splitting](./docs/feat/code-splitting.md)
- [Dead code elimination](./docs/feat/dead-code-elimination.md)
- [Variables](./docs/feat/variables.md)
- [Scoped styles without selectors](./docs/feat/scoped.md)
- [Nested selectors](./docs/feat/nesting.md)
- [Mixins](./docs/feat/mixins.md)
- [Media queries, keyframes, ...](./docs/feat/media.md)
- [Atoms](./docs/feat/atoms.md)
- [Global styles](./docs/feat/global.md)
- [CSS Resets](./docs/feat/resets.md)
- [*"Styled"* component generator](./docs/feat/styled-components.md)
- [Theming](./docs/feat/theming.md)


## Installation

<pre>
npm i <a href="https://www.npmjs.com/package/freestyler">freestyler</a> --save
</pre>


## Usage

Import the library.

```js
import {css} from 'freestyler';
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
const Bordered = css.div({
    border: '1px solid tomato',
});
const App = () =>
    <Bordered>Hello world!</Bordered>;
```


## Reference

- [Terminology](./docs/en/terminology.md)
- Generic &mdash; [low-level API](./docs/en/low-level-api.md)
- Generic &mdash; 3<sup>rd</sup> generation API
    - `rule` pattern
    - `StyleSheet` with lazy rendering
- React &mdash; 4<sup>th</sup> generation API
    - `styled` components
    - `@css` class decorator
    - `@css` render method decorator
    - `hoc` generator
    - Component
    - hyperstyle
- React &mdash; 5<sup>th</sup> generation API
    - `styleit` syntax
    - `jsxstyle`
    - `facc` generator
- [Environment variables](./docs/en/env-vars.md)


## Packages

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
