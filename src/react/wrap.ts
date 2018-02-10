import {Component, createElement as h, cloneElement} from 'react';
import {sym, hidden} from '../util';
import {getName} from '../renderer/util';
import renderer from '../renderer';
import {TComponentType, TComponentTag, TCssTemplate, TCssDynamicTemplate} from '../types/index';
const {extend} = require('fast-extend');

export type TWrap<P> = (
    Element: TComponentTag<P>,
    template?: TCssTemplate,
    dynamicTemplateGetter?: TCssDynamicTemplate,
    displayName?: string
) => TComponentType<P>;

const wrap: TWrap<any> = function(tag, template, dynamicTemplateGetter) {
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
                return h(tag, this.props);
            } else {
                return h(tag, extend(props, {className, ref: this.ref}));
            }
        }
    }

    if (process.env.NODE_ENV !== 'production') {
        const name = getName(tag);
        (Wrap as any).displayName = (arguments[3] || 'wrap') + (name ? `__${name}` : '');
    }

    return Wrap;
};

export default wrap;
