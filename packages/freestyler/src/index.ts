import {Component, createElement as h, cloneElement} from 'react';
import {
    TComponentConstructor,
    TCssDynamicTemplate,
    TCssTemplate,
} from './types';
import {getName, IRenderer} from './renderers/util';
import {toCss, toStyleSheet, TStyles} from './ast';
import createStyled from './primitives/createStyled';
import createHoc from './primitives/createHoc';
import createFacc from './primitives/createFacc';
import {IStyles} from './types';
import OpinionatedRenderer from './renderers/OpinionatedRenderer';
import hoistGlobalsAndWrapContext from './renderers/hoistGlobalsAndWrapContext';

export type TElement =
    | string
    | TComponentConstructor
    | ((props?, state?, context?) => any);

export interface TFreestyleComponent extends TComponentConstructor {
    css(newDynamicTemplate: TCssTemplate);
}

export type TStyled<TResult> = (
    template?: TCssTemplate,
    dynamicTemplate?: TCssTemplate
) => TResult;

export type THoc = (Element: TElement) => TElement;
export type TPrimitiveStyled = (
    Element: TElement
) => TStyled<TFreestyleComponent>;
export type TPrimitiveHoc = TStyled<THoc>;

export interface ICss {
    (tpl: TCssTemplate, second?: any): any;
    wrap;
    styled: TPrimitiveStyled;
    div: TStyled<TFreestyleComponent>;
    span: TStyled<TFreestyleComponent>;
    hoc: TPrimitiveHoc;
    facc;
}

let renderer = new OpinionatedRenderer();

export const css: ICss = function css(tpl: IStyles, second?: any) {
    if (second !== void 0 && typeof second !== 'boolean') {
        return styleit(tpl, second);
    }

    return (instance, key, descriptor) => {
        if (!tpl) return descriptor;

        const dynamic = !!second;
        const Comp: TComponentConstructor = instance.constructor;
        const {value} = descriptor;
        const {componentWillUnmount} = instance;

        instance.componentWillUnmount = function() {
            if (componentWillUnmount)
                componentWillUnmount.apply(this, arguments);
            if (dynamic) {
                renderer.removeDynamic(this, null);
            } else {
                renderer.removeStatic(Comp);
            }
        };

        return {
            ...descriptor,
            value: function render() {
                const rendered = value.apply(this, arguments);
                const {props} = rendered;
                const {state, context} = this;
                const className = dynamic
                    ? renderer.injectDynamic(this, null, tpl, [
                          props,
                          state,
                          context,
                      ])
                    : renderer.injectStatic(Comp, tpl, [props, state, context]);
                const oldClassName = props.className || '';
                return cloneElement(
                    rendered,
                    {
                        ...props,
                        className:
                            oldClassName +
                            (oldClassName ? ' ' : '') +
                            className,
                    },
                    rendered.props.children
                );
            },
        };
    };
} as ICss;

export function wrap(
    Element: TElement,
    template?: TCssTemplate,
    dynamicTemplateGetter?: TCssDynamicTemplate,
    displayName: string = 'wrap'
) {
    let staticClassName: string;
    const name = getName(Element);
    const Wrap = class Wrap extends Component<any, any> {
        cNs: string[] = [];

        onRender(props, state, context) {
            if (!dynamicTemplateGetter) return;
            const dynamicTemplate = dynamicTemplateGetter();
            if (!dynamicTemplate) return;

            this.cNs = renderer.injectDynamic(this, null, dynamicTemplate, [
                props,
                state,
                context,
            ]);
        }

        componentWillMount() {
            const {props, state, context} = this;

            if (template) {
                staticClassName = renderer.injectStatic(Wrap, template, [
                    props,
                    state,
                    context,
                ]);
            }

            this.onRender(props, state, context);
        }

        componentWillUpdate(props, state, context) {
            this.onRender(props, state, context);
        }

        componentWillUnmount() {
            renderer.removeDynamic(this, null);
            renderer.removeStatic(Wrap);
        }

        render() {
            let {className, ...props} = this.props;
            className = className || '';
            if (staticClassName)
                className += (className ? ' ' : '') + staticClassName;
            const {cNs} = this;
            if (cNs && cNs.length)
                className += (className ? ' ' : '') + this.cNs.join(' ');
            return h(Element, {...props, className});
        }
    };

    if (process.env.NODE_ENV !== 'production') {
        (Wrap as any).displayName = displayName + (name ? `__${name}` : '');
    }

    return Wrap;
}

let styleitCounter = 0;
export function styleit(styles: IStyles, element) {
    const styleitClassName = 'i' + styleitCounter++;
    styles = hoistGlobalsAndWrapContext(styles, styleitClassName);
    const stylesheet = toStyleSheet(styles);
    const css = toCss(stylesheet);

    const {className} = element.props;
    element.props.className = (className || '') + ' ' + styleitClassName;
    return [h('style', null, css), element];
}

export function styleit2(styles: IStyles, element) {
    const styleitClassName = renderer.genClassName();
    const stylesheet = renderer.stylesToStylesheet(styles, styleitClassName);
    const css = toCss(stylesheet);

    if (process.env.NODE_ENV === 'production') {
        const {className} = element.props;
        element.props.className = (className || '') + ' ' + styleitClassName;
        return [h('style', null, css), element];
    } else {
        let {className, ...props} = element.props;
        className = (className || '') + ' ' + styleitClassName;
        return [
            h('style', {key: 'style'}, css),
            cloneElement(element, {...props, key: 'styleit', className}),
        ];
    }
}

export const styled = createStyled(wrap);
export const hoc = createHoc(wrap);
export const facc = createFacc(wrap);

export const div = styled('div');
export const span = styled('span');

const freestyler = {
    css,
    wrap,
    styled,
    hoc,
    facc,
    div,
    span,
};

export const getRenderer = () => renderer;
export const setRenderer = r => (renderer = r);

for (const name in freestyler) css[name] = freestyler[name];

export default freestyler;
