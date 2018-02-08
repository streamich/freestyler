import {Component, createElement as h} from 'react';
import {Styleit, styleit} from '../../src/react/styleit';

class StyleitButton extends Component<any, any> {
    render() {
        // prettier-ignore
        return styleit({
          ta: 'center',
        }, className => h('div', {className},
          h(Styleit, {
            css: {
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
            }
          },
            h('button', {},
              'This is button'
            )
          ),
          h(Styleit, {
            background: 'blue',
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
            h('button', {},
              'This is button'
            )
          ),
        ));
    }
}

export default StyleitButton;
