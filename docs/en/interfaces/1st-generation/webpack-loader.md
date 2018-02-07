# Webpack Loader Interface

In *Webpack Loader Interface* CSS templates are stored in an external file, usually `.css` or using
some pre-processor file extension, like `.scss`. The styles can be inlined into the JavaScript
bundle or serverd as an external style sheet.

> `freestyler` does not provide such interface.


## Libraries that provide *Webpack Loader Interface*

  - [`bloody-react-styled`][lib-bloody-react-styled]
  - [`css-loader`][lib-css-loader]

[lib-bloody-react-styled]: https://github.com/martinandert/babel-plugin-css-in-js
[lib-css-loader]: https://github.com/webpack-contrib/css-loader


### `bloody-react-styled` Example

JavaScript:

```js
import styled from 'bloody-react-styled';
import styles from './button.css';

@styled(styles)
class Button extends Component {
  render() {
    const {locals} = styles;
    return (
      <div className={locals.container}>
        <button className={locals.button}>Click me!</button>
      </div>
    );
  }
};
```

CSS:

```css
:local .container {
  border: '1px solid tomato',
}
:local .button {
  background: 'red',
  borderRadius: '5px',
  color: '#fff',
}
```
