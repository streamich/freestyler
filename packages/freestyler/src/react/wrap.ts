import {Component, createElement as h, cloneElement} from 'react';
import {getName} from 'freestyler-renderer/src/util';
import renderer from '../renderer';
import {TElement, TCssTemplate, TCssDynamicTemplate} from 'freestyler-renderer/src/types';

export function wrap(
    Element: TElement,
    template?: TCssTemplate,
    dynamicTemplateGetter?: TCssDynamicTemplate,
    displayName: string = 'wrap'
) {
    let staticClassName: string;
    const name = getName(Element);
    const Wrap = class Wrap extends Component<any, any> {
        cNs: string = '';

        onRender(props, state, context) {
            if (!dynamicTemplateGetter) return;
            const dynamicTemplate = dynamicTemplateGetter();
            if (!dynamicTemplate) return;

            this.cNs = renderer.render(Wrap, this, null, dynamicTemplate, [props, state, context]);
        }

        componentWillMount() {
            const {props, state, context} = this;

            if (template) {
                staticClassName = renderer.renderStatic(Wrap, template, [props, state, context]);
            }

            this.onRender(props, state, context);
        }

        componentWillUpdate(props, state, context) {
            this.onRender(props, state, context);
        }

        componentWillUnmount() {
            renderer.unrender(Wrap, this, null);
        }

        render() {
            let {className, ...props} = this.props;
            className = className || '';
            if (staticClassName) className += (className ? ' ' : '') + staticClassName;
            const {cNs} = this;
            if (cNs && cNs.length) className += (className ? ' ' : '') + this.cNs;
            return h(Element, {...props, className});
        }
    };

    if (process.env.NODE_ENV !== 'production') {
        (Wrap as any).displayName = displayName + (name ? `__${name}` : '');
    }

    return Wrap;
}

export default wrap;
