# Stylesheet interface

In *StyleSheet pattern* multiple style rules can be converted to multiple class names.

```jsx
import StyleSheet from 'freestyler/StyleSheet';

const styles = StyleSheet.create({
  container: {
    border: '1px solid tomato',
  }
  button: {
    background: 'red',
    borderRadius: '5px',
    color: '#fff',
  }
});

class Button extends Component {
  render () {
    return (
      <div className={styles.container}>
        <button className={styles.button}/>
      </div>
    );
  }
}
```

In StyleSheet pattern often styles are inject in the DOM lazy, i.e. only when they are used for the first time `styles.container`.

### Other libraries that provide *StyleSheet interface*:

  - [`aphrodite`][lib-aphrodite]
  - [`csjs`][lib-csjs]

[lib-aphrodite]: https://github.com/Khan/aphrodite
[lib-csjs]: https://github.com/rtsao/csjs

##### `aphrodite` example

```jsx
import {StyleSheet, css} from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    border: '1px solid tomato',
  }
  button: {
    background: 'red',
    borderRadius: '5px',
    color: '#fff',
  }
});

class Button extends Component {
  render () {
    return (
      <div className={css()}>
        <button className={styles.button}/>
      </div>
    );
  }
}
```
