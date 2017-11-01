# *rule* pattern

Rule pattern is when

```jsx
const buttonClassName = rule({
  background: 'red',
  borderRadius: '5px',
  color: '#fff'
});

class Button extends Component {
  render () {
    return <button className={buttonClassName}/>;
  }
}
```