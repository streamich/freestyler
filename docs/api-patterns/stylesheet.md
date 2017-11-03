# Stylesheet pattern

In *StyleSheet pattern* multiple style rules can be converted to multiple class names.

```jsx
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
