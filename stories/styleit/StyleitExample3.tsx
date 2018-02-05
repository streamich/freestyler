import {createElement as h, Component} from 'react';
import {Styleit} from '../../packages/freestyler/src/react/styleit';

export default class StyleitExample3 extends Component<any, any> {
    render() {
        return <Styleit ta='center'>
            <div>
                <Styleit
                    background='red'
                    width='320px'
                    padding='20px'
                    borderRadius='5px'
                    border='none'
                    outline='none'
                    {...{
                        '&:hover': {
                            color: '#fff',
                        },
                        '&:active': {
                            position: 'relative',
                            top: '2px',
                        },
                        '@media (max-width: 480px)': {
                            width: '160px',
                        }
                    }}
                >
                    <button>Hello world 3</button>
                </Styleit>
            </div>
        </Styleit>;
    }
}
