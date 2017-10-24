import {cloneElement} from 'react';
import {IStyles} from 'freestyler-renderer/src/types';
import renderer from '../renderer';
import * as extend from 'fast-extend';

const transform = Comp => {
    const {prototype, style: template} = Comp;
    const {render: render_, componentWillUnmount: componentWillUnmount_} = prototype;

    const componentWillUnmount = function() {
        renderer.unrender(Comp, this, this._el);
        if (componentWillUnmount_) componentWillUnmount_.apply(this, arguments);
    };

    const render = function() {
        const rendered = render_.call(this);
        const {props, state, context} = this;
        const classNames = renderer.render(Comp, this, this._el, template, [this]);
        const originalRef = rendered.ref;
        const ref = element => {
            this._el = element;
            if (originalRef) originalRef(element);
        };

        if (process.env.NODE_ENV === 'production') {
            rendered.ref = ref;
            rendered.props.className = (rendered.props.className || '') + classNames;
            return rendered;
        } else {
            return cloneElement(rendered, {
                ...rendered.props,
                className: (rendered.props.className || '') + classNames,
                ref,
            });
        }
    };

    prototype.componentWillUnmount = componentWillUnmount;
    prototype.render = render;
};

export default transform;
