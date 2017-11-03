# Rule pattern

*Rule pattern* is when a style "rule" is converted to a class name:

```jsx
const className = rule({
  background: 'red',
  borderRadius: '5px',
  color: '#fff'
});

class Button extends Component {
  render () {
    return <button className={className}/>;
  }
}
```