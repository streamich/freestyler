import {cloneElement} from 'react';
import {TCssTemplate} from 'freestyler-renderer/src/types';
import renderer from '../../renderer';
import * as extend from 'fast-extend';

const transformMethodRenderStatic = (Comp, render_, staticTemplate: TCssTemplate) => {
    return function() {
        const ast = render_.apply(this, arguments);
        const {props} = ast;
        let className = renderer.renderStatic(Comp, staticTemplate, [this]);
        if (props.className) className += ' ' + props.className;

        if (process.env.NODE_ENV === 'production') {
            props.className = className;
            return ast;
        } else {
            return cloneElement(ast, extend({}, props, {className}), ast.props.children);
        }
    };
};

export default transformMethodRenderStatic;
