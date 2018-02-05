import {createElement as h, Component} from 'react';
import css from '../../packages/freestyler/src/react/css';

export class Story4thGenRender extends Component<any, any> {
    @css((a) => {
        console.log('a', a);
        return {
            bd: '1px solid tomato'
        };
    })
    render () {
        return <div>Hello world!</div>;
    }
}
