# `styleit()` and `<Styleit>` Interfaces

"style-it" interfaces allow to style your DOM nodes directly in the JSX tree.


## `styleit()`

`styleit` is function which you give styles and JSX to which to apply those styles.

*Signature*

```tsx
styleit(styles, element)
styleit(styles, (className) => element)
```

, where

  - `styles` &mdash; CSS-like style object.
  - `element` &mdash; React element returned by `createElement()` methods, aka your JSX.
  - `className` &mdash; class name string you can apply manually to any node.


### Usage

```js
import {styleit} from 'freestyler/lib/react/styleit';
```

__Example 1__

```jsx
const Button = () => styleit({
    ta: 'center',
},
    <div>
        {styleit({
            background: 'red',
            width: '320px',
            padding: '20px',
            borderRadius: '5px',
            border: 'none',
            outline: 'none',
            '&:hover': {
                color: '#fff',
            },
            '&:active': {
                position: 'relative',
                top: '2px',
            },
            '@media (max-width: 480px)': {
                width: '160px',
            },
        },
            <button>Hello world</button>
        )}
    </div>
);
}
```

__Example 2__

```jsx
const Button = styleit({
    ta: 'center',
}, (className) =>
    <div className={className}>
        {styleit({
            background: 'red',
            width: '320px',
            padding: '20px',
            borderRadius: '5px',
            border: 'none',
            outline: 'none',
            '&:hover': {
                color: '#fff',
            },
            '&:active': {
                position: 'relative',
                top: '2px',
            },
            '@media (max-width: 480px)': {
                width: '160px',
            },
        }, (className) =>
            <button className={className}>Hello world</button>
        )}
    </div>
);
```


## `<Styleit>`

`<Styleit>` is a React component that accepts React elements or a function as its children.
If function is provided as children, it receives `className` as a single argument, which is
a string of class names generated.


### Usage

```js
import {Styleit} from 'freestyler/lib/react/styleit';
```

### Props

- `css` &mdash; CSS-like object to style its children.

If `css` prop is not specified it will tread the *whole props object* as a CSS-like styles, see
*__Example 3__*.

__Example 1__

```jsx
const Button = <Styleit css={{ta: 'center'}}>
    <div>
        <Styleit css={{
            background: 'red',
            width: '320px',
            padding: '20px',
            borderRadius: '5px',
            border: 'none',
            outline: 'none',
            '&:hover': {
                color: '#fff',
            },
            '&:active': {
                position: 'relative',
                top: '2px',
            },
            '@media (max-width: 480px)': {
                width: '160px',
            },
        }}>
            <button>Hello world 1</button>
        </Styleit>
    </div>
</Styleit>;
```

__Example 2__

```jsx
const Button = <Styleit css={{ta: 'center'}}>{className =>
    <div className={className}>
        <Styleit css={{
            background: 'red',
            width: '320px',
            padding: '20px',
            borderRadius: '5px',
            border: 'none',
            outline: 'none',
            '&:hover': {
                color: '#fff',
            },
            '&:active': {
                position: 'relative',
                top: '2px',
            },
            '@media (max-width: 480px)': {
                width: '160px',
            },
        }}>{className =>
            <button className={className}>Hello world 2</button>
        }</Styleit>
    </div>
}</Styleit>;
```

__Example 3__

```jsx
const Button = <Styleit ta='center'>
    <div>
        <Styleit
            background='red'
            width='320px'
            padding='20px'
            borderRadius='5px'
            border='none'
            outline='none'
            {...{
                '&:hover': {
                    color: '#fff',
                },
                '&:active': {
                    position: 'relative',
                    top: '2px',
                },
                '@media (max-width: 480px)': {
                    width: '160px',
                }
            }}
        >
            <button>Hello world 3</button>
        </Styleit>
    </div>
</Styleit>;
```
