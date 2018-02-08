import {createElement as h, Component} from 'react';
import {jsxstyle, Block, InlineBlock} from '../../packages/freestyler/src/react/jsxstyle';

const Button = jsxstyle('button', {
    background: 'red',
    width: '320px',
    padding: '20px',
    borderRadius: '5px'
});

const Example1 = () =>
    <Block ta='center'>
        <Button
            border='none'
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
