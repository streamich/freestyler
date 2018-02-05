import {createElement as h, Component} from 'react';
import css from '../../packages/freestyler/src/react/css';

export class Story4thGenRender1 extends Component<any, any> {
    @css((a) => {
        return {
            bd: '1px solid tomato'
        };
    })
    render () {
        return <div>Hello world!</div>;
    }
}

export class Story4thGenRender2 extends Component<any, any> {
    @css(({props}) => {
        return {
            bd: '1px solid ' + (props.color || 'tomato')
        };
    })
    render () {
        return <div>Hello world!</div>;
    }
}
