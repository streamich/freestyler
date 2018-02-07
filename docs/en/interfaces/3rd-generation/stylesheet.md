# StyleSheet Interface

In *StyleSheet Interface* multiple style rules are combined into as single "stylesheet".

> See [`freestyler` *StyleSheet Interface* API](../../StyleSheet.md).

Using StyleSheet interface styles can be inject into the DOM lazily, i.e. only when they are used for the first time.


## Other libraries that provide *StyleSheet Interface*

  - [`aphrodite`][lib-aphrodite]
  - [`csjs`][lib-csjs]

[lib-aphrodite]: https://github.com/Khan/aphrodite
[lib-csjs]: https://github.com/rtsao/csjs


### `aphrodite` Example

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
