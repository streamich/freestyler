import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import {css} from '../../src/index';

class Button extends Component {
    state = {
        cnt: 0,
    };

    componentWillUnmount() {}

    @css({
        col: 'red',
        '@media (max-width: 1000px)': {
            col: 'black',
        },
        _: {
            html: {
                bg: '#eee',
            },
        },
    })
    @css(
        (__, state) => ({
            '&:hover': {
                bg: `rgba(0, 0, 0, ${state.cnt / 100})`,
            },
            '.cnt': {
                bg: `rgba(0, 0, 0, ${state.cnt / 100})`,
            },
        }),
        true
    )
    render() {
        return h(
            'div',
            {
                onClick: () => this.setState({cnt: this.state.cnt + 1}),
            },
            'Button ',
            h('span', {className: 'cnt'}, `(${this.state.cnt})`)
        );
    }
}

class Square extends Component {
    @css({
        w: '100px',
        h: '100px',
        bd: '1px solid red',
    })
    render() {
        return h('div');
    }
}

const Square2 = css.div(
    {
        w: '100px',
        h: '100px',
        bd: '1px solid green',
    },
    ({background, isBig}) => ({
        background,
        fz: isBig ? '2em' : '1em',
    })
);

const BlueText = css.span({col: 'blue'});

const Navigation = css.styled('nav')({bd: '2px solid blue'});

const yellowBackgroundHoc = css.hoc({bg: 'yellow'});
const SomeText = props => h('div', props, 'Some text 1');
const YellowText = yellowBackgroundHoc(SomeText as any);

class Tween extends Component<any, any> {

    time = Date.now();

    state = {
        value: 0,
    };

    interval;

    componentDidMount() {
        this.interval = setInterval(this.onInterval, 20);
    }

    onInterval = () => {
        const time = Date.now();
        if(time > this.time + this.props.time) {
            this.setState({value: 1});
            clearInterval(this.interval);
        } else {
            this.setState({
                value: (time - this.time) / this.props.time,
            });
        }
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return this.props.children(this.state.value);
    }
}

class Toggle extends Component<any, any> {

    state = {
        isVisible: true,
    };

    onToggle = () => this.setState({isVisible: !this.state.isVisible});

    render() {
        return this.props.children(this.onToggle, this.state.isVisible);
    }
}

class App extends Component {
    state = {
        hide: false,
    };

    @css(() => {
        return {
            pad: '30px',
        };
    })
    render() {
        // prettier-ignore
        return h('div', {},
            h(Button),
            this.state.hide ? null : h(Button),
            h('div', {
                onClick: () => this.setState({hide: !this.state.hide}),
            },
                'Toggle button 3'
            ),
            h(Square),
            h(Square2, {background: 'red'}, 'children...'),
            h(Square2, {isBig: true}, 'Hello world'),
            h(Square2, {},
                h(BlueText, {}, 'Is this blue?'),
            ),
            h(Navigation, {}, 'Navigation'),
            h(YellowText),
            h(Tween, {time: 2000}, value => {
                return h(css.div(null, {
                    w: '20px',
                    h: '20px',
                    bg: 'tomato',
                    pos: 'fixed',
                    top: '10px',
                    left: (10 + value * 200) + 'px',
                }));
            }),
            h(Toggle, {}, (onToggle, isVisible) => {
                const Container = css.div(null, {
                    '& .content': {
                        vis: isVisible ? 'visible' : 'hidden'
                    }
                });

                return h(Container, {},
                    h('div', {onClick: onToggle}, 'Title'),
                    h('div', {className: 'content'}, 'Content')
                );
            }),
        );
    }
}

const el = document.createElement('div');
document.body.appendChild(el);
render(h(App), el);
