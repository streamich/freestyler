import {createElement as h, Component} from 'react';
import css from '../../packages/freestyler/src/react/css';

@css
export class StoryStatic1 extends Component<any, any> {
    static css = {
        border: '1px solid tomato'
    };

    render () {
        return <div>Hello world!</div>;
    }
}

@css
export class StoryStatic2 extends Component<any, any> {
    css = ({props}) => ({
        border: '1px solid ' + (props.color || 'tomato')
    });

    render () {
        return <div>Hello world!</div>;
    }
}

@css
export class StoryStatic3 extends Component<any, any> {
    static css = () => ({
        bg: 'yellow'
    });

    css = ({props}) => ({
        border: '1px solid ' + (props.color || 'tomato')
    });

    render () {
        return <div>Hello world!</div>;
    }
}

@css
export class StoryStatic4 extends Component<any, any> {
    static css = {
        bg: 'yellow'
    };

    css = ({props}) => ({
        border: '1px solid ' + (props.color || 'tomato')
    });

    render () {
        return <div>Hello world!</div>;
    }
}
