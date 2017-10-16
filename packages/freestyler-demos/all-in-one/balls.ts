import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import {css} from '../../freestyler/src/index';

const Ball1 = css.div(
    {
        bg: 'red',
        op: 0.5,
        bdrad: '50%',
        pos: 'fixed',
    },
    ({x, y, width, height, time}) => ({
        left: Math.round(x) + 'px',
        top: Math.round(y) + 'px',
        width: Math.round(width) + 'px',
        height: Math.round(height) + 'px',
    })
);

const Ball2 = ({x, y, width, height, time}) =>
    h('div', {
        style: {
            background: 'red',
            opacity: 0.5,
            borderRadius: '50%',
            position: 'fixed',
            left: x + 'px',
            top: y + 'px',
            width: width + 'px',
            height: height + 'px',
        },
    });

const Ball3 = ({x, y, width, height, time}) => {
    const id = Date.now().toString();
    return h(
        'div',
        {},
        h('style', {}),
        h('div', {
            id,
            style: {
                background: 'red',
                opacity: 0.5,
                borderRadius: '50%',
                position: 'fixed',
                left: x + 'px',
                top: y + 'px',
                width: width + 'px',
                height: height + 'px',
            },
        })
    );
};

class App extends Component {
    state = {
        frame: 0,
        count: 10,
        time: 2000,
        ts: 0,
        oldPositions: [],
        positions: [],
    };

    componentDidMount() {
        this.startAnimation();
    }

    startAnimation = () => {
        this.updateTime();
        setInterval(this.updateTime, this.state.time);
        this.moveBalls();
    };

    updateTime = () => {
        const positions = [];
        const wh = window.innerHeight;
        const ww = window.innerWidth;
        for (let i = 0; i < this.state.count; i++) {
            const size = 50 + 100 * Math.random();
            positions.push([(ww - size) * Math.random(), (wh - size) * Math.random(), size]);
        }
        this.setState({
            ts: Date.now(),
            oldPositions: this.state.positions,
            positions,
        });
    };

    moveBalls = () => {
        this.setState({
            frame: this.state.frame + 1,
        });
        setTimeout(this.moveBalls, 200);
    };

    render() {
        const balls = [];
        const ts = Date.now();
        const rel = (ts - this.state.ts) / this.state.time;
        for (let i = 0; i < this.state.count; i++) {
            const oldPosition = this.state.oldPositions[i] || [0, 0, 50];
            if (!this.state.positions.length) return null;
            const position = this.state.positions[i];
            const [ox, oy, os] = oldPosition;
            const [x, y, s] = position;
            balls.push([
                h(Ball2, {
                    key: i,
                    x: rel * (x - ox) + ox,
                    y: rel * (y - oy) + oy,
                    width: rel * (s - os) + os,
                    height: rel * (s - os) + os,
                    time: this.state.time * 8,
                }),
            ]);
        }
        return h('div', null, balls);
    }
}

const el = document.createElement('div');
document.body.appendChild(el);
render(h(App), el);
