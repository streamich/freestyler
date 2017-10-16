import {cloneElement} from 'react';
import {IStyles} from 'freestyler-renderer/src/types';
import renderer from '../renderer';
import * as extend from 'fast-extend';

const transformDynamic = function transformDynamic(render_, componentWillUnmount_, tpl: IStyles) {
    const componentWillUnmount = function() {
        if (componentWillUnmount_) componentWillUnmount_.apply(this, arguments);
        renderer.removeDynamic(this, null);
    };

    const render = function() {
        const rendered = render_.apply(this, arguments);
        const {props} = rendered;
        const {state, context} = this;
        const className =
            (props.className ? props.className + ' ' : '') +
            renderer.injectDynamic(this, null, tpl, [props, state, context]).join(' ');

        if (process.env.NODE_ENV === 'production') {
            props.className = className;
            return renderer;
        } else {
            return cloneElement(rendered, extend({}, props, {className}), rendered.props.children);
        }
    };

    return [render, componentWillUnmount];
};

export default transformDynamic;
