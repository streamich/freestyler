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
import SCOPE_SENTINEL from './util/sentinel';
import declarationIntersectStrict from './declaration/intersectStrict';
import declarationSubtract from './declaration/subtract';
import declarationSort from './declaration/sort';
import declarationEqualityStrict from './declaration/equalityStrict';
import declarationSubtractStrict from './declaration/subtractStrict';
import getById from './util/getById';
import removeDomElement from './util/removeDomElement';
import supportsCssVariables from './util/supportsCssVariables';
import renderCacheableSheet from './virtual/renderCacheableSheet';

const USE_CSS_VARIABLES = supportsCssVariables();
const USE_INLINE_STYLES = true;

const $$last = sym('last');

const getName = (Component, instance) => {
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

// class CompRenderer {
//
// }

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

const removeInlineStyles = (style, decls: TDeclarations) => {
    for (let i = 0; i < decls.length; i++) {
        const [property] = decls[i];
        style.removeProperty(property);
    }
};

class Renderer implements IRenderer {
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

    renderStatic(Comp, tpl: TCssTemplate, args: any[]): string {
        let classNames = Comp[$$cn];

        if (classNames === void 0) {
            hidden(Comp, $$cn, '');
        }

        let styles = tplToStyles(tpl, args);
        if (!styles) return '';

        const stylesheet = this.toStylesheet(styles, SCOPE_SENTINEL);
        let moreClassNames = '';
        classNames = renderCacheableSheet(
            stylesheet,
            '',
            (atRulePrelude, selectorTemplate, infiniteCardinalityDeclarations) => {
                const infClassName = genId();
                const selector = selectorTemplate.replace(SCOPE_SENTINEL, '.' + infClassName);
                this.putDecls(infClassName, selector, infiniteCardinalityDeclarations);
                moreClassNames += ' ' + infClassName;
            }
        );

        classNames += moreClassNames;
        Comp[$$cn] = classNames;
        return classNames;
    }

    renderDynamic(instance, root: HTMLElement, tpl: TCssTemplate, args: any[]): string {
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
        if (!decls.length) {
            if (USE_INLINE_STYLES && selectorTemplate === SCOPE_SENTINEL && root && root[$$last]) {
                removeInlineStyles(root.style, root[$$last]);
                root[$$last] = decls;
            }
            return '';
        }

        if (USE_INLINE_STYLES && root && selectorTemplate === SCOPE_SENTINEL) {
            const style = root.style;
            const previousDecls: TDeclarations = root[$$last];
            let newDecls: TDeclarations;

            if (previousDecls) {
                newDecls = declarationSubtractStrict(decls, previousDecls);

                // Remove unused styles from previous render cycle.
                const subtraction = declarationSubtract(previousDecls, decls);
                removeInlineStyles(style, subtraction);

                root[$$last] = decls;
            } else {
                newDecls = decls;
                hidden(root, $$last, decls);
            }

            // Apply new styles.
            for (let i = 0; i < newDecls.length; i++) {
                const [property, value] = newDecls[i];
                style[camelCase(property)] = value;
            }

            return '';
        }

        if (!decls.length) return '';

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
                variableName = '--' + variableName;

                style.setProperty(variableName, value);
                declaration[1] = `var(${variableName})`;
            }
        }

        this.putDecls(className, selector, decls);

        return ' ' + className;
    }

    private putDecls(id: string, selector: string, declarations: TDeclarations) {
        this.sheet.put(id, toCssRule(selector, declarations));
    }

    private renderInfCardDecls(Comp, instance, root, selectorTemplate, infiniteCardinalityDecls) {
        declarationSort(infiniteCardinalityDecls);

        let classNames = '';
        let staticDeclsMap = Comp[$$last];

        if (!staticDeclsMap) {
            staticDeclsMap = {};
            hidden(Comp, $$last, staticDeclsMap);
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
                className = genDebugId(getName(Comp, instance), infiniteCardinalityDecls, 'inf_static');
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
                    className = genDebugId(getName(Comp, instance), infiniteCardinalityDecls, 'inf_static');
                }

                const decls = new StaticDecls(className, declIntersection);
                staticDecls.push(decls);

                const selector = selectorTemplate.replace(SCOPE_SENTINEL, '.' + className);
                this.putDecls(className, selector, declIntersection);

                classNames += ' ' + className;
            }

            // Inject dynamic part.
            const dynamicDecls = declarationSubtract(infiniteCardinalityDecls, declIntersection);
            classNames += this.renderDynamicDecls(instance, root, selectorTemplate, dynamicDecls);
        }

        return classNames ? ' ' + classNames : '';
    }

    render(Comp, instance, root: HTMLElement | null, tpl: TCssTemplate, args: any[]): string {
        const styles = tplToStyles(tpl, args);
        const stylesheet = this.toStylesheet(styles, SCOPE_SENTINEL);

        let infDeclClassNames = '';
        let classNames = renderCacheableSheet(
            stylesheet,
            '',
            (atRulePrelude, selectorTemplate, infiniteCardinalityDecls) => {
                infDeclClassNames += this.renderInfCardDecls(
                    Comp,
                    instance,
                    root,
                    selectorTemplate,
                    infiniteCardinalityDecls
                );
            }
        );

        return classNames + infDeclClassNames;
    }

    unrender(Comp, instance, root: HTMLElement | null) {
        // 1. Remove inline styles.
        // 2. Remove CSS variables.
        // 3. Remove infinite cardinality rules:
        //   3.1. Static part
        //   3.2. Dynamic part
        // 1. Remove inline styles.
        // No need to remove inline styles, as React will simply unmount the component.
        /*
        if (USE_INLINE_STYLES && root && root[$$last]) {
            const {[$$last]: declarations, style} = root;
            for (let [property] of declarations) {
                style.removeProperty(property);
            }
        }
        */
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
