import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
// import Ball from './comp/inline';
// import Ball from './comp/freestyler-wrap';
// import Ball from './comp/freestyler-component';
import Ball from './comp/freestyler-styleit';

const COUNT = 50;
const MIN = 50;
const MAX = 550;

class App extends Component<any, any> {
    state = {
        coords: [],
    };

    constructor(props, context) {
        super(props, context);

        for (let i = 0; i < COUNT; i++) {
            this.state.coords.push([MAX / 2, MAX / 2, Math.random() * 10 - 5, Math.random() * 10 - 5]);
        }
    }

    componentDidMount() {
        setTimeout(this.onFrame, 20);
    }

    onFrame = () => {
        this.setState(({coords}) => {
            const newCoords = [];
            for (let i = 0; i < COUNT; i++) {
                let [x, y, dx, dy] = coords[i];
                let xn = x + dx;
                let yn = y + dy;

                if (xn < MIN) {
                    xn = MIN;
                    dx = -dx;
                }

                if (xn > MAX) {
                    xn = MAX;
                    dx = -dx;
                }

                if (yn < MIN) {
                    yn = MIN;
                    dy = -dy;
                }

                if (yn > MAX) {
                    yn = MAX;
                    dy = -dy;
                }

                newCoords.push([xn, yn, dx, dy]);
            }

            requestAnimationFrame(this.onFrame);

            return {
                coords: newCoords,
            };
        });
    };

    render() {
        const balls = [];
        for (let i = 0; i < COUNT; i++) {
            const [x, y] = this.state.coords[i];
            balls.push(
                h(Ball, {
                    key: i,
                    x,
                    y,
                })
            );
        }

        return h('div', {}, balls);
    }
}

render(h(App), document.body);
