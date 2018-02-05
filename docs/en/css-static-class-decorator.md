# `@css` Static Class Decorator Interface

Allows you to style your stateful React components using a `@css` class decorator. You specify
your components styling using `static css` class method and `css` instance property.

Class static property template will be generated and injected into the page only once, but
CSS template specified on instance `css` property will be update on every component re-render.

## Usage

Import `@css` decorator.

```js
import {css} from 'freestyler/lib/react/css';
```

Add styling to your component using static CSS-like object.

```jsx
@css
class App extends Component {
    static css = {
        border: '1px solid tomato'
    };

    render () {
        return <div>Hello world!</div>;
    }
}
```

The above example is technically [3<sup>rd</sup> generation](./3rd-gen.md) use case, because it does not use any
component-scope variables. However, you can wrap your CSS-like object into a function that
will receive component's instance as a single argument.

```jsx
@css
class App extends Component {
    static css = ({props, state, context}) => ({
        border: '1px solid ' + (props.color || 'tomato')
    });

    render () {
        return <div>Hello world!</div>;
    }
}
```

If your CSS styles change dynamically, you can specify then as an instance property, this way your
CSS will get updated on every re-render.

```jsx
@css
class App extends Component {
    css = ({props}) => ({
        border: '1px solid ' + (props.color || 'tomato')
    });

    render () {
        return <div>Hello world!</div>;
    }
}
```
