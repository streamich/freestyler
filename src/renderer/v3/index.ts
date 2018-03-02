import {$$cnt, hidden, sym, camelCase} from '../../util';
import supportsCssVariables from '../../supportsCssVariables';
import {TCssTemplate, TCssDynamicTemplate, IFreestylerStyles} from '../../types/index';
import toStyleSheet, {
    TDeclarations,
    TRule,
    TAtrule,
    TAtrulePrelude,
    TStyles,
    TStyleSheet,
} from '../../ast/toStylesheet';
import toCss, {isRule} from '../../ast/toCss';
import toCssRule from '../../ast/toCssRule';
import {IRenderer} from '../util';
import hoistGlobalsAndWrapContext from '../hoistGlobalsAndWrapContext';
import SheetManager from '../../sheet/SheetManager';
import SCOPE_SENTINEL from '../util/sentinel';
import declarationIntersectStrict from '../../declaration/intersectStrict';
import declarationSubtract from '../../declaration/subtract';
import declarationSort from '../../declaration/sort';
import declarationEqualityStrict from '../../declaration/equalityStrict';
import declarationSubtractStrict from '../../declaration/subtractStrict';
import renderInlineStyles from '../util/renderInlineStyles';
import {isClient} from '../../util';

const USE_CSS_VARIABLES = false; // supportsCssVariables;
const USE_INLINE_STYLES = true;

const $$statics = sym('stat'); // Static infinite cardinality declaration cache.
const $$dynamics = sym('dyn'); // Dynamic infinite cardinality declaration cache.

let classNameCounter = 1;

const combineIntoStylesheet = (stylesheet: TStyleSheet, className: string) => {
    const dottedClassName = '.' + className;
    return (prelude, selectorTemplate, declarations) => {
        const selector = selectorTemplate.replace(SCOPE_SENTINEL, dottedClassName);
        if (prelude) {
            stylesheet.push({
                prelude,
                rules: [[selector, declarations]],
            } as TAtrule);
        } else {
            stylesheet.push([selector, declarations]);
        }
    };
};

// Declaration cache, keeps track how many objects use specified declarations
// and saves the `id` of those declarations;
class DeclarationCache {
    cnt: number = 1;
    id: string; // `className` or other identifier that indetifies this cache.
    decls: TDeclarations;

    constructor(id: string, decls: TDeclarations) {
        this.id = id;
        this.decls = decls;
    }
}

class Renderer implements IRenderer {
    statCache: WeakMap<any, string>;
    dynCache: WeakMap<any, {[key: string]: DeclarationCache}>;
    sheets: SheetManager;
    prefix: string = 'f-';

    constructor() {
        this.reset();
    }

    genId(name = '') {
        return `${this.prefix}${name}_${(classNameCounter++).toString(36)}`;
    }

    toStylesheet(styles: TStyles, selector: string): TStyleSheet {
        styles = hoistGlobalsAndWrapContext(styles, selector);

        const stylesheet = toStyleSheet(styles);

        return stylesheet;
    }

    private setInfCardStaticCache(obj: object, key: string, cache: DeclarationCache) {
        let map = this.dynCache.get(obj);

        if (!map) {
            map = {};
            this.dynCache.set(obj, map);
        }
        map[key] = cache;
    }

    private getInfCardStaticCache(obj: object, key: string): DeclarationCache {
        const map = this.dynCache.get(obj);

        if (!map) return undefined;

        return map[key];
    }

    private putDecls(
        id: string,
        selector: string,
        declarations: TDeclarations,
        atRulePrelude?: TAtrulePrelude,
        important?: boolean
    ) {
        this.sheets.stat.set(id, atRulePrelude, selector, declarations, important);
        // list.ssheet.set(id, toCssRule(selector, declarations, atRulePrelude));
    }

    /**
     * Renders cacheable declarations (low and high cardinality); returns
     * class names for those declarations, also returns raw CSS string
     * for the infinite cardinality declarations.
     * @param styles
     */
    renderCacheAndGetInfCss(stylesheet: TStyleSheet, className: string): [string, string] {
        const remainingStylesheet: TStyleSheet = [];
        const onInfCardDeclaration = combineIntoStylesheet(remainingStylesheet, className);
        const classNames = this.renderVirtual(stylesheet, '');
        const css = toCss(remainingStylesheet);

        return [classNames, css];
    }

    private renderVirtual(rules: (TRule | TAtrule)[], atRulePrelude: TAtrulePrelude): string {
        let classNames = '';

        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];

            if (!isRule(rule)) {
                // TAtrule
                const atrule = rule as TAtrule;
                const isKeyframes = atrule.prelude[1] === 'k';

                if (isKeyframes) {
                    this.sheets.global.addRaw(toCss([rule]));
                } else {
                    classNames += this.renderVirtual(atrule.rules, atrule.prelude);
                }

                continue;
            }

            // TRule
            const [selectors, declarations] = rule as TRule;
            const isCacheable = selectors.indexOf(SCOPE_SENTINEL) > -1;
            if (isCacheable) {
                for (let i = 0; i < declarations.length; i++) {
                    const declaration = declarations[i];
                    const [prop, value] = declaration;

                    classNames += ' ' + this.sheets.cache.insert(atRulePrelude, selectors, prop, value);
                }
            } else {
                const nonCacheableClassNames = this.genId();

                this.putDecls(nonCacheableClassNames, selectors, declarations, atRulePrelude);
                classNames += ' ' + nonCacheableClassNames;
            }
        }

        return classNames;
    }

    private putInfStatics(Comp, instance, key, atRulePrelude, selectorTemplate, declarations) {
        const className = this.genId();
        const id = className;

        const cache = new DeclarationCache(id, declarations);
        this.setInfCardStaticCache(Comp, key, cache);
        this.setInfCardStaticCache(instance, key, cache);

        const selector = selectorTemplate.replace(SCOPE_SENTINEL, '.' + className);
        this.putDecls(id, selector, declarations, atRulePrelude, true);

        return ' ' + className;
    }

    private renderDynamicDecls(
        instance: object,
        el: HTMLElement | null,
        atRulePrelude: TAtrulePrelude,
        selectorTemplate: string,
        declarations: TDeclarations
    ): string {
        if (!declarations.length) {
            // TODO: Maybe remove old declarations.
            return '';
        }

        if (isClient && USE_INLINE_STYLES && el && !atRulePrelude && selectorTemplate === SCOPE_SENTINEL) {
            renderInlineStyles(el, declarations);
            return '';
        }

        let dsheet = instance[$$dynamics];

        if (!dsheet) {
            dsheet = this.sheets.create();
            hidden(instance, $$dynamics, dsheet);
        }

        let drule = dsheet.get(atRulePrelude, selectorTemplate);

        if (!drule) {
            const className = this.genId();
            const selectors = selectorTemplate.replace(SCOPE_SENTINEL, '.' + className);

            drule = dsheet.add(atRulePrelude, selectors, declarations, true, selectorTemplate);
            drule.className = className;
        } else {
            drule.put(declarations);
        }

        const className = drule.className;
        const selector = selectorTemplate.replace(SCOPE_SENTINEL, '.' + className);

        // Use CSS variables.
        /*
        if (USE_CSS_VARIABLES) {
            const style = el ? el.style : document.documentElement.style;
            style.cssText = '';
            for (let i = 0; i < declarations.length; i++) {
                const declaration = declarations[i];
                const [property, value] = declaration;

                let variableName = selector + '-' + property;
                variableName = variableName.replace(/[^a-zA-Z0-9_]/g, '-');
                variableName = '--' + variableName;

                style.setProperty(variableName, value);
                declaration[1] = `var(${variableName})`;
            }
        }
        */

        return ' ' + className;
    }

    private renderInfCardDecls(
        Comp: object,
        instance: object,
        el: HTMLElement | null,
        atRulePrelude,
        selectorTemplate,
        declarations
    ) {
        if (!declarations.length) return '';
        declarationSort(declarations);

        const key = atRulePrelude + selectorTemplate;
        let cache = this.getInfCardStaticCache(instance, key);

        if (!cache) {
            cache = this.getInfCardStaticCache(Comp, key);
            if (cache) {
                cache.cnt++;
                this.setInfCardStaticCache(instance, key, cache);
            } else {
                // If both caches are empty.
                return this.putInfStatics(Comp, instance, key, atRulePrelude, selectorTemplate, declarations);
            }
        }

        const declIntersection = declarationIntersectStrict(cache.decls, declarations);

        // If perfect cache HIT.
        if (declIntersection.length === declarations.length) {
            return ' ' + cache.id;
        }

        // If partial cache HIT.
        if (declIntersection.length === cache.decls.length) {
            const dynamicDecls = declarationSubtract(declarations, declIntersection);
            return (
                ' ' + cache.id + this.renderDynamicDecls(instance, el, atRulePrelude, selectorTemplate, dynamicDecls)
            );
        }

        // If cache MISS. (generate new statics)
        const classNames = this.putInfStatics(Comp, instance, key, atRulePrelude, selectorTemplate, declIntersection);

        // Inject dynamic part.
        const dynamicDecls = declarationSubtract(declarations, declIntersection);
        return classNames + this.renderDynamicDecls(instance, el, atRulePrelude, selectorTemplate, dynamicDecls);
    }

    render(Comp, instance, root: HTMLElement | null, styles: IFreestylerStyles): string {
        if (!styles) {
            return '';
        }

        if (process.env.NODE_ENV !== 'production') {
            require('../../debug').emit({
                type: 'RENDER',
                Comp,
                instance,
                el: root,
                styles,
            });
        }

        const stylesheet = this.toStylesheet(styles, SCOPE_SENTINEL);
        let classNames = '';

        for (let i = 0; i < stylesheet.length; i++) {
            const rule = stylesheet[i];

            if (isRule(rule)) {
                classNames += this.renderInfCardDecls(Comp, instance, root, null, rule[0], rule[1]);
            } else {
                const r = rule as TAtrule;
                const atRulePrelude = r.prelude;

                for (let j = 0; j < r.rules.length; j++) {
                    const rule = r.rules[j];

                    classNames += this.renderInfCardDecls(Comp, instance, root, atRulePrelude, rule[0], rule[1]);
                }
            }
        }

        return classNames;
    }

    unrender(Comp, instance, el: HTMLElement | null) {
        if (process.env.NODE_ENV !== 'production') {
            require('../../debug').emit({
                type: 'UNRENDER',
                Comp,
                instance,
                el,
            });
        }

        // Remove statics
        const cacheMap = instance[$$statics] as {[key: string]: DeclarationCache};
        for (const key in cacheMap) {
            const cache = cacheMap[key];
            cache.cnt--;
            if (!cache.cnt) {
                this.sheets.stat.remove(cache.id);
                delete Comp[$$statics];
            }
        }

        // Remove dynamics
        const dynamics = instance[$$dynamics];
        if (dynamics) {
            dynamics.destroy();
            // TODO: Do we really need this line?
            // instance[$$dynamics] = null;
            delete instance[$$dynamics];
        }
    }

    renderStatic(Comp, styles: IFreestylerStyles): string {
        let className = this.statCache.get(Comp);

        if (className === void 0) {
            this.statCache.set(Comp, '');
        } else {
            return className;
        }

        if (!styles) return '';

        if (process.env.NODE_ENV !== 'production') {
            require('../../debug').emit({
                type: 'RENDER_STATIC',
                Comp,
                styles,
            });
        }

        className = '';

        if (process.env.NODE_ENV !== 'production') {
            className = Comp.displayName || Comp.name || '';
            [
                '~',
                '!',
                '@',
                '$',
                '%',
                '^',
                '&',
                '*',
                '(',
                ')',
                '+',
                '=',
                ',',
                '.',
                '/',
                "'",
                ';',
                ':',
                '"',
                '?',
                '>',
                '<',
                '[',
                ']',
                '\\',
                '{',
                '}',
                '|',
                '`',
                '#',
            ].forEach(char => {
                className = className.replace(char, '_');
            });
        }
        className = this.genId(className);

        // styles = hoistGlobalsAndWrapContext(styles, selector);
        const stylesheet = this.toStylesheet(styles, '.' + className);
        const css = toCss(stylesheet);

        if (process.env.NODE_ENV === 'production') {
            this.sheets.injectRaw(css);
        } else {
            this.sheets.injectRaw(css, 'css-' + className);
        }

        className = ' ' + className;
        this.statCache.set(Comp, className);

        return className;
    }

    format(styles: IFreestylerStyles, selector: string): string {
        return toCss(this.toStylesheet(styles, selector));
    }

    renderAnon(styles: IFreestylerStyles): string {
        return this.renderStatic(styles, styles);
    }

    // TODO: Profile the speed on middleware.
    use(middleware) {
        // this.middlewares.push(middleware);
    }

    reset() {
        this.sheets = new SheetManager();
        this.statCache = new WeakMap();
        this.dynCache = new WeakMap();
    }

    // Use this method on server side to get raw CSS after every page render
    // and free memory before next request.
    flush(): string {
        const rawCss = this.sheets.toString();

        this.reset();

        return rawCss;
    }
}

export default Renderer;
