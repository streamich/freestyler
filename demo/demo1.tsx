import {createElement as h} from 'react';
import styled from '../src/react/styled';
import {render} from 'react-dom';

const Button =  styled('div')({
    col: 'blue'
});

const el = document.createElement('div');
document.body.appendChild(el);

render(<Button>Click me!</Button>, el);
