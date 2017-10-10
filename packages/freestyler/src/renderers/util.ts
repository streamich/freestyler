import {
    TComponent,
    TComponentConstructor,
    TCssTemplate,
    TCssTemplateObject,
} from '../types';

export interface IRenderer {
    injectStatic(
        Comp: TComponentConstructor,
        tpl: TCssTemplate,
        args: any[]
    ): string;
    removeStatic(Comp: TComponentConstructor);
    injectDynamic(instance: TComponent, tpl: TCssTemplateObject, args: any[]);
    removeDynamic(instance: TComponent);
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
