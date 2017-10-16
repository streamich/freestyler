import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import css from '../../freestyler/src';
import CssReset from '../../freestyler/src/globals/CssResetTripoli';
import logger from '../../freestyler/src/middleware/logger';
import {IStyles} from '../../freestyler/src/types';

const Box = css.div(
    {
        bg: 'tomato',
        col: '#fff',
        w: '100px',
        h: '100px',
        borderRadius: '10px',
        '& .nested': {
            col: 'red',
        },
        '@media(screen)': {
            col: 'blue',
        },
    },
    {
        d: 'block',
        bd: '1px solid blue',
    }
);

class App extends Component {
    @css({
        pad: '40px',
        $nested: {
            col: 'blue',
            $override: {
                col: 'pink',
            },
        },
    })
    render() {
        // prettier-ignore
        return h('div', {},
            h('div', {className: 'nested'},
                'blue',
                h('div', {className: 'override'},
                    'pink',
                ),
            ),
            h(CssReset),
            h(Box, {}, '1'),
            h(Box, {},
                '2',
                css.styleit({
                    color: 'yellow',
                    '&:hover': {
                        col: 'pink',
                    },
                },
                    h('div', {}, 'lol 2')
                )
            ),
        );
    }
}

render(h(App), document.body);
