import {Component, createElement as h} from 'react';
import {hot} from '../../src';

const Container = hot('div', {
    textAlign: 'center'
})();

const Button = hot('button', {
    bg: 'red',
    w: '320px',
    pad: '20px',
    bdrad: '5px',
    bd: 'none',
    outline: 'none',
    '&:hover': {
        col: '#fff',
    },
    '&:active': {
        pos: 'relative',
        top: '2px',
    },
    '@media (max-width: 480px)': {
        w: '160px',
    },
});

class Example1 extends Component<any, any> {
    render() {
        const ColoredButton = Button({
            bg: this.props.color || 'blue'
        });

        return (
            <Container>
                <ColoredButton>
                    Click me!
                </ColoredButton>
            </Container>
        );
    }
}

export default Example1;
