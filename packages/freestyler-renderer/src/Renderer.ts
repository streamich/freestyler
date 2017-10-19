import {$$cn, $$cnt, hidden, sym} from 'freestyler-util';
import {TComponent, TComponentConstructor, TCssTemplate, IStyles} from './types';
import toStyleSheet, {TAtrule, TAtrulePrelude, TRule, TStyles, TStyleSheet} from './ast/toStylesheet';
import toCss, {isRule} from './ast/toCss';
import {getInstanceName, getName, IMiddleware, inject, IRenderer, TRendererFactory} from './util';
import hoistGlobalsAndWrapContext from './hoistGlobalsAndWrapContext';
import {TVisitor} from './ast/visit';
import VSheet from './VSheet';
import SCOPE_SENTINEL from './sentinel';
import declarationIntersectStrict from './declarationIntersectStrict';
import Sheet from './Sheet';

// Static part of the fluid template.
const sFluidStatic = sym('fluid');

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

// All other style properties are considered to have infinite cardinality.

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

    renderDynamic(instance: TComponent, root: Element, tpl: TCssTemplate, args: any[]): string {
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
            if (el) if (el) removeDomElement(el);
        }
    }

    private renderScopedRule(
        Comp: TComponentConstructor,
        instance: TComponent,
        root: Element | null,
        rule: TRule,
        atRulePrelude?: TAtrulePrelude
    ): string {
        const [selectorTemplate, declarations] = rule;
        if (!declarations.length) return;

        let classNames = '';

        const remainingDecls = [];
        let lowCardinalityDecls = [];

        for (let i = 0; i < declarations.length; i++) {
            const declaration = declarations[i];
            const [prop, value] = declaration;
            if (HIGH_CARDINALITY_PROPERTIES[prop]) {
                classNames += ' ' + this.vsheet.insert(atRulePrelude, selectorTemplate, prop, value);
            } else if (LOW_CARDINALITY_PROPERTIES[prop]) {
                lowCardinalityDecls.push(declaration);
            } else {
                remainingDecls.push(declaration);
            }
        }

        if (lowCardinalityDecls.length) {
            lowCardinalityDecls = lowCardinalityDecls.sort(([prop1], [prop2]) => (prop1 > prop2 ? 1 : -1));
            console.log(lowCardinalityDecls);
            classNames += ' ' + this.vsheet.insertBatch(atRulePrelude, selectorTemplate, lowCardinalityDecls);
        }

        if (remainingDecls.length) {
            const lastStaticDecls = (Comp as any)['__lastStaticDecls' + selectorTemplate];

            if (!lastStaticDecls) {
                (Comp as any)['__lastStaticDecls' + selectorTemplate] = remainingDecls;
                const name = getName(Comp);
                const className = genClassName(...(name ? [name] : []));
                const selector = selectorTemplate.replace(SCOPE_SENTINEL, '.' + className);
                const cssString = toCss([[selector, remainingDecls]]);

                this.sheet.inject(cssString);
                if (process.env.NODE_ENV === 'production') {
                    // el.id = className;
                }

                return (classNames += ' ' + className);
            } else {
                const declIntersection = declarationIntersectStrict(lastStaticDecls, remainingDecls);

                if (declIntersection.length === lastStaticDecls.length) {
                } else {
                }
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
        let classNames = '';

        for (let i = 0; i < stylesheet.length; i++) {
            const rule = stylesheet[i];
            if (isRule(rule)) {
                const selector = rule[0];
                const scopePosition = selector.indexOf(SCOPE_SENTINEL);
                const isScopedRule = scopePosition > -1;
                if (isScopedRule) {
                    classNames += this.renderScopedRule(Comp, instance, root, rule as TRule);
                } else {
                    // Global rule.
                }
            } else {
                // TAtrule
            }
        }

        return classNames;
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
