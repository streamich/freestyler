# Hyperstyles interface

In *hyperstyles interface* the Virtual HyperScript function `h` of React (`createElement`) is
replaced by one that will also contain style information.

### Other libraries that provide *Component interface*

  - [hyperstyles][lib-hyperstyles]

[lib-hyperstyles]: https://github.com/colingourlay/hyperstyles

JavaScript:

```jsx
/** @jsx h */
import hyperstyles from 'hyperstyles';

const h = hyperstyles(createElement, styles);

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

CSS:

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