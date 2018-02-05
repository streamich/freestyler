import {createElement as h} from 'react';
import {render} from 'react-dom';
import Component from 'freestyler/src/react/Component';

class Button extends Component<any, any> {
    static css = {
        width: '320px',
        padding: '20px',
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
        '@media (max-width: 480px)': {
            width: '160px',
        },
    };

    css() {
        return {
            background: this.props.color || 'blue',
        };
    }

    render() {
        return h('button', {}, this.props.children);
    }
}

class Container extends Component<any, any> {
    static css = {
        textAlign: 'center',
    };

    render() {
        // prettier-ignore
        return h('div', {},
        	h(Button, {color: 'red'},
            	'This is button'
        	)
        );
    }
}

render(h(Container), document.body);
