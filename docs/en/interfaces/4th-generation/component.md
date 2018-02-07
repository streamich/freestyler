# Component Interface

In *Component Interface* user extends the `Component` class provided by the
library rather directly the one from React.

> See [`freestyler` *`Component` Class Interface* API](../../component-class.md).

__Example__

```jsx
import {Component} from 'freestyler';

class Button extends Component {
  css () {
    return {
      bd: '1px solid tomato',
      '& > button': {
        bg: 'red',
        bdrad: '5px',
        col: '#fff',
      }
    };
  }

  render () {
    return (
      <div>
        <button className='button' />
      </div>
    );
  }
}
```

## Other libraries that provide *Component interface*
