# jsxstyle interface

In *jsxstyle interface* style information is applied as props to the JSX nodes directly.

```jsx
import jsxstyle, {Box} from 'freestyler/react/jsxstyle';

const BaseButton = jsxstyle('button');

class Button extends Component {
  render () {
    return (
      <Box border='1px solid tomato'>
        <BaseButton
          background="red"
          borderRadius="5px"
          color="#fff"
        />
      </Box>
    );
  }
}
```

### Other libraries that provide *jsxstyle interface*

  - [`glamorous`][lib-glamorous]
  - [`jsxstyle`][lib-jsxstyle]

[lib-jsxstyle]: https://github.com/smyte/jsxstyle
[lib-glamorous]: https://github.com/paypal/glamorous

##### `glamorous` example

```jsx
import glamorous from "glamorous";

class Button extends Component {
  render () {
    return (
      <glamorous.Div border='1px solid tomato'>
        <glamorous.Button
          background="red"
          borderRadius="5px"
          color="#fff"
        />
      </glamorous.Div>
    );
  }
}
```