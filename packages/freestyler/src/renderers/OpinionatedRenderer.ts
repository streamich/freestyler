import {
    TComponent,
    TComponentConstructor,
    TCssTemplate,
    IStyles,
} from '../types';
import {$$cn, $$cnt, hidden} from '../../../freestyler-util/index';
import {
    TAtrule,
    toCss,
    toStyleSheet,
    TRule,
    TStyles,
    TStyleSheet,
} from '../ast';
import {
    getInstanceName,
    getName,
    IMiddleware,
    inject,
    IRenderer,
    TRendererFactory,
} from './util';
import hoistGlobalsAndWrapContext from './hoistGlobalsAndWrapContext';
import {TVisitor, visit} from '../visit';
import {VSheet} from '../virtual';

// Low cardinality virtual style properties that should be batched.
const LOW_CARDINALITY_PROPERTIES = {
    'z-index': 1,
    display: 1,
    cursor: 1,
    position: 1,
    'text-align': 1,
};

// High cardinality virtual style properties that should be atomic.
const HIGH_CARDINALITY_PROPERTIES = {
    width: 1,
    height: 1,
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
    'margin-top': 1,
    'margin-right': 1,
    'margin-bottom': 1,
    'margin-left': 1,
    'padding-top': 1,
    'padding-right': 1,
    'padding-bottom': 1,
    'padding-left': 1,
};

// All other style properties are considered to have infinite cardinality.

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
            variableName = variableName.substr(1);
            variableName = variableName.replace(/[^a-zA-Z0-9_]/g, '-');
            variableName = '--' + variableName;
            // newDeclarations.push([variableName, value]);
            document.documentElement.style.setProperty(
                variableName,
                '' + value
            );
            newDeclarations.push([property, `var(${variableName})`]);
        }

        return [selectors, newDeclarations];
    },
};

let classNameCounter = 1;
const genClassName =
    process.env.NODE_ENV !== 'production'
        ? (...args) => `_${classNameCounter++}`
        : (...args: string[]) => `_${args.join('_')}_${classNameCounter++}`;

// prettier-ignore
const tplToStyles: (tpl: TCssTemplate, args: any[]) => IStyles =
    (tpl, args) => (typeof tpl === 'function' ? tpl(...args) : tpl);

function removeDomElement(el) {
    el.parentNode.removeChild(el);
}

function getById(id) {
    return document.getElementById(id);
}

class OpinionatedRenderer implements IRenderer {
    vsheet = new VSheet();

    stylesToStylesheet(styles: TStyles, className: string): TStyleSheet {
        styles = hoistGlobalsAndWrapContext(styles, className);
        let stylesheet = toStyleSheet(styles);
        return stylesheet;
    }

    genClassName() {
        return genClassName();
    }

    genDynamic(styles: IStyles) {
        const className = genClassName();
        const stylesheet = this.stylesToStylesheet(styles, className);
        const css = toCss(stylesheet);
        return css;
    }

    injectStatic(Comp: TComponentConstructor, tpl: TCssTemplate, args: any[]) {
        let styles = tplToStyles(tpl, args);
        if (!styles) return;

        let className = Comp[$$cn];
        if (className) {
            Comp[$$cnt]++;
            return className;
        }

        const name = getName(Comp);
        className = genClassName(...(name ? [name] : []));

        const stylesheet = this.stylesToStylesheet(styles, className);
        const cssString = toCss(stylesheet);

        const el = inject(cssString);
        el.id = className;

        hidden(Comp, $$cn, className);
        hidden(Comp, $$cnt, 1);

        return className;
    }

    removeStatic(Comp: TComponentConstructor) {}

    injectDynamic(
        instance: TComponent,
        root: Element,
        tpl: TCssTemplate,
        args: any[]
    ) {
        let styles = tplToStyles(tpl, args);
        if (!styles) return;

        let className = instance[$$cn];
        let style: HTMLStyleElement = null;

        if (!className) {
            const name = getInstanceName(instance);
            className = genClassName(name ? '__' + name : '');
            hidden(instance, $$cn, className);
            style = inject('');
            style.id = className;
        } else {
            style = getById(className) as HTMLStyleElement;
        }

        const classNames = [className];
        const stylesheet = this.stylesToStylesheet(styles, className);
        const ownRules: TRule = stylesheet[0] as TRule;
        if (ownRules) {
            const [__, declarations] = ownRules;
            const remainingDecls = [];
            let lowCardinalityDecls = [];

            for (let i = 0; i < declarations.length; i++) {
                const declaration = declarations[i];
                const [prop, value] = declaration;
                if (HIGH_CARDINALITY_PROPERTIES[prop]) {
                    classNames.push(this.vsheet.getId('', '', prop, value));
                } else if (LOW_CARDINALITY_PROPERTIES[prop]) {
                    lowCardinalityDecls.push(declaration);
                } else {
                    remainingDecls.push(declaration);
                }
            }
            ownRules[1] = remainingDecls;

            if (lowCardinalityDecls.length) {
                lowCardinalityDecls = lowCardinalityDecls.sort(
                    ([prop1], [prop2]) => (prop1 > prop2 ? 1 : -1)
                );
                classNames.push(
                    this.vsheet.getIdBatch('', '', lowCardinalityDecls)
                );
            }
        }

        // visit(stylesheet, visitor);
        const cssString = toCss(stylesheet);
        if ((style as any)._innerText !== cssString) {
            style.innerText = cssString;
            (style as any)._innerText = cssString;
        }

        return classNames;
    }

    removeDynamic(instance: TComponent, root: Element) {
        const className = instance[$$cn];
        if (className) {
            const el = getById(className) as HTMLStyleElement;
            if (el) if (el) removeDomElement(el);
        }
    }

    use(middleware) {
        // this.middlewares.push(middleware);
    }
}

export default OpinionatedRenderer;
