import {createElement as h, Component} from 'react';
import css from '../../packages/freestyler/src/react/css';

@css
export class Story3rdGenStatic1 extends Component<any, any> {
    static css = {
        border: '1px solid tomato'
    };

    render () {
        return <div>Hello world!</div>;
    }
}

@css
export class Story3rdGenStatic2 extends Component<any, any> {
    css = {
        border: '1px solid tomato'
    };

    render () {
        return <div>Hello world!</div>;
    }
}
