# `@css` Class Decorator Interface

Allows you to style your stateful React components using a `@css` class decorator.
`@css` accepts a CSS-like object or a function that returns a CSS-like object as a single argument.

If function is provided as a parameters, it will receive a single argument: instance object of the component.

Class decorator styles will not update when your component re-renders, use [`render()` method decorator](./css-render-decorator.md),
if you want your CSS to update every time your component re-renders.

## Usage

Import `@css` decorator.

```js
import {css} from 'freestyler/lib/react/css';
```

Add styling to your component using CSS-like object.

```jsx
@css({
    border: '1px solid tomato'
})
class App extends Component {
    render () {
        return <div>Hello world!</div>;
    }
}
```

The above example is technically 3<sup>rd</sup> generation use case, because it does not use any
component-scope variables. However, you can wrap your CSS-like object into a function that
will receive component's instance as a single argument.

```jsx
@css(({props, state, context}) => ({
    border: '1px solid ' + (props.color || 'tomato')
}))
class App extends Component {
    render () {
        return <div>Hello world!</div>;
    }
}
```
