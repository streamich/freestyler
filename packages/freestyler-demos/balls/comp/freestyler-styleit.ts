import {createElement as h} from 'react';
import {styleit} from 'freestyler/src/react/styleit';

export default ({x, y}) => {
    return styleit(
        {
            pos: 'absolute',
            bdrad: '50%',
            bg: 'red',
            w: '20px',
            h: '20px',
            top: y + 'px',
            left: x + 'px',
        },
        h('div')
    );
};
