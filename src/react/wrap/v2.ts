import {Component, createElement as h, cloneElement} from 'react';
import {sym, hidden, noop} from '../../util';
import {getName} from '../../renderer/util';
import renderer from '../../renderer';
import {TComponentType, TComponentTag, TCssTemplate, TCssTemplateCallback} from '../../types/index';
const {extend} = require('fast-extend');

export type TWrap<P> = (
    Element: TComponentTag<P>,
    template?: TCssTemplate,
    dynamicTemplateGetter?: TCssTemplateCallback,
    name?: string
) => TComponentType<P>;

const wrap: TWrap<any> = (type, staticTemplate, dynamicTemplate, name?) => {
    let Wrap;
    let staticClassNames: string = null;

    Wrap = class extends Component<any, any> {
        el = null;

        ref = el => {
            this.el = el;
            (this.props.$ref || noop)(el);
        };

        constructor(props, context) {
            super(props, context);

            if (staticClassNames === null && staticTemplate) {
                if (typeof staticTemplate === 'function') {
                    staticTemplate = staticTemplate(props, this.state, context);
                }

                staticClassNames = renderer.renderStatic(Wrap, staticTemplate);
            }
        }

        componentWillUnmount() {
            renderer.unrender(Wrap, this, this.el);
        }

        render() {
            let {className: propsClassName, $type = type, $ref, ...props} = this.props;
            let className = (propsClassName || '') + staticClassNames;

            if (dynamicTemplate) {
                className += renderer.render(Wrap, this, this.el, dynamicTemplate(props, this.state, this.context));
            }

            if (process.env.NODE_ENV !== 'production') {
                return h($type, extend(props, {className, ref: this.ref}));
            }

            const p: any = this.props as any;

            p.className = className;
            p.ref = this.ref;

            return h($type, this.props);
        }
    };

    if (process.env.NODE_ENV !== 'production') {
        const name = getName(type);
        (Wrap as any).displayName = (name || 'wrap') + (name ? `__${name}` : '');
    }

    return Wrap;
};

export default wrap;
