import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import StyleSheet from 'freestyler/src/StyleSheet';

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
    },
    button: {
        background: 'red',
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
    },
});

class App extends Component<any, any> {
    render() {
        // prettier-ignore
        return h('div', {className: styles.container},
          h('button', {className: styles.button},
            'This is button'
          )
        );
    }
}

render(h(App), document.body);
