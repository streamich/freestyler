# `hot()()` Higher Order Type Interface

Higher Order Type (or HOT) is similar to Higher Order Component (HOC), but is more dynamic. HOCs have
to be used in module scope, HOTs can be used anywhere inside the `.render()` functions event inside the JSX.

```jsx
const Button = () => <StyledButton({}) />;
```

## Usage

```jsx
import hot from 'freestyler/lib/react/hot';

const Button = hot('button', {
    bg: 'red',
    w: '320px',
    pad: '20px',
    bdrad: '5px',
    bd: 'none',
    outline: 'none',
});

class MyComponent extends Component {
    render () {
        const ColoredButton = Button({
            bg: 'pink',
        });

        return (
            <ColoredButton>Click me!</ColoredButton>
        );
    }
}
```
