import {createElement as h, Component} from 'react';
import {jsxstyle, Block, InlineBlock} from '../../src/react/jsxstyle';

const Button = jsxstyle('button', {
    bg: '#07f',
    col: '#fff',
    pad: '20px',
    mar: '5px',
    bd: 0
});

const Example2 = () =>
    <div>
        <Button>Foo</Button>
        <Button borderRadius='3px'>Bar</Button>
        <Button bdrad='10px' bg='red'>Baz</Button>
    </div>;

export default Example2;
