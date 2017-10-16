import {cloneElement, Component} from 'react';
import {IStyles} from 'freestyler-renderer/src/types';
import transformStatic from './transformStatic';
import transformDynamic from './transformDynamic';

const decoratorClass = function decoratorClass(tpl: IStyles, dynamic?: boolean) {
    return Comp => {
        if (!tpl) return;

        const {prototype} = Comp;
        const {render: render_, componentWillUnmount: componentWillUnmount_} = prototype;
        let render, componentWillUnmount;

        if (dynamic) {
            [render, componentWillUnmount] = transformDynamic(render_, componentWillUnmount_, tpl);
        } else {
            [render, componentWillUnmount] = transformStatic(Comp, render_, componentWillUnmount_, tpl);
        }

        prototype.render = render;
        prototype.componentWillUnmount = componentWillUnmount;
    };
};

export default decoratorClass;
