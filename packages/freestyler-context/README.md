# freestyler-context

Generic context provider/consumer library for React.

Usage:

```jsx
import {Provider, Consumer} from 'freestyler-context';

<Provider name="theme" value={{color: 'red'}}>
    <Consumer name="theme">{(theme) => {
        return <div>Color is: {theme.color}</div>;
    }}</Consumer>
</Provider>
```

Merges values of multiple providers with the same name:

```jsx
import {Provider, Consumer} from 'freestyler-context';

<Provider name="theme" value={{color: 'red', background: '#fff'}}>
    <Provider name="theme" value={{color: 'blue'}}>
        <Consumer name="theme">{(theme) => {
            return <div>Color is: {theme.color}</div>;
        }}</Consumer>
    </Provider>
</Provider>
```
