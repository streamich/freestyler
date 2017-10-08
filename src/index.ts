import {TComponentConstructor, TCssTemplate} from './types';
import {getName, injectDynamic, injectStatic, removeDynamic, removeStatic, TStyles} from './api';

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

export interface ICss {
    (tpl: TCssTemplate, dynamic?: boolean): (a, b, c) => any;
    styled: (Element: TElement) => TStyled<TFreestyleComponent>;
    div: TStyled<TFreestyleComponent>;
    span: TStyled<TFreestyleComponent>;
    hoc: TStyled<THoc>;
    facc;
    wrap;
}

export type TMiddleware = (styles: TStyles) => TStyles;

export function createFreestyler(
    React: {
        Component: TComponentConstructor;
        createElement: any;
        cloneElement: any;
    },
    middlewares: TMiddleware[] = [],
    theme?
) {
    const {Component, createElement: h, cloneElement} = React;

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
                    removeDynamic(this);
                } else {
                    removeStatic(Comp);
                }
            };

            return {
                ...descriptor,
                value: function render() {
                    const rendered = value.apply(this, arguments);
                    const {props} = rendered;
                    const {state, context} = this;
                    const className = dynamic
                        ? injectDynamic(this, tpl, [props, state, context])
                        : injectStatic(Comp, tpl, [props, state, context]);
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
        dynamicTemplateGetter?: () => TCssTemplate,
        displayName: string = 'wrap'
    ) {
        let staticClassName: string;
        const name = getName(Element);
        const Wrap = class Wrap extends Component {
            static displayName = displayName + (name ? `__${name}` : '');

            cN: string = '';

            onRender(props, state, context) {
                if (!dynamicTemplateGetter) return;
                const dynamicTemplate = dynamicTemplateGetter();
                if (!dynamicTemplate) return;

                this.cN = injectDynamic(this, dynamicTemplate, [
                    props,
                    state,
                    context,
                ]);
            }

            componentWillMount() {
                const {props, state, context} = this;

                if (template) {
                    staticClassName = injectStatic(Wrap, template, [
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
                removeDynamic(this);
                removeStatic(Wrap);
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

    function styled(Element: TElement): TStyled<TComponentConstructor> {
        return (template?: TCssTemplate, dynamicTemplate?: TCssTemplate) => {
            const Comp = wrap(Element, template, () => dynamicTemplate, 'styled') as any;

            Comp.css = (newDynamicTemplate) => {
                dynamicTemplate = newDynamicTemplate;
            };

            return Comp;
        };
    }

    const div = styled('div');
    const span = styled('span');

    function hoc(
        template?: TCssTemplate,
        dynamicTemplate?: TCssTemplate
    ): THoc {
        return (Element: TElement) => {
            const Comp = wrap(Element, template, () => dynamicTemplate, 'hoc') as any;

            Comp.css = (newDynamicTemplate) => {
                dynamicTemplate = newDynamicTemplate;
            };

            return Comp;
        };
    }

    function facc (Element: TElement = 'div', template: TCssTemplate = null) {
        let dynamicTemplate = null;
        const Comp = wrap(Element, template, () => dynamicTemplate, 'facc');

        return (childrenCallback) => {
            return (...args) => {
                let ast;
                [dynamicTemplate, ast] = childrenCallback(...args)(Comp);
                return ast
            };
        };
    }

    // function dynamic (Element: TElement = 'div') {
    //     return (template: TCssTemplate) => {
    //         let dynamicTemplate = null;
    //         const Comp = wrap(Element, template, () => dynamicTemplate, 'facc');
    //
    //         return (...args) => {
    //             dynamicTemplate = childrenTemplate(...args);
    //
    //             return childrenFunction(Comp)(...args);
    //         };
    //     };
    // }
    // }

    const freestyler = {
        css,
        wrap,
        styled,
        div,
        span,
        hoc,
        facc,
    };

    for (const name in freestyler) css[name] = freestyler[name];

    return css;
}
