import {Component, createElement as h} from 'react';
import * as React from 'react';
import {render} from 'react-dom';
import {Theme, Themed, themed} from "../../freestyler/src/theme";
import {createFreestyler} from "freestyler";

const css = createFreestyler(React);

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
        if (time > this.time + this.props.time) {
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


const ContainerFacc = css.facc('div', {
    border: '1px solid red',
})((onToggle, isVisible) => Comp => [{
    '> .content': {
        vis: isVisible ? 'visible' : 'hidden',
    },
},
    h(Comp, {},
        h('div', {onClick: onToggle}, 'Title 4'),
        h('div', {className: 'content'}, 'Content')
    )
]);

const TweenFacc = css.facc('div', {
    w: '20px',
    h: '20px',
    bg: 'tomato',
    pos: 'fixed',
    top: '40px',
})(value => Comp => [{
    left: (10 + value * 200) + 'px',
}, h(Comp)]);




const Wrapped = css.wrap('div', null, () => {
    return (props, state, context) => {
        return {
            bg: 'tomato',
            col: 'white',
        };
    };
});

const Bold = css.hoc({fw: 'bold'});
const Italic = css.hoc({fs: 'italic'});
const Underlined = css.hoc({td: 'underline'});
const Frame = css.hoc({bd: '1px solid red'});

const BoldItalicUnderlinedDiv = Bold(Italic(Underlined('div')));

const Null = () => null;
const GlobalCssHoc = (staticTemplate, dynamic?) =>
    css.styled(Null)({_: staticTemplate}, (...args) => ({_: dynamic ? dynamic(...args) : {}}));

const GlobalStyles = GlobalCssHoc({
    body: {
        'font-family': 'monospace',
        // More global styling...
    }
});

const CssReset = GlobalCssHoc({
    html: {
        bxz: 'border-box',
        fz: '16px',
    },
    '*, *:before, *:after': {
        bxz: 'inherit',
    },
    'body, h1, h2, h3, h4, h5, h6, p, ol, ul': {
        mar: 0,
        pad: 0,
        fw: 'normal',
    },
});

const DynamicGlobalStyles = GlobalCssHoc(null, ({background, theme}) => ({
    body: {
        background,
        // Change globa styles dynamically as `theme` mutates.
        col: theme.textColor,
    }
}));

const Style = ({children}) => {
    const EmitCss = GlobalCssHoc(null, () => children);
    return h(EmitCss);
};

const BgBorder = ({theme}) => h('div', {style: {border: '1px solid ' + theme.background}}, 'bg-border');
const ThemedBgBorder = themed(BgBorder);

const BgBorder2 = css.div(({theme}) => ({
    bd: '1px solid ' + theme.background,
}));
const ThemedBgBorder2 = themed(BgBorder2);

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

        let tweenTemplate = {
            '> .content': {
                vis: 'visible',
            },
        };
        const ToggleWrapComp = css.wrap('div', null, () => tweenTemplate);
        ToggleWrapComp.setCss = (tpl) => tweenTemplate = tpl;


        const Box = css.div({
            w: '20px',
            h: '20px',
            bg: 'tomato',
            pos: 'fixed',
            top: '70px',
        });

        const TweenFacc2 = css.styled(Box)();

        const Box2 = css.div({
            w: '20px',
            h: '20px',
            bg: 'tomato',
            pos: 'fixed',
            top: '90px',
        });

        const BoxTweenFacc = css.facc(Box2)(value => Comp => [
            {left: (10 + value * 200) + 'px'},
            h(Comp),
        ]);

        // prettier-ignore
        return h('div', {},
            // h(GlobalStyles),
            h(CssReset),
            h(DynamicGlobalStyles, {background: "#eee", theme: {textColor: 'black'}}),
            // h(Style, null, {
            //     body: {
            //         background: 'black',
            //         color: 'green',
            //     }
            // }),
            // h(Button),
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
            h(Tween, {time: 2000}, TweenFacc),
            h(Tween, {time: 2000}, (value) => {
                TweenFacc2.css({
                    left: (10 + value * 200) + 'px',
                });
                return h(TweenFacc2);
            }),
            h(Tween, {time: 2000}, BoxTweenFacc),
            h(Toggle, {}, (onToggle, isVisible) => {
                const Container = css.div(null, {
                    '& .content': {
                        vis: isVisible ? 'visible' : 'hidden'
                    }
                });

                return h(Container, {},
                    h('div', {onClick: onToggle}, 'Title 1'),
                    h('div', {className: 'content'}, 'Content')
                );
            }),
            h(Toggle, {}, ContainerFacc),
            h(Toggle, {}, (onToggle, isVisible) => {
                ToggleWrapComp.setCss({
                    '> .content': {
                        vis: isVisible ? 'visible' : 'hidden',
                    },
                });
                return h(ToggleWrapComp, {},
                    h('div', {onClick: onToggle}, 'Title 3'),
                    h('div', {className: 'content'}, 'Content')
                );
            }),
            h(Wrapped, {}, 'LOL'),
            h(Frame(Underlined(Bold(Italic('span')))), {}, 'Hello there'),
            h(Frame(BoldItalicUnderlinedDiv), {}, 'Hello there 2'),
            h(Theme, {value: {color: 'blue', background: 'red'}},
                h(Theme, {value: {color: 'white'}},
                    h(Themed, {}, value => {
                        return h('div', {style: {
                            color: value.color,
                            background: value.background,
                        }}, h('pre', {}, JSON.stringify(value, null, 2)));
                    }),
                    h(ThemedBgBorder),
                    h(ThemedBgBorder2, {}, 'trololo4'),
                ),
            ),
        );
    }
}

const el = document.createElement('div');
document.body.appendChild(el);
render(h(App), el);
