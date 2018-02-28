import {createElement as h} from 'react';
import styled from '../src/react/styled';
import {render} from 'react-dom';
import {jsxstyle} from '../src';

const CloseBase = (props) => {
    const {className} = props;

    return h('span', props.attr,
        h('svg', {className: 'close-icon'},
            h('path', {className: 'line-1', d: 'M12 12 L20 20 M20 12 L12 20'}),
            h('path', {className: 'line-2', d: 'M11 11 L21 21 M21 11 L11 21'}),
        ),
    );
};

export interface ICloseProps {
    style?: any,
    onClick?: (e?) => void,
}

const Close: React.SFC<ICloseProps> = jsxstyle(CloseBase, {
    pos: 'relative',
    d: 'inline-block',
    w: '32px',
    h: '32px',
    bg: 'rgba(0,0,0,.03)',
    bdrad: '3px',
    cur: 'pointer',
    trs: 'all 0.3s',
    '& svg': {
        border: '1px solid red',
    },
    '&:hover': {
        bdrad: '0px',
        bg: 'rgba(0,0,0,.06)',
    },
    '&:hover .line-1': {
        stroke: 'red',
    },
    '&:hover .line-2': {
        'stroke-dashoffset': 0,
    },
    '&:active': {
        transform: 'scale(0.875, 0.875)',
        bg: 'rgba(0,0,0,.01)',
        '& .line-2': {
            transform: 'rotate(90deg)',
            stroke: '#aaa',
            transition: 'all 0.3s',
        }
    },
    '& .close-icon': {
        w: '28px',
        h: '28px',
    },
    '& .line-1': {
        fill: 'none',
        stroke: 'rgba(0,0,0,.3)',
        'stroke-width': '2px',
    },
    '& .line-2': {
        fill: 'none',
        stroke: '#555',
        'stroke-width': '3px',
        'stroke-dasharray': 25,
        'stroke-dashoffset': 25,
        transition: 'all 0.5s',
        'transform-origin': '50% 50%',
    },
});

const el = document.createElement('div');
document.body.appendChild(el);

render(<Close />, el);
