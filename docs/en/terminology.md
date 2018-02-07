# Terminology

Below we define commonly used terms in `freestyler`.

## CSS-like Object

A *CSS-like* object is a *plain* JavaScript object of the following form in kebab-case.

```js
const css = {
    color: 'red',
    'border-radius': '3px',
};
```

Or in camel-case.

```js
const css = {
    color: 'red',
    borderRadius: '3px',
};
```

Or using [atoms](./feat/atoms.md).

```js
const css = {
    col: 'red',
    bdrad: '3px',
};
```


## CSS Template

A *CSS template* is a function that returns a CSS-like object. Template usually receives component scope arguments.

```js
const template = (props, state, context) => {
    return {
        color: 'red',
        'border-radius': '3px',
    };
};
```

Or sometimes as a map.

```js
const template = ({props, state, context}) => {
    return {
        color: 'red',
        'border-radius': '3px',
    };
};
```


## Static Template

*Static template* is injected into the DOM only *once* and only when the component is actually rendered
*for the first time*. It stays in the DOM until there is at least one mounted component that uses that template.


## Dynamic Template

*Dynamic template* is updated on *every* re-render of a component it is specific to that component's instance
and is removed from the DOM once the component in unmounted.
