# Render method's decorator with static template interface

In *render method's decorator with static template interface* style template is set in a decorator over ther `render` method.

```jsx
import css from 'freestyler/react/css';

class Button extends Component {

  @css({
    bd: '1px solid tomato',
    '& > button': {
      bg: 'red',
      bdrad: '5px',
      col: '#fff',
    }
  }, true)
  render () {
    return (
      <div>
        <button className='button' />
      </div>
    );
  }
}
```

### Other libraries that provide *render method's decorator with static template interface*:

  - [`css-constructor`][lib-css-constructor]

[lib-css-constructor]: https://github.com/siddharthkp/css-constructor