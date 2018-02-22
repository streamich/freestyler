import {cloneElement} from 'react';
import {TCssTemplateCallback} from '../../types/index';
import {$$el} from './util';
import renderer from '../../renderer';
const {extend} = require('fast-extend');

const transformMethodRenderDynamic = (prototype, dynamicTemplate: TCssTemplateCallback) => {
    const render_ = prototype.render;

    prototype.render = function() {
        const ast = render_.apply(this, arguments);
        const {props} = ast;
        const className =
            (props.className ? props.className : '') +
            renderer.render(this.constructor, this, this[$$el], dynamicTemplate(this));

        // Obtain ref to the root DOM element for boost in performance.
        const originalRef = ast.ref;
        const ref = element => {
            this[$$el] = element;
            if (originalRef) originalRef(element);
        };

        if (process.env.NODE_ENV === 'production') {
            ast.ref = ref;
            props.className = className;
            return ast;
        } else {
            return cloneElement(ast, {...props, ref, className}, props.children);
        }
    };
};

export default transformMethodRenderDynamic;
