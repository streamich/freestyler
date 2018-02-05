import {createElement, Component} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');
import hyperstyle from '../packages/freestyler/src/react/hyperstyle';

const h: any = hyperstyle(createElement, {
    container: {
        textAlign: 'center',
    },
    button: () => ({
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
        // '@media (max-width: 480px)': {
            // width: '160px',
        // },
    }),
});

class Example1 extends Component<any, any> {
    render() {
        // prettier-ignore
        return h('div', {styleName: 'container'},
          h('button', {styleName: 'button'},
            'This is button'
          )
        );
    }
}

storiesOf('hyperstyle', module)
  .add('Basic', () => <Example1 />)
