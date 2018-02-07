# Babel Plugin Interface

In *Babel Plugin Interface* styles are defined in JavaScript, but they are statically
extracted and saved as external style `.css` sheet by a Babel plugin.

> `freestyler` does not provide such interface.


## Libraries that provide *Babel Plugin Interface*:

  - [`babel-plugin-css-in-js`][lib-babel-plugin-css-in-js]

[lib-babel-plugin-css-in-js]: https://github.com/martinandert/babel-plugin-css-in-js


### `babel-plugin-css-in-js` example

```jsx
const styles = cssInJS({
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


