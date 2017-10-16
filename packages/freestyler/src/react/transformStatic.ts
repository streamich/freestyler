import {cloneElement} from 'react';
import {
    TComponentConstructor,
    TCssTemplate,
    ICss,
    TElement,
    TStyled,
    IStyles,
    THoc,
} from '../types';
import renderer from '../renderers/defaultRenderer';
import * as extend from 'fast-extend';

const transformStatic = function transformStatic(
    Comp,
    render_,
    componentWillUnmount_,
    tpl: IStyles
) {
    const componentWillUnmount = function() {
        if (componentWillUnmount_) componentWillUnmount_.apply(this, arguments);
        renderer.removeStatic(Comp);
    };

    const render = function() {
        const rendered = render_.apply(this, arguments);
        const {props} = rendered;
        const {state, context} = this;
        let className = renderer.injectStatic(Comp, tpl, [
            props,
            state,
            context,
        ]);
        if (props.className) className += ' ' + props.className;

        if (process.env.NODE_ENV === 'production') {
            props.className = className;
            return renderer;
        } else {
            return cloneElement(
                rendered,
                extend({}, props, {className}),
                rendered.props.children
            );
        }
    };

    return [render, componentWillUnmount];
};

export default transformStatic;
