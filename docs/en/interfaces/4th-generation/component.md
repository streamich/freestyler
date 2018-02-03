# Component interface

In *Component interface* users extends the `Component` class provided by the
library rather directly the one provided by React.

```jsx
import Component from 'freestyler/react/Component';

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

### Other libraries that provide *Component interface*

