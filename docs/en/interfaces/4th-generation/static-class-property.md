# Static Property Interface

In *Static Property Interface* CSS template is set as a static property of a React component.

> See [`freestyler` *Static Class Decorator* API](../../css-static-class-decorator.md).


## Other libraries that provide *Static Property Interface*

  - [`Classy`][lib-classy]

[lib-classy]: https://github.com/inturn/classy


### `classy` Example

```jsx
import Classy from 'react-classy';

@Classy
class Button extends Component {

  static style = `
    .container {
      border: 1px solid tomato;
    }
    .button {
      background: red;
      border-radius: 5px;
      color: #fff;
    }
  `;

  render() {
    return (
      <div className='container'>
        <button className='button' />
      </div>
    );
  }
}
```
