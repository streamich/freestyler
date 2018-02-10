import {createElement as h, Component} from 'react';
import {jsxstyle, Block, InlineBlock} from '../../src/react/jsxstyle';

const Button = jsxstyle('button', {
    background: 'red',
    width: '320px',
    padding: '20px',
    borderRadius: '5px',
    ta: 'center',
    cur: 'pointer'
});

const Example1 = () =>
    <Block ta='center'>
        <Button
            border='1px solid black'
            outline='none'
            {...{
                '&:hover': {
                    color: '#fff',
                },
                '&:active': {
                    position: 'relative',
                    top: '2px',
                },
                '@media (max-width: 480px)': {
                    width: '160px',
                }
            }}
        >
            Hello world 3
        </Button>
    </Block>;

export default Example1;
