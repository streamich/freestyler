# Styled components

`freestyler` allows you to write *presentational* components using the "styled component" syntax:

```js
const RedText = css.span({
    color: 'tomato',
});

const Bordered = css.div({
    border: '1px solid papayawhip',
});
```

Style any HTML tag, for example, `<nav>`:

```js
const MyNavigation = css.styled('nav')({
    background: 'palevioletred',
});
```

Reference:

```js
css.span(staticTemplate, dynamicTemplate);
css.div(staticTemplate, dynamicTemplate);
css.styled(tagName)(staticTemplate, dynamicTemplate);
```
