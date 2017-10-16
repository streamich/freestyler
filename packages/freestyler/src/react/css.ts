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
import decoratorRender from './decoratorRender';
import decoratorClass from './decoratorClass';
import styleit from './styleit';
import * as extend from 'fast-extend';

const css: ICss = function css(tpl: IStyles, second?: any) {
    if (second !== void 0 && typeof second !== 'boolean') {
        return styleit(tpl, second);
    }

    return (instanceOrComp, key, descriptor) =>
        typeof key === 'string'
            ? decoratorRender(tpl, second)(instanceOrComp, key, descriptor)
            : decoratorClass(tpl, second)(instanceOrComp);
} as ICss;

export default css;
