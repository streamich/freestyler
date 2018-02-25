import {Component, createElement as h} from 'react';
import css from '../../src/react/css';

@css({
    width: '320px',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    '&:hover': {
        color: '#fff',
    },
    '&:active': {
        position: 'relative',
        top: '2px',
    },
})
class Button extends Component<any, any> {
    @css(function({props}) {
        return {
            padding: '20px',
            background: props.color || 'blue',
        };
    })
    render() {
        return h('button', {}, this.props.children);
    }
}

@css
export class Container extends Component<any, any> {
    static css = {
        textAlign: 'center',
    };

    render() {
        // prettier-ignore
        return h('div', {},
        	h(Button, {color: 'green'},
            	'This is button'
        	)
        );
    }
}
