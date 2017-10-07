import {css, inject} from 'css-light';
import {
    TComponent,
    TComponentConstructor,
    TCssTemplate,
    TCssTemplateObject,
} from './types';
import {$$css, hidden} from './util';

let classNameCounter = 1;
export const genClassName = (...args: string[]) =>
    `_${args.join('_')}_${classNameCounter++}`;

const getComponentName = Component => Component.name;
const getInstanceName = instance => getComponentName(instance.constructor);
const tplToStyles: (tpl: TCssTemplate, args: any[]) => TCssTemplateObject = (
    tpl,
    args
) => (typeof tpl === 'function' ? tpl(...args) : tpl);

function hoistGlobalsAndWrapContext(styles, className) {
    let global = {
        ['.' + className]: styles,
    };
    for (const rule in styles) {
        if (rule[0] === '@') {
            global[rule] = {
                ['.' + className]: styles[rule],
            };
            delete styles[rule];
        } else if (rule === '_' || rule === ':global') {
            global = {...global, ...styles[rule]};
            delete styles[rule];
        }
    }
    return global;
}

export function injectStatic(
    Component: TComponentConstructor,
    tpl: TCssTemplate,
    args: any[]
) {
    let className = Component[$$css];
    if (className) return className;

    const name = getComponentName(Component);
    className = genClassName(...(name ? [name] : []));

    let styles = tplToStyles(tpl, args);
    styles = hoistGlobalsAndWrapContext(styles, className);
    const cssString = css(styles);

    const el = inject(cssString);
    el.id = className;

    hidden(Component, $$css, className);

    return className;
}

export function injectDynamic(
    instance: TComponent,
    tpl: TCssTemplateObject,
    args: any[]
) {
    let className = instance[$$css];
    let el: HTMLStyleElement = null;

    if (!className) {
        const name = getInstanceName(instance);
        className = genClassName(...(name ? ['_', name] : ['_']));
        hidden(instance, $$css, className);
        el = inject('');
        el.id = className;
    } else {
        el = document.getElementById(className) as HTMLStyleElement;
    }

    let styles = tplToStyles(tpl, args);
    styles = hoistGlobalsAndWrapContext(styles, className);
    const cssString = css(styles);
    if (el.innerText !== cssString) el.innerText = cssString;

    return className;
}

export function removeDynamic(instance: TComponent) {
    let className = instance[$$css];
    if (className) {
        const el = document.getElementById(className) as HTMLStyleElement;
        if (el) {
            el.parentNode.removeChild(el);
        }
    }
}
