# Inline StyleSheet Interface

*Inline Style Interface* is when styles are defined at module level
in a *"CSS stylesheet-like"* object and then applied as inline styles.

__Example__

```jsx
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

class Button extends Component {
  render () {
    return (
      <div style={styles.container}>
        <button style={styles.button}/>
      </div>
    );
  }
}
```

> This interface can be used in any React project.
