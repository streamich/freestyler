import jsxstyle from '../../src/react/jsxstyle';

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

const SpinnerSquare = jsxstyle({type: 'div', attr: {title: 'Hello'}}, {
  w: '40px',
  h: '40px',
  bg: 'tomato',
  mar: '40px auto',
  animation: 'spinner-rotate-plane 1.2s infinite ease-in-out',
  '@keyframes spinner-rotate-plane': keyframes,
});

export default SpinnerSquare;
