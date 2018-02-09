# `Component` Class Interface

Provides you a `Component` class that you can extend just like React's `Component` class, but
you can apply CSS styles to `freestyler`'s component.


## Usage

Import `Component` class.

```js
import Component from 'freestyler/lib/react/Component';
```

Style your coponents with `static` and instance styles.

```jsx
class Button extends Component {
    static css = {
        border: '1px solid tomato'
    };

    css() {
        return {
            color: this.props.color
        };
    }

    render () {
        return <button>Hello world</button>;
    }
}
```
