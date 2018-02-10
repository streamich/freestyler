import {Component, createElement as h} from 'react';
import {rule} from '../../src';

const containerClassName = rule({
    textAlign: 'right'
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

class Example1 extends Component<any, any> {
    render() {
        // prettier-ignore
        return h('div', {className: containerClassName},
          h('button', {className: buttonClassName},
            'This is button'
          )
        );
    }
}

export default Example1;
