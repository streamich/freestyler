import {Component, createElement as h, cloneElement} from 'react';
import {TComponentConstructor, TCssTemplate} from './types';
import {injectDynamic, injectStatic, removeDynamic} from './api';

export type TElement =
    | string
    | TComponentConstructor
    | ((props?, state?, context?) => any);

export type TStyled<TResult> = (
    template?: TCssTemplate,
    dynamicTemplate?: TCssTemplate
) => TResult;

export type THoc = (Comp: TComponentConstructor) => TComponentConstructor;

export interface ICss {
    (tpl: TCssTemplate, dynamic?: boolean): (a, b, c) => any;
    styled: (Element: TElement) => TStyled<TComponentConstructor>;
    div: TStyled<TComponentConstructor>;
    span: TStyled<TComponentConstructor>;
    hoc: TStyled<THoc>;
}

export const css: ICss = function css(tpl: TCssTemplate, dynamic?: boolean) {
    return (instance, key, descriptor) => {
        if (!tpl) return descriptor;

        const Comp: TComponentConstructor = instance.constructor;
        const {value} = descriptor;

        if (dynamic) {
            const {componentWillUnmount} = instance;

            instance.componentWillUnmount = function() {
                if (componentWillUnmount)
                    componentWillUnmount.apply(this, arguments);
                removeDynamic(this);
            };
        }

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

export function wrap(
    Element: TElement,
    template?: TCssTemplate,
    dynamicTemplate?: TCssTemplate,
    displayName: string = 'Wrap'
) {
    let staticClassName: string;
    const Styled = class Styled extends Component<any, any> {
        static displayName = displayName;

        cN: string = '';

        onRender(props, state, context) {
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
                staticClassName = injectStatic(Styled, template, [
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

    return Styled;
}

export function styled(Element: TElement): TStyled<TComponentConstructor> {
    return (template?: TCssTemplate, dynamicTemplate?: TCssTemplate) => {
        return wrap(Element, template, dynamicTemplate, 'Styled');
    };
}

export const div = styled('div');
export const span = styled('span');

export function hoc(
    template?: TCssTemplate,
    dynamicTemplate?: TCssTemplate
): THoc {
    return (Element: TElement) => {
        return wrap(Element, template, dynamicTemplate, 'Hoc');
    };
}

css.styled = styled;
css.div = div;
css.span = div;
css.hoc = hoc;
