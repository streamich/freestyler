# Nesting selectors

`freestyler` template selectors can be nested arbitrarily deep. However, don't overuse this feature, multiple levels deep selectors is an anti-pattern in React.

Use `$` syntax for nesting:

```js
const template = {
    color: 'red',
    $item: {
        'border-left': '1px solid green',
    },
};
```

Use `&` operand for nesting, it is expanded into the parent selector:

```js
const template = {
    color: 'red',
    '& > div': {
        background: '#eee',
    },
    '& .item': {
        'border-left': '1px solid green',
    },
};
```

`&` can be placed anywhere in the selector string, so you can even reference global parent class names:

```js
const template = {
    color: 'red',
    '.is-mobile &': {
        color: 'blue',
    }
};
```
