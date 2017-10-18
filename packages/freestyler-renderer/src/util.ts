import {TComponent, TComponentConstructor, TCssTemplate} from './types';
import {TStyles, TStyleSheet} from './ast/toStylesheet';

export interface IMiddleware {
    styles: (TStyles) => TStyles;
    stylesheet: (TStyleSheet) => TStyleSheet;
}

export interface IRenderer {
    addStatic(Comp: TComponentConstructor, tpl: TCssTemplate, args: any[]): string;
    removeStatic(Comp: TComponentConstructor);
    renderDynamic(instance: TComponent, root: Element, tpl: TCssTemplate, args: any[]): string;
    removeDynamic(instance: TComponent, root: Element);
    renderFluid(
        Comp: TComponentConstructor,
        instance: TComponent,
        root: Element | null,
        tpl: TCssTemplate,
        args: any[]
    ): string;
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
