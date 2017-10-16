import {TComponent, TComponentConstructor, TCssTemplate} from './types';
import {TStyles, TStyleSheet} from './ast/toStylesheet';

export interface IMiddleware {
    styles: (TStyles) => TStyles;
    stylesheet: (TStyleSheet) => TStyleSheet;
}

export interface IRenderer {
    injectStatic(Comp: TComponentConstructor, tpl: TCssTemplate, args: any[]): string;
    removeStatic(Comp: TComponentConstructor);
    injectDynamic(instance: TComponent, root: Element, tpl: TCssTemplate, args: any[]);
    removeDynamic(instance: TComponent, root: Element);
    use(middleware: IMiddleware);
}

export type TRendererFactory = () => IRenderer;

export function inject(cssString: string): HTMLStyleElement {
    const el = document.createElement('style');
    el.innerText = cssString;
    document.body.appendChild(el);
    return el;
}

export const getName = Component =>
    typeof Component === 'object' || typeof Component === 'function'
        ? Component.displayName || Component.name
        : String(Component);

export const getInstanceName = instance => getName(instance.constructor);
