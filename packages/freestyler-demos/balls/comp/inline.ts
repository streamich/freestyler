import {Component, createElement as h} from 'react';

export default ({x, y}) =>
    h('div', {
        style: {
            position: 'absolute',
            borderRadius: '50%',
            background: 'red',
            width: '20px',
            height: '20px',
            top: y + 'px',
            left: x + 'px',
        },
    });
