# Theming

One of core objectives of `freestyler` is to be super-lightweight, therefore, theming has be extracted into
a separate package [`themestyler`](./packages/themestyler/). It is a generic React theme manager you can use
in any project, but works best with `freestyler`.

Create a theme:

```jsx
import {Theme} from 'themestyler';

const theme = {
    color: 'tomato',
};

const App = () =>
    <Theme value={theme}>
        {/* ... */}
    </Theme>;
```

Consume theme using HOC pattern:

```jsx
import {themed} from 'themestyler';

const Box = css.div(({theme}) => ({
    color: theme.color,
}));

const BoxThemed = themed(Box);

<BoxThemed>BOX</BoxThemed>
```

Or use the FaCC pattern:

```jsx
import {Themed} from 'themestyler';

<Themed>{(theme) => (
    <div style={{color: theme.color}}>BOX</div>;
)}</Themed>
```
