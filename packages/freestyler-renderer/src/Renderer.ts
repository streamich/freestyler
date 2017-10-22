import {$$cn, $$cnt, hidden, sym, camelCase} from 'freestyler-util';
import {TComponent, TComponentConstructor, TCssTemplate, IStyles} from './types';
import {TDeclarations} from './ast/toStylesheet';
import toStyleSheet, {TAtrule, TAtrulePrelude, TRule, TRules, TStyles, TStyleSheet} from './ast/toStylesheet';
import toCss, {isRule} from './ast/toCss';
import toCssRule from './ast/toCssRule';
import {getInstanceName, IMiddleware, inject, IRenderer, TRendererFactory} from './util';
import hoistGlobalsAndWrapContext from './hoistGlobalsAndWrapContext';
import {TVisitor} from './ast/visit';
import Sheet from './Sheet';
import VSheet from './VSheet';
import SCOPE_SENTINEL from './sentinel';
import declarationIntersectStrict from './declarationIntersectStrict';
import declarationSubtract from './declarationSubtract';
import declarationSort from './declarationSort';
import declarationEqualityStrict from './declarationEqualityStrict';
import declarationSubtractStrict from './declarationSubtractStrict';
import getById from './util/getById';
import removeDomElement from './util/removeDomElement';
import supportsCssVariables from './util/supportsCssVariables';

const USE_CSS_VARIABLES = supportsCssVariables();
const USE_INLINE_STYLES = true;

export const getName = (Component, instance) => {
    let name;
    if (Component) {
        if (typeof Component === 'object' || typeof Component === 'function') {
            name = Component.displayName || Component.name;
        }
    }
    if (!name && instance) {
        name = instance.constructor.name;
    }
    if (!name) {
        name = String(Component);
    }
    return name;
};

// Low cardinality virtual style properties that should be batched.
//
// For example, `display` has only a limited number of available values:
// `block`, `inline`, `flex`, ...
const LOW_CARDINALITY_PROPERTIES = {
    'z-index': 1,
    display: 1,
    cursor: 1,
    // 'font-weight': 1,
    position: 1,
    'text-align': 1,
    'vertical-align': 1,
    visibility: 1,
    float: 1,
};

// High cardinality virtual style properties that should be cached atomicly.
//
// For example:
//     width: 0;
//     width: 0px - 2000px;
//     width: 0% - 100%;
//
// Only 2101 possible `width` variations.
//
// Fractions like `width: 1.1%` should place the `width` property in to the
// infinite bucket.
const HIGH_CARDINALITY_PROPERTIES = {
    width: 1,
    height: 1,
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
    'border-radius': 1,
    'margin-top': 1,
    'margin-right': 1,
    'margin-bottom': 1,
    'margin-left': 1,
    'padding-top': 1,
    'padding-right': 1,
    'padding-bottom': 1,
    'padding-left': 1,
};

// Properties that can be transformed from infinite cardinality to a set
// of high cardinality properties.
//
// For exmaple:
//
//     padding: 10px 15px 20px 25px;
//
// Can be transformed to:
//
//     padding-top: 10px;
//     padding-right: 15px;
//     padding-bottom: 20px;
//     padding-left: 25px;
const INFINITE_TO_HIGH_TRANSFORMABLE_PROPERTIES = {
    padding: 1,
    margin: 1,
};

const visitor: TVisitor = {
    rule: (rule: TRule, atrule?: TAtrule) => {
        const [selectors, declarations] = rule;
        const newDeclarations = [];

        for (const declaration of declarations) {
            const [property, value] = declaration;
            let variableName = (atrule ? atrule.prelude + '-' : '') + selectors + '-' + property;
            variableName = variableName.substr(1);
            variableName = variableName.replace(/[^a-zA-Z0-9_]/g, '-');
            variableName = '--' + variableName;
            // newDeclarations.push([variableName, value]);
            document.documentElement.style.setProperty(variableName, '' + value);
            newDeclarations.push([property, `var(${variableName})`]);
        }

        return [selectors, newDeclarations];
    },
};

let classNameCounter = 1;
const genId = () => `_${(classNameCounter++).toString(36)}`;
const genDebugId = (componentName, declarations, clarifier) => {
    const declarationsStr = declarations
        .map(([prop, value]) => {
            return prop.replace(/[^a-zA-Z0-9_]/g, '-') + '_' + value.replace(/[^a-zA-Z0-9_]/g, '-');
        })
        .join('__');
    return componentName + '_' + clarifier + '___' + declarationsStr.substr(0, 100) + '_' + genId();
};
const genClassName =
    process.env.NODE_ENV !== 'production'
        ? (...args) => `_${classNameCounter++}`
        : (...args: string[]) => `_${args.join('_')}_${classNameCounter++}`;

// prettier-ignore
const tplToStyles: (tpl: TCssTemplate, args: any[]) => IStyles =
    (tpl, args) => (typeof tpl === 'function' ? tpl(...args) : tpl);

/**
 * Static template counter. Keeps track if static template is still used by component.
 */
class StaticDecls {
    cnt: number = 1;
    id: string; // `className` or other identifier that indetifies this static template.
    decls: TDeclarations;

    constructor(id: string, decls: TDeclarations) {
        this.id = id;
        this.decls = decls;
    }
}

class Renderer implements IRenderer {
    vsheet = new VSheet();
    sheet = new Sheet();

    toStylesheet(styles: TStyles, selector: string): TStyleSheet {
        styles = hoistGlobalsAndWrapContext(styles, selector);
        let stylesheet = toStyleSheet(styles);
        return stylesheet;
    }

    genClassName() {
        return genClassName();
    }

    genDynamic(styles: IStyles) {
        const className = genClassName();
        const stylesheet = this.toStylesheet(styles, '.' + className);
        const css = toCss(stylesheet);
        return css;
    }

    addStatic(Comp: TComponentConstructor, tpl: TCssTemplate, args: any[]): string {
        let styles = tplToStyles(tpl, args);
        if (!styles) return;

        let className = Comp[$$cn];
        if (className) {
            Comp[$$cnt]++;
            return className;
        }

        const name = getName(Comp);
        className = genClassName(...(name ? [name] : []));

        const stylesheet = this.toStylesheet(styles, '.' + className);
        const cssString = toCss(stylesheet);

        const el = inject(cssString);
        el.id = className;

        hidden(Comp, $$cn, className);
        hidden(Comp, $$cnt, 1);

        return className;
    }

    removeStatic(Comp: TComponentConstructor) {}

    renderDynamic(instance: TComponent, root: HTMLElement, tpl: TCssTemplate, args: any[]): string {
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

        let classNames = className + ' ';
        const stylesheet = this.toStylesheet(styles, '.' + className);
        const ownRules: TRule = stylesheet[0] as TRule;
        if (ownRules) {
            const [__, declarations] = ownRules;
            const remainingDecls = [];
            let lowCardinalityDecls = [];

            for (let i = 0; i < declarations.length; i++) {
                const declaration = declarations[i];
                const [prop, value] = declaration;
                if (HIGH_CARDINALITY_PROPERTIES[prop]) {
                    classNames += this.vsheet.getId('', '', prop, value);
                } else if (LOW_CARDINALITY_PROPERTIES[prop]) {
                    lowCardinalityDecls.push(declaration);
                } else {
                    remainingDecls.push(declaration);
                }
            }
            ownRules[1] = remainingDecls;

            if (lowCardinalityDecls.length) {
                lowCardinalityDecls = lowCardinalityDecls.sort(([prop1], [prop2]) => (prop1 > prop2 ? 1 : -1));
                classNames += this.vsheet.getIdBatch('', '', lowCardinalityDecls);
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
            if (el) removeDomElement(el);
        }
    }

    private renderDynamicDecls(
        instance: object,
        root: HTMLElement | null,
        selectorTemplate: string,
        decls: TDeclarations
    ): string {
        if (USE_INLINE_STYLES && selectorTemplate === SCOPE_SENTINEL && root) {
            const style = root.style;
            const previousDecls: TDeclarations = (root as any)._decls;
            let newDecls: TDeclarations;

            if (previousDecls) {
                newDecls = declarationSubtractStrict(decls, previousDecls);

                // Remove unused styles from previous render cycle.
                const subtraction = declarationSubtract(previousDecls, decls);
                for (let i = 0; i < subtraction.length; i++) {
                    const [property] = subtraction[i];
                    style.removeProperty(property);
                }
            } else {
                newDecls = decls;
            }

            for (let i = 0; i < newDecls.length; i++) {
                const [property, value] = newDecls[i];
                style[camelCase(property)] = value;
            }

            (root as any)._decls = decls;
            return '';
        }

        let selectorTemplateMap = instance[$$cn];
        if (!selectorTemplateMap) {
            hidden(instance, $$cn, {});
            selectorTemplateMap = instance[$$cn];
        }

        let className = selectorTemplateMap[selectorTemplate];
        if (!className) {
            if (!process.env.FREESTYLER_DEBUG) {
                className = genId();
            } else {
                className = genDebugId(getName(null, instance), decls, 'dynamic');
            }
            selectorTemplateMap[selectorTemplate] = className;
        }

        const selector = selectorTemplate.replace(SCOPE_SENTINEL, '.' + className);
        const style = root ? root.style : document.documentElement.style;

        // Use CSS variables.
        if (USE_CSS_VARIABLES) {
            for (let i = 0; i < decls.length; i++) {
                const declaration = decls[i];
                const [property, value] = declaration;

                let variableName = selector + '-' + property;
                variableName = variableName.replace(/[^a-zA-Z0-9_]/g, '-');
                variableName = '-' + variableName;

                style.setProperty(variableName, value);
                declaration[1] = `var(${variableName})`;
            }
        }

        this.sheet.put(className, toCssRule(selector, decls));

        return className;
    }

    private putDecls(id: string, selector: string, declarations: TDeclarations) {
        this.sheet.put(id, toCssRule(selector, declarations));
    }

    private renderInfCardDecls(Comp, instance, root, selectorTemplate, infiniteCardinalityDecls) {
        declarationSort(infiniteCardinalityDecls);

        let classNames = '';
        let staticDeclsMap = Comp.__staticDeclsMap;

        if (!staticDeclsMap) {
            Comp.__staticDeclsMap = staticDeclsMap = {};
        }

        let staticDecls = staticDeclsMap[selectorTemplate];

        if (!staticDecls) {
            staticDeclsMap[selectorTemplate] = staticDecls = [] as StaticDecls[];
        }

        let lastStaticDecls: StaticDecls;

        if (staticDecls.length) {
            lastStaticDecls = staticDecls[staticDecls.length - 1];
        }

        if (!lastStaticDecls) {
            let className;

            if (!process.env.FREESTYLER_DEBUG) {
                className = genId();
            } else {
                className = genDebugId(getName(Comp, instance), infiniteCardinalityDecls, 'static');
            }

            const decls = new StaticDecls(className, infiniteCardinalityDecls);
            staticDecls.push(decls);

            const selector = selectorTemplate.replace(SCOPE_SENTINEL, '.' + className);
            this.putDecls(className, selector, infiniteCardinalityDecls);

            classNames += ' ' + className;
        } else {
            const declIntersection = declarationIntersectStrict(lastStaticDecls.decls, infiniteCardinalityDecls);

            if (declarationEqualityStrict(declIntersection, lastStaticDecls.decls)) {
                // No change
                classNames += ' ' + lastStaticDecls.id;
            } else {
                // Create new static template for this selector template

                // TODO: handle case when intersection is empty.

                let className;
                if (!process.env.FREESTYLER_DEBUG) {
                    className = genId();
                } else {
                    className = genDebugId(getName(Comp, instance), infiniteCardinalityDecls, 'static');
                }

                const decls = new StaticDecls(className, declIntersection);
                staticDecls.push(decls);

                const selector = selectorTemplate.replace(SCOPE_SENTINEL, '.' + className);
                this.putDecls(className, selector, declIntersection);

                classNames += ' ' + className;
            }

            // Inject dynamic part.
            const dynamicDecls = declarationSubtract(infiniteCardinalityDecls, declIntersection);
            if (dynamicDecls.length) {
                classNames += ' ' + this.renderDynamicDecls(instance, root, selectorTemplate, dynamicDecls);
            }
        }

        return classNames;
    }

    private renderScopedRule(
        Comp,
        instance,
        root: Element | null,
        rule: TRule,
        atRulePrelude?: TAtrulePrelude
    ): string {
        const [selectorTemplate, declarations] = rule;
        if (!declarations.length) return;

        let classNames = '';

        const infiniteCardinalityDecls = [];
        let lowCardinalityDecls = [];

        for (let i = 0; i < declarations.length; i++) {
            const declaration = declarations[i];
            const [prop, value] = declaration;
            if (HIGH_CARDINALITY_PROPERTIES[prop]) {
                classNames += ' ' + this.vsheet.insert(atRulePrelude, selectorTemplate, prop, value);
            } else if (LOW_CARDINALITY_PROPERTIES[prop]) {
                lowCardinalityDecls.push(declaration);
            } else {
                infiniteCardinalityDecls.push(declaration);
            }
        }

        if (lowCardinalityDecls.length) {
            lowCardinalityDecls = lowCardinalityDecls.sort(([prop1], [prop2]) => (prop1 > prop2 ? 1 : -1));
            classNames += ' ' + this.vsheet.insertBatch(atRulePrelude, selectorTemplate, lowCardinalityDecls);
        }

        if (infiniteCardinalityDecls.length) {
            classNames +=
                ' ' + this.renderInfCardDecls(Comp, instance, root, selectorTemplate, infiniteCardinalityDecls);
        }

        return classNames;
    }

    renderRules(
        Comp: TComponentConstructor,
        instance: TComponent,
        root: Element | null,
        atRulePrelude: TAtrulePrelude,
        rules: (TRule | TAtrule)[]
    ) {
        let classNames = '';
        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            if (isRule(rule)) {
                // TRule
                const selector = rule[0];
                const scopePosition = selector.indexOf(SCOPE_SENTINEL);
                const isScopedRule = scopePosition > -1;
                if (isScopedRule) {
                    classNames += this.renderScopedRule(Comp, instance, root, rule as TRule, atRulePrelude);
                } else {
                    // Global rule.
                }
            } else {
                // TAtrule
                const atrule = rule as TAtrule;
                classNames += this.renderRules(Comp, instance, root, atrule.prelude, atrule.rules);
            }
        }
        return classNames;
    }

    render(
        Comp: TComponentConstructor,
        instance: TComponent,
        root: Element | null,
        tpl: TCssTemplate,
        args: any[]
    ): string {
        const styles = tplToStyles(tpl, args);
        const stylesheet = this.toStylesheet(styles, SCOPE_SENTINEL);

        return this.renderRules(Comp, instance, root, '', stylesheet);
    }

    renderGlobal() {}

    format(styles: IStyles, selector: string) {
        styles = hoistGlobalsAndWrapContext(styles, selector);
        const stylesheet = toStyleSheet(styles);
        return toCss(stylesheet);
    }

    use(middleware) {
        // this.middlewares.push(middleware);
    }
}

export default Renderer;
