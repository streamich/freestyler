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
import styleit from './styleit';
import * as extend from 'fast-extend';

const css: ICss = function css(tpl: IStyles, second?: any) {
    if (second !== void 0 && typeof second !== 'boolean') {
        return styleit(tpl, second);
    }

    return (instance, key, descriptor) => {
        if (!tpl) return descriptor;

        const dynamic = !!second;
        const Comp: TComponentConstructor = instance.constructor;
        const {value} = descriptor;
        const {componentWillUnmount} = instance;

        instance.componentWillUnmount = function() {
            if (componentWillUnmount)
                componentWillUnmount.apply(this, arguments);
            if (dynamic) {
                renderer.removeDynamic(this, null);
            } else {
                renderer.removeStatic(Comp);
            }
        };

        return extend(descriptor, {
            value: function render() {
                const rendered = value.apply(this, arguments);
                const {props} = rendered;
                const {state, context} = this;
                let className = dynamic
                    ? renderer.injectDynamic(this, null, tpl, [
                          props,
                          state,
                          context,
                      ])
                    : renderer.injectStatic(Comp, tpl, [props, state, context]);
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
            },
        });
    };
} as ICss;

export default css;
