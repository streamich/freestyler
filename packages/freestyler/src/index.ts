import {Component, createElement as h, cloneElement} from 'react';
import {
    TComponentConstructor,
    TCssDynamicTemplate,
    TCssTemplate,
} from './types';
import createStandardRenderer from './renderers/createStandardRenderer';
import {getName, IRenderer} from './renderers/util';
import {TStyles} from './ast';
import createStyled from './primitives/createStyled';
import createHoc from './primitives/createHoc';
import createFacc from './primitives/createFacc';

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
    (tpl: TCssTemplate, dynamic?: boolean): (a, b, c) => any;
    wrap;
    styled: TPrimitiveStyled;
    div: TStyled<TFreestyleComponent>;
    span: TStyled<TFreestyleComponent>;
    hoc: TPrimitiveHoc;
    facc;
}

export type TMiddleware = (styles: TStyles) => TStyles;

export interface IFreestylerOpts {
    renderer?: IRenderer;
}

export function createFreestyler(opts: IFreestylerOpts = {}): ICss {
    let renderer = opts.renderer || createStandardRenderer();

    const css: ICss = function css(tpl: TCssTemplate, dynamic?: boolean) {
        return (instance, key, descriptor) => {
            if (!tpl) return descriptor;

            const Comp: TComponentConstructor = instance.constructor;
            const {value} = descriptor;
            const {componentWillUnmount} = instance;

            instance.componentWillUnmount = function() {
                if (componentWillUnmount)
                    componentWillUnmount.apply(this, arguments);
                if (dynamic) {
                    renderer.removeDynamic(this);
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
                        ? renderer.injectDynamic(this, tpl, [
                              props,
                              state,
                              context,
                          ])
                        : renderer.injectStatic(Comp, tpl, [
                              props,
                              state,
                              context,
                          ]);
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

    function wrap(
        Element: TElement,
        template?: TCssTemplate,
        dynamicTemplateGetter?: TCssDynamicTemplate,
        displayName: string = 'wrap'
    ) {
        let staticClassName: string;
        const name = getName(Element);
        const Wrap = class Wrap extends Component<any, any> {
            static displayName = displayName + (name ? `__${name}` : '');

            cN: string = '';

            onRender(props, state, context) {
                if (!dynamicTemplateGetter) return;
                const dynamicTemplate = dynamicTemplateGetter();
                if (!dynamicTemplate) return;

                this.cN = renderer.injectDynamic(this, dynamicTemplate, [
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
                renderer.removeDynamic(this);
                renderer.removeStatic(Wrap);
            }

            render() {
                let {className, ...props} = this.props;
                className = className || '';
                if (staticClassName)
                    className += (className ? ' ' : '') + staticClassName;
                if (this.cN) className += (className ? ' ' : '') + this.cN;
                return h(Element, {...props, className});
            }
        };

        return Wrap;
    }

    const styled = createStyled(wrap);
    const hoc = createHoc(wrap);
    const facc = createFacc(wrap);

    const div = styled('div');
    const span = styled('span');

    const freestyler = {
        css,
        wrap,
        styled,
        hoc,
        facc,
        div,
        span,
    };

    for (const name in freestyler) css[name] = freestyler[name];

    return css;
}

export const css = createFreestyler();
