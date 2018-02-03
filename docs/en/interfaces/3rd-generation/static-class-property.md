# Static class property static template interface

In *static class property static template interface* style template is set as a static property of a React component.

```jsx
import Classy from 'freestyler/react/Classy';

@Classy
class Button extends Component {

  static css = {
    bd: '1px solid tomato',
    '& > button': {
      bg: 'red',
      bdrad: '5px',
      col: '#fff',
    }
  };

  render () {
    return (
      <div>
        <button className='button' />
      </div>
    );
  }
}
```

### Other libraries that provide *static class property static template interface*:

  - [`Classy`][lib-classy]

[lib-classy]: https://github.com/inturn/classy

##### `classy` example

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
