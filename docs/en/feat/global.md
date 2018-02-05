### Global styles

Global styling is an anti-pattern, use them sparingly. In all CSS templates
you can emit global styles:

```jsx
class Button extends Component {
    @css({
        '.btn-rendered': {
            // ...
        }
    })
    render() {
        // ...
    }
}
```

To make your component's styles conditional on some parent global class name, better use
nesting operand `&` instead of global styles (however it is an anti-pattern as well):

```jsx
const Frame = css.styled({
    '.is-mobile &': {
        // Make the frame look different on mobile.
    }
});
```

`freestyler` exposes a convenience function `global(static, dynamic)` to emit global styles:

```js
import {global} from 'freestyler/globals';

const CssReset = global({
    '*': {
        pad: 0,
        mar: 0,
    }
});

<CssReset />
```

Here is how you can create a simplified version yourself:

```jsx
const Null = () => null;
const global = template => css.styled(Null)({':global': template});
```

You can use it to, for example, write your own CSS reset, or use [one of many shipped with `freestyler`](#css-resets):

```jsx
import {global} from 'freestyler/globals';

const CssReset = global({
    html: {
        bxz: 'border-box',
        fz: '16px',
    },
    '*, *:before, *:after': {
        bxz: 'inherit',
    },
    'body, h1, h2, h3, h4, h5, h6, p, ol, ul': {
        mar: 0,
        pad: 0,
        fw: 'normal',
    },
});

<CssReset />
```

Customize global styles with props and make global styles change dynamically
as your theme changes:

```jsx
import {global} from 'freestyler/globals';

const DynamicGlobalStyles = global(null, ({background, theme}) => ({
    body: {
        background,
        // Change global styles dynamically as `theme` mutates.
        col: theme.textColor,
    }
}));

<DynamicGlobalStyles background="#eee" />
```

Create a *css-prop* `<Style>` component:

```jsx
import {global} from 'freestyler/globals';

const Style = ({children}) => {
    const EmitCss = global(null, () => children);
    return <EmitCss/>;
};
```

Now use it anywhere in your JSX like this:

```jsx
// Matrix theme.
<div>
    <Style>{{
        body: {
            background: 'black',
            color: 'green',
        }
    }}</Style>
</div>
// Is Neo the chosen one? Or is it papa biceps?
```
