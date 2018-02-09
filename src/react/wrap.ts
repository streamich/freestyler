import {Component, createElement as h, cloneElement} from 'react';
import {sym, hidden} from '../util';
import {getName} from '../renderer/util';
import renderer from '../renderer';
import {TElement, TCssTemplate, TCssDynamicTemplate} from '../renderer/types';
import * as extend from 'fast-extend';

export type TWrap = (
    Element: TElement,
    template?: TCssTemplate,
    dynamicTemplateGetter?: TCssDynamicTemplate,
    displayName?: string
) => TElement;

const wrap: TWrap = function(Element, template, dynamicTemplateGetter) {
    let staticClassNames: string = '';

    class Wrap extends Component<any, any> {
        el = null;
        c = '';

        onRender(props, state, context) {
            if (!dynamicTemplateGetter) return;
            const dynamicTemplate = dynamicTemplateGetter();
            if (!dynamicTemplate) return;

            this.c = renderer.render(Wrap, this, this.el, dynamicTemplate, [props, state, context]);
        }

        componentWillMount() {
            const {props, state, context} = this;

            if (template) {
                staticClassNames = renderer.renderStatic(Wrap, template, [props, state, context]);
            }

            this.onRender(props, state, context);
        }

        componentWillUpdate(props, state, context) {
            this.onRender(props, state, context);
        }

        componentWillUnmount() {
            renderer.unrender(Wrap, this, this.el);
        }

        ref = element => {
            this.el = element;
        };

        render() {
            let {className: propsClassName, ...props} = this.props;
            const dynamicClassNames = this.c;
            const className = (propsClassName || '') + staticClassNames + dynamicClassNames;

            if (process.env.NODE_ENV === 'production') {
                const p: any = this.props as any;
                p.className = className;
                p.ref = this.ref;
                return h(Element, this.props);
            } else {
                return h(Element, extend(props, {className, ref: this.ref}));
            }
        }
    }

    if (process.env.NODE_ENV !== 'production') {
        const name = getName(Element);
        (Wrap as any).displayName = (arguments[3] || 'wrap') + (name ? `__${name}` : '');
    }

    return Wrap;
};

export default wrap;
