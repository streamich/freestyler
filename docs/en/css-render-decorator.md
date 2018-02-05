# `@css()` `.render()` Decorator Interface

Render method decorator is very much similar to [`@css()` class decorator](./css-class-decorator.md), with one
very big difference that the style template specified in the `.render()` method decorator will get re-rendered
on every component re-render.

As such, render method decorator always expects a function as its argument. As a rule of thumb, put your "static"
styles into the class decorator and only styles that will change over time &mdash; in your render method decorator;
for best performance.


## Usage

Import `@css` decorator.

```js
import {css} from 'freestyler/lib/react/css';
```

Add styling to your component using a function that returns a CSS-like object.

```jsx
class App extends Component {
    @css(({props, state, context}) => ({
        border: '1px solid tomato'
    }))
    render () {
        return <div>Hello world!</div>;
    }
}
```
