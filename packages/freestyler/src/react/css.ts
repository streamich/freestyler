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
import renderer from '../renderers/renderer';
import styleit from './styleit';

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

        return {
            ...descriptor,
            value: function render() {
                const rendered = value.apply(this, arguments);
                const {props} = rendered;
                const {state, context} = this;
                const className = dynamic
                    ? renderer.injectDynamic(this, null, tpl, [
                          props,
                          state,
                          context,
                      ])
                    : renderer.injectStatic(Comp, tpl, [props, state, context]);
                const oldClassName = props.className || '';
                return cloneElement(
                    rendered,
                    {
                        ...props,
                        className:
                            oldClassName +
                            (oldClassName ? ' ' : '') +
                            className,
                    },
                    rendered.props.children
                );
            },
        };
    };
} as ICss;

export default css;
