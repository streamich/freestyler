# Inline style class decorator interface

### Libraries that provide *inline style class decorator interface*:

  - [`radium`][lib-radium]

[lib-radium]: https://github.com/FormidableLabs/radium

```jsx
var Radium = require('radium');

const styles = {
  container: {
    border: '1px solid tomato',
  },
  button: {
    background: 'red',
    borderRadius: '5px',
    color: '#fff'
  }
};

@Radium
class Button extends Component {
  render () {
    return (
      <div style={[styles.container]}>
        <button style={[styles.button]}/>
      </div>
    );
  }
}
```
