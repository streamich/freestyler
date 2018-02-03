# Class decorator interface

In *class decorator interface* a style template is specified in a class decorator. The
template depends on the `props` of the coponent.

```jsx
import styled from 'freestyler/react/css';

@css(({props}) => ({
  bd: '1px solid tomato',
  '& > button': {
    bg: 'red',
    bdrad: '5px',
    col: '#fff',
  }
}), true)
class Button extends Component {
  render () {
    return (
      <div>
        <button className='button' />
      </div>
    );
  }
}
```

### Other libraries that provide *class decorator interface*

