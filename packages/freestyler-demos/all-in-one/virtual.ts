import {VSheet} from '../../freestyler/src/virtual';
import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import {css, styleit} from '../../freestyler/src/index';
import loadBalancer from '../../freestyler/src/perf/loadBalancer';

const Box1 = css.div(
    {
        pos: 'fixed',
        '&:hover': {
            col: 'black',
        },
        bd: '1px solid yellow',
        bg: 'red',
        col: 'white',
        w: '100px',
        h: '100px',
        'z-index': 2,
        d: 'block',
        bdrad: '50%',
        op: 0.3,
    },
    ({x, y}) => ({
        top: y + 'px',
        // left: x + 'px',
    })
);

class BoxInlineStyles extends Component<any, any> {
    render() {
        const {x, y} = this.props;
        return h('div', {
            style: {
                position: 'fixed',
                border: '1px solid yellow',
                background: 'red',
                color: 'white',
                width: '100px',
                height: '100px',
                zIndex: 2,
                display: 'block',
                borderRadius: '50%',
                opacity: 0.3,
                top: y + 'px',
                left: x + 'px',
            },
        });
    }
}

function BoxInlineStylesWrapper(x, y) {
    // console.trace();
    return h(
        'div',
        {
            style: {
                position: 'fixed',
                border: '1px solid yellow',
                background: 'red',
                color: 'white',
                width: '100px',
                height: '100px',
                zIndex: 2,
                display: 'block',
                borderRadius: '50%',
                opacity: 0.3,
                top: y + 'px',
                left: x + 'px',
            },
        },
        'DIV 3'
    );
}

class Box3 extends Component<any, any> {
    render() {
        const id = 'c' + Math.round(Math.random() * 1e9).toString(36);
        const {x, y} = this.props;
        return h(
            'div',
            {},
            h('style', {
                ref: style => {
                    if (style) {
                        style.innerText = `#${id}{top:${y}px}`;
                    }
                },
            }),
            h('div', {
                id,
                style: {
                    position: 'fixed',
                    border: '1px solid yellow',
                    bg: 'red',
                    color: 'white',
                    width: '100px',
                    height: '100px',
                    'z-index': 2,
                    display: 'block',
                    bdrad: '50%',
                    opacity: 0.3,
                    // top: y + 'px',
                    // left: x + 'px',
                },
            })
        );
    }
}

const Box4 = ({x, y}) => {
    return styleit(
        {
            position: 'fixed',
            border: '1px solid yellow',
            background: 'red',
            color: 'white',
            width: '100px',
            height: '100px',
            zIndex: 2,
            display: 'block',
            borderRadius: '50%',
            opacity: 0.3,
            top: y + 'px',
            left: x + 'px',
        },
        h('div', {}, 'DIV')
    );
};

const Box = css.div({
    position: 'fixed',
    border: '1px solid yellow',
    background: 'red',
    color: 'white',
    width: '100px',
    height: '100px',
    zIndex: 2,
    display: 'block',
    borderRadius: '50%',
    opacity: 0.3,
});

function BoxStyleit1(x, y) {
    // console.trace();
    return css(
        {
            top: y + 'px',
            left: x + 'px',
        },
        h(Box, {}, 'DIV 2')
    );
}

const inlineVsStyleit = loadBalancer(BoxInlineStylesWrapper, BoxStyleit1);

class App extends Component {
    state: any = {
        frame: 0,
        x: 40,
        y: 40,
    };

    componentDidMount() {
        // document.addEventListener('mousemove', this.onMouseMove);
        this.countFrame();
    }

    countFrame = () => {
        this.setState({
            frame: this.state.frame + 1,
        });
        requestAnimationFrame(this.countFrame);
    };

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
            // h(Box3, {x: this.state.x, y: this.state.y},
            //     'here...'
            // ),
            
            //
            // h(Box2, {x: this.state.x, y: this.state.y}, 'DIV'),
            // h(Box4 as any, {x: this.state.x, y: this.state.y}),
            inlineVsStyleit(300 * Math.random(), 300 * Math.random()),
        );
    }
}

render(h(App), document.body);
