# `styled` Component

`styled` component syntax allows you to "attach" styles to some HTML element. It is a [HOC](https://github.com/MailOnline/libreact/blob/master/docs/en/Introduction.md#hoc)
that receives a CSS-like object and returns a component that that will be styled accordingly.

# Usage

Import `styled` function.

```js
import styled from 'freestyler/lib/styled';
```

Now create a styled `<Border>` component.

```jsx
const Border = styled.div({
  border: '1px solid tomato',
  bdrad: '3px'
});

<Border>Hello world!</Border>
```

"Styled" component's styles can be a function that returns a CSS-like object. This function receives components props as an argument.

```jsx
const Border = styled.div(({color = 'tomato'}) => ({
  border: '1px solid ' + color,
  bdrad: '3px'
}));
```

You can use style various predefined DOM elements.

```js
styled.div(/* ... */);
styled.span(/* ... */);
styled.a(/* ... */);
styled.button(/* ... */);
// etc...
```

Or use your custom DOM elements.

```js
const MyArticle = styled('article')(/* ... */);
```
