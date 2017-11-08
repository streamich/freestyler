import {$$cn, $$cnt, hidden, sym, camelCase} from 'freestyler-util';
import supportsCssVariables from 'freestyler-util/supportsCssVariables';
import {TCssTemplate, TCssDynamicTemplate, IStyles} from './types';
import {TDeclarations, TAtrule} from './ast/toStylesheet';
import toStyleSheet, {TStyles, TStyleSheet} from './ast/toStylesheet';
import toCss from './ast/toCss';
import toCssRule from './ast/toCssRule';
import {IRenderer} from './util';
import hoistGlobalsAndWrapContext from './hoistGlobalsAndWrapContext';
import Sheet from './Sheet';
import SCOPE_SENTINEL from './util/sentinel';
import declarationIntersectStrict from './declaration/intersectStrict';
import declarationSubtract from './declaration/subtract';
import declarationSort from './declaration/sort';
import declarationEqualityStrict from './declaration/equalityStrict';
import declarationSubtractStrict from './declaration/subtractStrict';
import renderCacheableSheet from './virtual/renderCacheableSheet';
import createStyleElement from './util/createStyleElement';

const USE_CSS_VARIABLES = supportsCssVariables;
const USE_INLINE_STYLES = true;

const $$last = sym('last');

let classNameCounter = 1;
const genId = () => `_${(classNameCounter++).toString(36)}`;

// prettier-ignore
const tplToStyles: (tpl: TCssTemplate, args?: any[]) => IStyles =
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
        return toStyleSheet(styles);
    }

    private putDecls(id: string, selector: string, declarations: TDeclarations) {
        this.sheet.put(id, toCssRule(selector, declarations));
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

            // TODO: Check if it is faster to use `declarationSubtractStrict` and
            // TODO: apply them one-by-one, or use `applyInlineStyles` instead.

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
            className = genId();
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

    private renderInfCardDecls(Comp, instance, el, selectorTemplate, infiniteCardinalityDecls) {
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
            let className = genId();

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

                let className = genId();

                const decls = new StaticDecls(className, declIntersection);
                staticDecls.push(decls);

                const selector = selectorTemplate.replace(SCOPE_SENTINEL, '.' + className);
                this.putDecls(className, selector, declIntersection);

                classNames += ' ' + className;
            }

            // Inject dynamic part.
            const dynamicDecls = declarationSubtract(infiniteCardinalityDecls, declIntersection);
            classNames += this.renderDynamicDecls(instance, el, selectorTemplate, dynamicDecls);
        }

        return classNames ? ' ' + classNames : '';
    }

    render(Comp, instance, root: HTMLElement | null, tpl: TCssTemplate | TCssDynamicTemplate, args: any[]): string {
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

    renderStatic(Comp, tpl: TCssTemplate, args?: any[]): string {
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

    unrender(Comp, instance, root: HTMLElement | null) {
        // 1. Remove inline styles - not needed, as component un-mounts inline styles will disappear.
        // 2. Remove CSS variables - element variables will disappear on un-mount, need to only remove
        //    global document element CSS variables.
        // 3. Remove infinite cardinality rules:
        //   3.1. Static part
        //   3.2. Dynamic part
    }

    format(styles: IStyles, selector: string): string {
        return toCss(this.toStylesheet(styles, selector));
    }

    renderAnon(styles: IStyles): string {
        return this.renderStatic(styles, styles);
    }

    // TODO: Profile the speed on middleware.
    use(middleware) {
        // this.middlewares.push(middleware);
    }
}

export default Renderer;
