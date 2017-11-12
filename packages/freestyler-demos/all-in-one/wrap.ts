import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import wrap from 'freestyler/src/react/wrap';

const Button = wrap('div', null, () => ({
    width: '320px',
    bg: 'red',
    pad: '20px',
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
}));

render(h(Button, {}, 'Hello'), document.body);
