# Hyperstyle Interface

In *Hyperstyle Interface* the hyperscript function `h` (or React's `createElement`) is
replaced by one that will automatically style React elements.

> See [`freestyler` *Hyperstyle Interface* API](../../hyperstyle.md).


## Other libraries that provide *Hyperstyle Interface*

  - [hyperstyles][lib-hyperstyles]

[lib-hyperstyles]: https://github.com/colingourlay/hyperstyles

*JavaScript*

```jsx
/** @jsx h */
import hyperstyles from 'hyperstyles';
import styles from './styles.css';

const h = hyperstyles(createElement, styles);

class Button extends Component {
  render () {
    return (
      <div className='container'>
        <button className='button' />
      </div>
    );
  }
}
```

*CSS*

```css
.container {
  border: 1px solid tomato;
}

.button {
  background: red;
  border-radius: 5px;
  color: #fff;
}
```