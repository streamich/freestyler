import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import css from 'freestyler/src/react/css';
@css
@css({
    width: '320px',
})
class Button extends Component<any, any> {
    static css = {
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
    };

    css() {
        return {
            background: this.props.color || 'blue',
            '@media (max-width: 480px)': {
                width: '160px',
            },
        };
    }

    @css(function() {
        return {
            padding: '20px',
        };
    })
    render() {
        return h('button', {}, this.props.children);
    }
}

@css
class Container extends Component<any, any> {
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

render(h(Container), document.body);
