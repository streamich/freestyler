# Rule Interface

The *Rule Interface* is when a style "rule" is converted to a class name.

> See [`freestyler` *Rule Interface* API](../../rule.md).

__Example__

```jsx
import {rule} from 'freestyler';

const container = rule({
  border: '1px solid tomato',
});

const button = rule({
  background: 'red',
  borderRadius: '5px',
  color: '#fff'
});

class Button extends Component {
  render () {
    return (
      <div className={container}>
        <button className={button}/>
      </div>
    );
  }
}
```

### Other libraries that provide *Rule Interface*

