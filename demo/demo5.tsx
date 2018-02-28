import {createElement as h} from 'react';
import {render} from 'react-dom';
import {jsxstyle} from '../src';

const keyframes = {
  '0%': {
    transform: 'perspective(120px) rotateX(0deg) rotateY(0deg)'
  },
  '50%': {
    transform: 'perspective(120px) rotateX(-180.1deg) rotateY(0deg)'
  },
  '100%': {
    transform: 'perspective(120px) rotateX(-180deg) rotateY(-179.9deg)'
  }
};

const Custom = (props) => {
    return h('div', props.attr, props.children);
};

const SpinnerSquare = jsxstyle(Custom, {
  w: '40px',
  h: '40px',
  bg: 'tomato',
  mar: '40px auto',
  animation: 'spinner-rotate-plane 1.2s infinite ease-in-out',
  '@keyframes spinner-rotate-plane': keyframes,
  '@media print': {
    w: '20px',
    h: '20px',
  },
});

const el = document.createElement('div');
document.body.appendChild(el);

render(<SpinnerSquare />, el);
