import {createElement as h, Component} from 'react';
import {Styleit, styleit} from '../../src/react/styleit';

export default class Example1 extends Component<any, any> {
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
