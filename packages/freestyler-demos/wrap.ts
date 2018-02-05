import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import wrap from 'freestyler/src/react/wrap';

const Button = wrap('div', null, () => ({color}) => ({
    width: '320px',
    bg: color,
    pad: '20px',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    color: 'white',
    '&:hover': {
        color: '#fff',
    },
    '&:active': {
        position: 'relative',
        top: '2px',
    },
}));

class CountButton extends Component<any, any> {
    state = {
        cnt: 1,
    };

    onClick = () => {
        this.setState(state => ({
            cnt: state.cnt + 1,
        }));
    };

    render() {
        return h(
            Button,
            {
                color: `rgb(${this.state.cnt * 10},${this.state.cnt * 10},${this.state.cnt * 10})`,
                onClick: this.onClick,
            },
            this.state.cnt
        );
    }
}

render(h(CountButton), document.body);
