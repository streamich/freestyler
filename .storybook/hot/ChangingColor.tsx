import {Component, createElement as h} from 'react';
import {hot} from '../../src';
import Example1 from './Button';

class ChangingColor extends Component<any, any> {
    state = {
        cnt: 0,
        color: 'rgb(0,0,0)'
    };

    onClick = () => {
        const cnt = this.state.cnt + 10;

        this.setState({
            cnt,
            color: `rgb(${cnt}, ${cnt}, ${cnt})`
        });
    };

    render() {
        return (
            <div onClick={this.onClick}>
                <Example1 color={this.state.color} />
            </div>
        );
    }
}

export default ChangingColor;
