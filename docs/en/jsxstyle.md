# `jsxstyle` and Co Interfaces

`jsxstyle` interface allows you to define CSS right inside your JSX nodes.

Provides you these pre-generated basic building blocks.

- `<Block>` &mdash; `<div>` with `display: block`.
- `<Inline>` &mdash; `<span>` with `display: inline`.
- `<InlineBlock>` &mdash; `<div>` with `display: inline-block`.
- `<Row>` &mdash; `<div>` with `display: flex; flex-direction: row`.
- `<Column>` &mdash; `<div>` with `display: flex; flex-direction: column`.

## Usage

Import the basic building blocks.

```js
import {
    jsxstyle,
    Block,
    Inline,
    InlineBlock,
    Row,
    Column
} from 'freestyler/lib/jsxstyle';
```

Or create your own custom building blocks.

```js
const Button = jsxstyle('button', {
    bg: '#07f',
    col: '#fff',
    pad: '20px',
    mar: '5px',
    bd: 0
});
```

You can add extra styles to your building blocks.

```jsx
<Button>Foo</Button>
<Button borderRadius='3px'>Bar</Button>
<Button bdrad='10px' bg='red'>Baz</Button>
```
