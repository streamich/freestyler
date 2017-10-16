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
import transformStatic from './transformStatic';
import transformDynamic from './transformDynamic';
import * as extend from 'fast-extend';

const decoratorRender = function(tpl: IStyles, dynamic?: boolean) {
    return (instance, key, descriptor) => {
        if (!tpl) return descriptor;

        const {componentWillUnmount: componentWillUnmount_} = instance;
        const render_ = descriptor.value;

        if (dynamic) {
            const [render, componentWillUnmount] = transformDynamic(
                render_,
                componentWillUnmount_,
                tpl
            );
            instance.componentWillUnmount = componentWillUnmount;
            descriptor.value = render;
        } else {
            const [render, componentWillUnmount] = transformStatic(
                instance.constructor,
                render_,
                componentWillUnmount_,
                tpl
            );
            instance.componentWillUnmount = componentWillUnmount;
            descriptor.value = render;
        }

        return descriptor;
    };
};

export default decoratorRender;
