import {cloneElement} from 'react';
import {IStyles} from 'freestyler-renderer/src/types';
import renderer from '../../renderer';
import * as extend from 'fast-extend';

const transformRenderMethod = (render_, tpl: IStyles) => {
    function render() {
        const rendered = render_.apply(this, arguments);
        const {props} = rendered;
        const {state, context} = this;
        const className =
            (props.className ? props.className + ' ' : '') +
            renderer.render(this.constructor, this, null, tpl, [props, state, context]);

        if (process.env.NODE_ENV === 'production') {
            props.className = className;
            return renderer;
        } else {
            return cloneElement(rendered, extend({}, props, {className}), rendered.props.children);
        }
    }

    return render;
};

export default transformRenderMethod;
