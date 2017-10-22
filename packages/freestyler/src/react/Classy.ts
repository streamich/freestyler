import {cloneElement} from 'react';
import renderer from '../renderer';
import * as extend from 'fast-extend';

const Classy = Comp => {
    const template = Comp.style;

    const {render: renderMethod} = Comp.prototype;
    Comp.prototype.render = function() {
        const rendered = renderMethod.call(this);
        const {props, state, context} = this;
        const classNames = renderer.render(Comp, this, this._el, template, [this]);
        const originalRef = rendered.ref;

        if (process.env.NODE_ENV === 'production') {
            rendered.ref = element => {
                this._el = element;
                if (originalRef) originalRef(element);
            };
            const {className} = rendered.props;
            rendered.props.className = (className || '') + classNames;

            return rendered;
        } else {
            return cloneElement(
                rendered,
                extend({}, rendered.props, {
                    className: (rendered.props.className || '') + classNames,
                    ref: element => {
                        this._el = element;
                        if (originalRef) originalRef(element);
                    },
                })
            );
        }
    };
};

export default Classy;
