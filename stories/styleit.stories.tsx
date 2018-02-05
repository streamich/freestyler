import {createElement as h, Component} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');
import {Styleit, styleit} from 'freestyler/src/react/styleit';

class Example1 extends Component<any, any> {
    render() {
        return styleit({
            ta: 'center',
        },
            <div>
                {styleit({
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
                    <button>Hello world</button>
                )}
            </div>
        );
    }
}

storiesOf('styleit()', module)
  .add('Basic', () => <Example1 />)
