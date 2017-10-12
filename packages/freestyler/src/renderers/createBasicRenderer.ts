import {
    TComponent,
    TComponentConstructor,
    TCssTemplate,
    IStyles,
} from '../types';
import {$$cn, $$cnt, hidden} from '../../../freestyler-util/index';
import {toCss, toStyleSheet, TStyles, TStyleSheet} from '../ast';
import {
    getInstanceName,
    getName,
    IMiddleware,
    inject,
    IRenderer,
    TRendererFactory,
} from './util';
import hoistGlobalsAndWrapContext from './hoistGlobalsAndWrapContext';

/*
const visitor: TVisitor = {
    rule: (rule: TRule, atrule?: TAtrule) => {
        const [selectors, declarations] = rule;
        const newDeclarations = [];

        for (const declaration of declarations) {
            const [property, value] = declaration;
            let variableName =
                (atrule ? atrule.prelude + '-' : '') +
                selectors +
                '-' +
                property;
            variableName = variableName.replace(/[^a-zA-Z0-9_]/g, '-');
            variableName = '--__' + variableName;
            // newDeclarations.push([variableName, value]);
            document.documentElement.style.setProperty(
                variableName,
                '' + value
            );
            newDeclarations.push([property, `var(${variableName})`]);
        }

        return [selectors, newDeclarations];
    },
};*/

const createStandardRenderer: TRendererFactory = () => {
    let middlewares: IMiddleware[] = [];
    let classNameCounter = 1;

    const genClassName =
        process.env.NODE_ENV === 'production'
            ? (...args: string[]) => `_${classNameCounter++}`
            : (...args: string[]) => `_${args.join('_')}_${classNameCounter++}`;

    const tplToStyles: (tpl: TCssTemplate, args: any[]) => IStyles = (
        tpl,
        args
    ) => (typeof tpl === 'function' ? tpl(...args) : tpl);

    function removeDomElement(el) {
        el.parentNode.removeChild(el);
    }

    function getById(id) {
        return document.getElementById(id);
    }

    function stylesToStylesheet(
        styles: TStyles,
        className: string
    ): TStyleSheet {
        styles = hoistGlobalsAndWrapContext(styles, className);
        for (let i = 0; i < middlewares.length; i++) {
            const middleware = middlewares[i];
            if (middleware.styles) styles = middleware.styles(styles);
        }
        let stylesheet = toStyleSheet(styles);
        for (let i = 0; i < middlewares.length; i++) {
            const middleware = middlewares[i];
            if (middleware.stylesheet)
                stylesheet = middleware.stylesheet(stylesheet);
        }
        return stylesheet;
    }

    const injectStatic = (
        Comp: TComponentConstructor,
        tpl: TCssTemplate,
        args: any[]
    ) => {
        let className = Comp[$$cn];
        if (className) {
            Comp[$$cnt]++;
            return className;
        }

        const name = getName(Comp);
        className = genClassName(...(name ? [name] : []));

        let styles = tplToStyles(tpl, args);
        const stylesheet = stylesToStylesheet(styles, className);
        const cssString = toCss(stylesheet);

        const el = inject(cssString);
        el.id = className;

        hidden(Comp, $$cn, className);
        hidden(Comp, $$cnt, 1);

        return className;
    };

    const removeStatic = (Comp: TComponentConstructor) => {
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
    };

    const injectDynamic = (instance: TComponent, tpl: IStyles, args: any[]) => {
        let styles = tplToStyles(tpl, args);
        if (!styles) return;

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

        const stylesheet = stylesToStylesheet(styles, className);
        const cssString = toCss(stylesheet);
        if (el.innerText !== cssString) el.innerText = cssString;

        return className;
    };

    const removeDynamic = (instance: TComponent) => {
        const className = instance[$$cn];
        if (className) {
            const el = getById(className) as HTMLStyleElement;
            if (el) if (el) removeDomElement(el);
        }
    };

    const use = middleware => {
        middlewares.push(middleware);
    };

    return {
        injectStatic,
        removeStatic,
        injectDynamic,
        removeDynamic,
        use,
    };
};

export default createStandardRenderer;
