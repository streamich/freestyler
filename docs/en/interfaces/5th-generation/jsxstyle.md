# jsxstyle Interface

In *jsxstyle Interface* style information is applied as props to the "jsxtyle building-block" components.

> See [`freestyler` *`jsxstyle` and Co Interfaces* API](../../jsxstyle.md).

__Example__

```jsx
import jsxstyle, {Block} from 'freestyler';

const BaseButton = jsxstyle('button');

class Button extends Component {
  render () {
    return (
      <Block border='1px solid tomato'>
        <BaseButton
          background="red"
          borderRadius="5px"
          color="#fff"
        />
      </Block>
    );
  }
}
```

## Other libraries that provide *jsxstyle Interface*

  - [`glamorous`][lib-glamorous]
  - [`jsxstyle`][lib-jsxstyle]

[lib-jsxstyle]: https://github.com/smyte/jsxstyle
[lib-glamorous]: https://github.com/paypal/glamorous


### `glamorous` Example

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
