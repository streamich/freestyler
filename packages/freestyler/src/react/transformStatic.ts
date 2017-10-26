import {cloneElement} from 'react';
import {IStyles} from 'freestyler-renderer/src/types';
import renderer from '../renderer';
import * as extend from 'fast-extend';

const transformStatic = function transformStatic(Comp, render_, componentWillUnmount_, tpl: IStyles) {
    const render = function() {
        const rendered = render_.apply(this, arguments);
        const {props} = rendered;
        const {state, context} = this;
        let className = renderer.renderStatic(Comp, tpl, [props, state, context]);
        if (props.className) className += ' ' + props.className;

        if (process.env.NODE_ENV === 'production') {
            props.className = className;
            return renderer;
        } else {
            return cloneElement(rendered, extend({}, props, {className}), rendered.props.children);
        }
    };

    return [render, componentWillUnmount_];
};

export default transformStatic;
