# Styled component interface

In *styled component interface* there is usually a `styled` HOC function that transforms
simple DOM element types into *"styled"* ones.

```jsx
import styled from 'freestyler/react/styled';

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

### Other libraries that provide *styled component interface*:

  - [`styled-components`][lib-styled-components]
  - [`glamorous`][lib-glamorous]

[lib-styled-components]: https://github.com/styled-components/styled-components
[lib-glamorous]: https://github.com/MicheleBertoli/css-in-js/tree/master/glamorous

##### `styled-components` example

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

##### `glamorous` example

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
