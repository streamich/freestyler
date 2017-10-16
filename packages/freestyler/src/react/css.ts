import {cloneElement} from 'react';
import {ICss, IStyles} from 'freestyler-renderer/src/types';
import decoratorRender from './decoratorRender';
import decoratorClass from './decoratorClass';
import styleit from './styleit';

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
