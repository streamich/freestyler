import {VSheet} from '../../freestyler/src/virtual';
import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import {css} from '../../freestyler/src/index';

const Box = css.div(
    {
        bg: '#eee',
        pos: 'fixed',
    },
    ({x, y}) => ({
        '&:hover': {
            col: 'black',
        },
        bd: '1px solid yellow',
        col: 'white',
        w: '100px',
        h: '100px',
        'z-index': 2,
        d: 'block',
        top: y + 'px',
        left: x + 'px',
    })
);

class App extends Component {
    state: any = {};

    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove);
    }

    frame;

    onMouseMove = e => {
        cancelAnimationFrame(this.frame);
        this.frame = requestAnimationFrame(() => {
            this.setState({
                x: e.clientX,
                y: e.clientY,
            });
        });
    };

    render() {
        // prettier-ignore
        return h('div', {
            style: {
                width: 100,
                height: 100,
                position: 'fixed',
                // top: this.state.y + 'px',
                // left: this.state.x + 'px',
            }
        },
            h(Box, {x: this.state.x, y: this.state.y},
                'here...'
            )
        );
    }
}

render(h(App), document.body);
