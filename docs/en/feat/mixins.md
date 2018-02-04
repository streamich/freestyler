# Mixins

Use JavaScript's spread syntax for mixing:

```js
const mixinRedText = {
    color: 'red',
};
const template = {
    ...mixinRedText,
    background: '#eee',
};
```
