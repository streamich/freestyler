import {createElement as h, Component} from 'react';
import {Styleit} from '../../src/react/styleit';

export default class StyleitExample2 extends Component<any, any> {
    render() {
        return <Styleit css={{ta: 'center'}}>{className =>
            <div className={className}>
                <Styleit css={{
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
                }}>{className =>
                    <button className={className}>Hello world 2</button>
                }</Styleit>
            </div>
        }</Styleit>;
    }
}
