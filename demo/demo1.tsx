import {createElement as h} from 'react';
import styled from '../src/react/styled';
import CssFadeInAnimations from '../src/globals/CssFadeInAnimations';
import {render} from 'react-dom';

const Button =  styled('div')({
    col: 'blue'
});

const el = document.createElement('div');
document.body.appendChild(el);

render(<div>
    <CssFadeInAnimations />
    <Button>Click me!</Button>
</div>, el);
