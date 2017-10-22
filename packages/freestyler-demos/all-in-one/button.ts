import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import Renderer from 'freestyler-renderer/src/Renderer';
import Classy from 'freestyler/src/react/Classy';

/*
const renderer = new Renderer();

const classNames1 = renderer.render(
    {} as any,
    {},
    null,
    props => ({
        color: props.color,
        // w: '300px',
        // h: '50px',
        // bg: '#eee',
        // borderRadius: '4px',
        // cursor: 'normal',
        // d: 'block',
        // '&:hover': {
            // color: '#fff',
            // bg: 'tomato',
            // cursor: 'pointer',
        // },
    }),
    [
        {
            color: 'tomato',
        },
    ]
);

const classNames2 = renderer.render(
    {} as any,
    {},
    null,
    props => ({
        w: '300px',
        h: '50px',
    }),
    []
);
*/

@Classy
class Button extends Component {
    static style = ({state}) => {
        let tpl: any = {
            bd: '1px solid red',
            d: 'block',
            cursor: 'pointer',
            width: '500px',
            fw: state.hovered ? 'bold' : 'normal',
            bg: '#eee',
            '&:hover': {
                td: 'underline',
                fs: state.hovered ? 'italic' : 'normal',
            },
            ['@media (max-width: 600px)']: {
                width: '300px',
                fw: 'bold',
            },
        };

        if (state.hovered) {
            tpl.color = 'red';
        }

        return tpl;
    };

    state = {
        hovered: false,
    };

    ref = element => {
        // console.log('element', element);
    };

    render() {
        return h(
            'div',
            {
                ref: this.ref,
                onMouseEnter: () => this.setState({hovered: true}),
                onMouseLeave: () => this.setState({hovered: false}),
            },
            this.props.children
        );
    }
}

class App extends Component {
    render() {
        // prettier-ignore
        return h('div', {
                style: {}
            },
            'App...',

            h(Button, {}, 'Click me!'),
            h(Button, {}, 'Click me 2!'),
        );
    }
}

render(h(App), document.body);
