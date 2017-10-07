import {shallow} from 'enzyme';
import {Component, createElement as h} from 'react';
import {genStaticCb, injectStatic} from '../src/api';
import {css, dcss} from '../src/index';

class MyComp extends Component {
    componentWillMount() {
        const template = () => ({
            col: 'red',
            bd: '1px solid red',
        });
        const cb = genStaticCb(this.constructor, template);
        cb(this.props, this.state, this.context);
    }

    @css({
        col: 'red',
    })
    // @dcss(({theme: {background}}) => ({
    //     background,
    // }))
    render() {
        return h('div', {}, 'Hello...');
    }
}

const wrapper = shallow(h(MyComp));
console.log(wrapper.debug());
