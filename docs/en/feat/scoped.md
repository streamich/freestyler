# Scoped styles

Simply write CSS declarations without class names, your components will be scoped and assigned a class name automatically.

```js
const template = (props) => ({
    color: 'red',
    background: props.theme.background,
});
```
