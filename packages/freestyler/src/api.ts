import {css, inject} from 'css-light';
import {
    TComponent,
    TComponentConstructor,
    TCssTemplate,
    TCssTemplateObject,
} from './types';
import {$$cn, $$cnt, hidden} from './util';

export type TStyles = object;

let classNameCounter = 1;
export const genClassName = process.env.NODE_ENV === 'production'
    ? (...args: string[]) => `_${classNameCounter++}`
    : (...args: string[]) => `_${args.join('_')}_${classNameCounter++}`;

export const getName = Component => (typeof Component === 'object') || (typeof Component === 'function')
    ? Component.displayName || Component.name
    : String(Component);
const getInstanceName = instance => getName(instance.constructor);
const tplToStyles: (tpl: TCssTemplate, args: any[]) => TCssTemplateObject = (
    tpl,
    args
) => (typeof tpl === 'function' ? tpl(...args) : tpl);

function removeDomElement(el) {
    el.parentNode.removeChild(el);
}

function getById(id) {
    return document.getElementById(id);
}

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
    Comp: TComponentConstructor,
    tpl: TCssTemplate,
    args: any[]
) {
    let className = Comp[$$cn];
    if (className) {
        Comp[$$cnt]++;
        return className;
    }

    const name = getName(Comp);
    className = genClassName(...(name ? [name] : []));

    let styles = tplToStyles(tpl, args);
    styles = hoistGlobalsAndWrapContext(styles, className);
    const cssString = css(styles);

    const el = inject(cssString);
    el.id = className;

    hidden(Comp, $$cn, className);
    hidden(Comp, $$cnt, 1);

    return className;
}

export function removeStatic(Comp: TComponentConstructor) {
    const className = Comp[$$cn];
    if (className) {
        let cnt = Comp[$$cnt];
        if (cnt) {
            Comp[$$cnt]--;
            cnt = Comp[$$cnt];
            if (cnt < 1) {
                const el = getById(className) as HTMLStyleElement;
                if (el) removeDomElement(el);
                delete Comp[$$cnt];
                delete Comp[$$cn];
            }
        }
    }
}

export function injectDynamic(
    instance: TComponent,
    tpl: TCssTemplateObject,
    args: any[]
) {
    let className = instance[$$cn];
    let el: HTMLStyleElement = null;

    if (!className) {
        const name = getInstanceName(instance);
        className = genClassName(...(name ? ['_', name] : ['_']));
        hidden(instance, $$cn, className);
        el = inject('');
        el.id = className;
    } else {
        el = getById(className) as HTMLStyleElement;
    }

    let styles = tplToStyles(tpl, args);
    styles = hoistGlobalsAndWrapContext(styles, className);
    const cssString = css(styles);
    if (el.innerText !== cssString) el.innerText = cssString;

    return className;
}

export function removeDynamic(instance: TComponent) {
    const className = instance[$$cn];
    if (className) {
        const el = getById(className) as HTMLStyleElement;
        if (el) if (el) removeDomElement(el);
    }
}
