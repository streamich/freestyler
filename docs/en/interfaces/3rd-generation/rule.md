# Rule Interface

*Rule Interface* is when a style "rule" is converted to a class name.

__Example__

```jsx
import rule from 'freestyler/rule';

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

> See [`freestyler` *Rule Interface* API](../../rule.md).


### Other libraries that provide *Rule Interface*:

