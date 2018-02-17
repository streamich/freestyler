import {createElement as h} from 'react';
import styled from '../src/react/styled';
import {render} from 'react-dom';

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

const SpinnerRotatePlane = styled('div')({
  w: '40px',
  h: '40px',
  bg: '#333',
  mar: '40px auto',
  animation: 'spinner-rotate-plane 1.2s infinite ease-in-out',
  '@keyframes spinner-rotate-plane': keyframes,
});

const el = document.createElement('div');
document.body.appendChild(el);

render(<SpinnerRotatePlane />, el);
