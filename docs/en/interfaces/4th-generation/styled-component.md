# Styled Component Interface

In *Styled Component Interface* there is usually a `styled` [HOC function](https://github.com/MailOnline/libreact/blob/master/docs/en/Introduction.md#hoc) that transforms
simple DOM element types into *"styled"* React components.

> See [`freestyler` *`styled()()` Component Interface* API](../../styled.md).

__Example__

```jsx
import {styled} from 'freestyler';

const Container = styled('div')({
  bd: '1px solid tomato',
});

const BaseButton = styled('button')({
  bg: 'red',
  bdrad: '5px',
  col: '#fff',
});

const Button = () =>
  <Container>
    <BaseButton />
  </Container>
```

## Other libraries that provide *Styled Component Interface*:

  - [`styled-components`][lib-styled-components]
  - [`glamorous`][lib-glamorous]

[lib-styled-components]: https://github.com/styled-components/styled-components
[lib-glamorous]: https://github.com/MicheleBertoli/css-in-js/tree/master/glamorous


### `styled-components` Example

```jsx
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid tomato;
`;

const BaseButton = styled.button`
  background: red;
  border-radius: 5px;
  color: #fff;
`;

const Button = () =>
  <Container>
    <BaseButton />
  </Container>
```


### `glamorous` Example

```jsx
import glamorous from 'glamorous';

const Container = glamorous('div')({
  border: '1px solid tomato',
});

const Container = glamorous('button')({
  background: 'red',
  borderRadius: '5px',
  color: '#fff',
});

const Button = () =>
  <Container>
    <BaseButton />
  </Container>
```
