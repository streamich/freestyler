import {createElement as h} from 'react';
import Component from 'freestyler/src/react/Component';

export default class extends Component<any, any> {
    static css = {
        position: 'absolute',
        borderRadius: '50%',
        background: 'red',
        width: '20px',
        height: '20px',
    };

    css() {
        const {x, y} = this.props;
        return {
            top: y + 'px',
            left: x + 'px',
        };
    }

    render() {
        return h('div');
    }
}
