import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import rule from 'freestyler/src/rule';

const containerClassName = rule({
    ta: 'center',
});

const buttonClassName = rule({
    bg: 'red',
    w: '320px',
    pad: '20px',
    bdrad: '5px',
    bd: 'none',
    outline: 'none',
    '&:hover': {
        col: '#fff',
    },
    '&:active': {
        pos: 'relative',
        top: '2px',
    },
    '@media (max-width: 480px)': {
        w: '160px',
    },
});

class App extends Component<any, any> {
    render() {
        // prettier-ignore
        return h('div', {className: containerClassName},
          h('button', {className: buttonClassName},
            'This is button'
          )
        );
    }
}

render(h(App), document.body);
