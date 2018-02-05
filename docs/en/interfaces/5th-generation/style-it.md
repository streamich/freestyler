# Style-it interface

In *style-it interface* style information and JSX is combined by `styleit` function
inside the render tree.

```jsx
import {styleit} from 'freestyler/react/styleit';

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

### Other libraries that provide *style-it interface*

  - [`style-it`][lib-style-it]

[lib-style-it]: https://github.com/buildbreakdo/style-it

##### `style-it` example

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