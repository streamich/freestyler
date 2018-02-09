# Style-it Interface

In *Style-it Interface* style information and React elements are combined by a "styleit" function
directly inside the render tree.

> See [`freestyler` *`styleit()` and `<Styleit>` Interfaces* API](../../css-static-class-decorator.md).

__Example__

```jsx
import {styleit} from 'freestyler';

class Button extends Component {
  render () {
    return styleit({
      bd: '1px solid tomato',
    },
      <div>{
        styleit({
          bg: 'red',
          bdrad: '5px',
          col: '#fff',
        },
          <button className='button' />
        )
      }</div>
    );
  }
}
```

### Other libraries that provide *Style-it Interface*

  - [`style-it`][lib-style-it]

[lib-style-it]: https://github.com/buildbreakdo/style-it


### `style-it` Example

```jsx
import Style from 'style-it';

class Button extends Component {
  render () {
    return Style.it(`
      .container {
        background: 1px solid tomato;
      }
    `,
      <div className="container">{
        Style.it(`
          .button {
            background: red;
            borderRadius: 5px;
            color: #fff;
          }
        `,
          <button className='button' />
        )
      }</div>
    );
  }
}
```
