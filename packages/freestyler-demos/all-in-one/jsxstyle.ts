import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import {Block, InlineBlock} from 'freestyler/src/react/jsxstyle';

class App extends Component<any, any> {
    render() {
        // prettier-ignore
        return h(Block, {ta: 'center'},
          h(InlineBlock, {
            component: 'button',
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
              w: '160px',
            }
          },
            'This is button'
          )
        );
    }
}

render(h(App), document.body);
