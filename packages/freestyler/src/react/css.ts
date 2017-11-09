import {Component, cloneElement} from 'react';
import {ICss, IStyles} from 'freestyler-renderer/src/types';
import decoratorCssComponent from './decorator/cssComponent';
import decoratorClass from './decorator/class';
import decoratorMethod from './decorator/method';
import {styleit} from './styleit';

export type TCssDecorator = any;

const isReactComponent = f => !!(f && f.prototype && f.prototype.render);

const css: TCssDecorator = (a?, b?) => {
    // If component decorator without arguments.
    if (isReactComponent(a)) {
        decoratorCssComponent(a);
        return;
    }

    return (instanceOrComp, key, descriptor) =>
        typeof key === 'string'
            ? decoratorMethod(a, b)(instanceOrComp, key, descriptor)
            : decoratorClass(a, b)(instanceOrComp);
};

export default css;
