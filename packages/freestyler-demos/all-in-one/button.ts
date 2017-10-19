import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import Renderer from 'freestyler-renderer/src/Renderer';

const renderer = new Renderer();

const classNames1 = renderer.render(
    {} as any,
    {},
    null,
    props => ({
        color: props.color,
        w: '300px',
        h: '50px',
        bg: '#eee',
        borderRadius: '4px',
        cursor: 'normal',
        d: 'block',
        '&:hover': {
            color: '#fff',
            bg: 'tomato',
            cursor: 'pointer',
        },
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

console.log(classNames1);
console.log(classNames2);

class App extends Component {
    render() {
        // prettier-ignore
        return h('div', {
                style: {}
            },
            'App...',
            h('div', {className: classNames1}, 'Button')
        );
    }
}

render(h(App), document.body);
