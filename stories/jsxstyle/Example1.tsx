import {createElement as h, Component} from 'react';
import {jsxstyle, Block, InlineBlock} from '../../packages/freestyler/src/react/jsxstyle';

const Example1 = () =>
    <Block ta='center'>
        <InlineBlock
            background='red'
            width='320px'
            padding='20px'
            borderRadius='5px'
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
            <button>Hello world 3</button>
        </InlineBlock>
    </Block>;

export default Example1;
