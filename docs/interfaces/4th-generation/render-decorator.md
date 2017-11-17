# Render method decorator interface

In *render method decorator interface* a style template is specified in a decorator over the `render` method.
The template depends on the `props` of the coponent.

```jsx
import styled from 'freestyler/react/css';

class Button extends Component {
  @css(({props}) => ({
    bd: '1px solid tomato',
    '& > button': {
      bg: 'red',
      bdrad: '5px',
      col: '#fff',
    }
  }), true)

  render () {
    return (
      <div>
        <button className='button' />
      </div>
    );
  }
}
```

### Other libraries that provide *render method decorator interface*

