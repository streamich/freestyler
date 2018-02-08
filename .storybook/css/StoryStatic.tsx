import {createElement as h, Component} from 'react';
import css from '../../src/react/css';

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

@css
export class Button extends Component<any, any> {
    static css = {
        bg: 'red',
        w: '320px',
        pad: '20px',
        bdrad: '5px',
        bd: 'none',
        outline: 'none',
        '&:hover': {
            col: '#fff',
        },
        '&:active': {
            pos: 'relative',
            top: '2px',
        },
        '@media (max-width: 480px)': {
            w: '160px',
        },
    };

    css = ({props}) => ({
        border: '1px solid ' + (props.color || 'tomato')
    });

    render () {
        return <button>Hello world!</button>;
    }
}
