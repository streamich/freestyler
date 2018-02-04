# freestyler

[![][npm-badge]][npm-url] [![][travis-badge]][travis-url]

[**5<sup>th</sup> generation**](#fifth-generation) [React](https://reactjs.org/) styling library;
it is *lightning fast*, super lean and gives every freestyler a *gazillion* of [features](#feat).

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

Import the library

```js
import {css} from 'freestyler';
```

Style *stateful* components

```jsx
@css({
    border: '1px solid red',
})
class App extends Component {
    render () {
        return <div>Hello world!</div>;
    }
}
```

Or, create stateless *"styled"* components

```jsx
const Bordered = css.div({
    border: '1px solid red',
});
const App = () =>
    <Bordered>Hello world!</Bordered>;
```


## Reference

- [Terminology](./docs/en/terminology.md)
- Generic &mdash; low-level API
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


-----


## Packages

  - [`themestyler`](https://www.npmjs.com/package/themestyler) &mdash; theming primitives designed for `freestyler`, but can be used in any React project.
  - [`freestyler-context`](https://www.npmjs.com/package/freestyler-context) &mdash; generic React context pub/sub that shallowly merges contexts with the same name.
  - [`freestyler-observable`](https://www.npmjs.com/package/freestyler-observable) &mdash; observable factory.


## Environment variables

  - `FREESTYLER_PREFIX` &mdash; prefix to use for all CSS class names.
  - `FREESTYLER_NUMBERS_TO_PX` &mdash; if set, `freestyler` will convert number values of declartions that
  are not unitless to pixel units, like `width: 100` will be converted to `width: '100px'`. It will
  ignore unitless declarations, for example, `zIndex: 10` will stay `zIndex: 10`.
  - `FREESTYLER_JSXSTYLE_MEDIA_QUERIES` &mdash; if set, enables `jsxstyle` media query syntax in addition
  to regular media query syntax.


## License

[Unlicense](./LICENSE) &mdash; public domain.


-------

<center><i>Are you a freestyler?</i></center>


[npm-url]: https://www.npmjs.com/package/freestyler
[npm-badge]: https://img.shields.io/npm/v/freestyler.svg
[travis-url]: https://travis-ci.org/streamich/freestyler
[travis-badge]: https://travis-ci.org/streamich/freestyler.svg?branch=master
