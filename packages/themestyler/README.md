# themestyler

Theme manager for you React apps.

### Using HOC pattern

```jsx
import {Theme, themed} from 'themestyler';

const Box = ({theme}) => {
    return <div style={{background: theme.background}}>BOX</div>;
};
const BoxThemed = themed(Box);

<Theme value={{
    color: 'red',
    background: 'green',
}}>
    <div>
        <BoxThemed/>
    </div>
</Theme>
```
 
### Using FaCC pattern 

```jsx
import {Theme, Themed} from 'themestyler';

<Theme value={{
    color: 'red',
    background: 'green',
}}>
    <div>
        <Themed>{theme => {
            return <div style={{background: theme.background}}>BOX</div>;
        }}</Themed>
    </div>
</Theme>
```

You can nest multiple themes inside one another, the values will be shallowly merged.

You can specify a custom theme name using `name` property:

```jsx
<Theme name="custom"/>
<Themed name="custom"/>
themed(Component, 'custom');
```
