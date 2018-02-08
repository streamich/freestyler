import {TComponent, TComponentConstructor, TCssTemplate} from './types';
import {TStyles, TStyleSheet} from '../ast/toStylesheet';
import createStyleElement from './util/createStyleElement';

export interface IMiddleware {
    styles: (TStyles) => TStyles;
    stylesheet: (TStyleSheet) => TStyleSheet;
}

export interface IRenderer {
    render(Comp, instance, el, tpl, args): string;
    unrender(Comp, instance, el);
    renderStatic(Comp, tpl, args);
    renderAnon(styles, selector);
    format(styles, selector);
    use(middleware: IMiddleware);
}

export type TRendererFactory = () => IRenderer;

export function inject(cssString: string): HTMLStyleElement {
    const el = createStyleElement();

    el.innerText = cssString;

    return el;
}

export const getName = Component =>
    typeof Component === 'object' || typeof Component === 'function'
        ? Component.displayName || Component.name
        : String(Component);

export const getInstanceName = instance => getName(instance.constructor);
