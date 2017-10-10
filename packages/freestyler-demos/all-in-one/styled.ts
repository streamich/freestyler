import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import {css} from '../../freestyler/src';
import CssReset from '../../freestyler/src/globals/CssResetTripoli';

const Box = css.div({
    bd: '1px solid red',
    w: '100px',
    h: '100px',
    '.nested': {
        col: 'red',
    },
    '@media(screen)': {
        col: 'blue',
    },
});

class App extends Component {
    render() {
        // prettier-ignore
        return h('div', {},
            h(CssReset),
            h(Box, {}, '2'),
        );
    }
}

render(h(App), document.body);
