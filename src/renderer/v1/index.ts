import {$$cn, $$cnt, hidden, sym, camelCase} from '../../util';
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

// Low cardinality virtual style properties that should be batched.
//
// For example, `display` has only a limited number of available values:
// `block`, `inline`, `flex`, ...
const LOW_CARDINALITY_PROPERTIES = {
    'z-index': 1,
    display: 1,
    cursor: 1,
    'font-weight': 1,
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
    // top: 1,
    right: 1,
    bottom: 1,
    // left: 1,
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

let classNameCounter = 1;
const PREFIX = process.env.FREESTYLER_PREFIX || '';
const genId = () => `${PREFIX}_${(classNameCounter++).toString(36)}`;

// prettier-ignore
const tplToStyles: (tpl: TCssTemplate, args?: any[]) => IFreestylerStyles =
    (tpl, args) => (typeof tpl === 'function' ? tpl(...args) : tpl);

const getInfCardStaticCache: (obj: object, key: string) => DeclarationCache = (obj, key) => {
    const map = obj[$$statics];
    if (!map) return undefined;
    return map[key];
};

const setInfCardStaticCache = (obj: object, key: string, cache: DeclarationCache) => {
    let map = obj[$$statics];
    if (!map) {
        map = {};
        hidden(obj, $$statics, map);
    }
    map[key] = cache;
};

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
    sheets: SheetManager = new SheetManager();

    toStylesheet(styles: TStyles, selector: string): TStyleSheet {
        styles = hoistGlobalsAndWrapContext(styles, selector);
        return toStyleSheet(styles);
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
        const classNames = this.renderCacheableSheet(stylesheet, '', onInfCardDeclaration);
        const css = toCss(remainingStylesheet);

        return [classNames, css];
    }

    private renderCacheable(rule: TRule, atRulePrelude): [string, TDeclarations] {
        const [selectorTemplate, declarations] = rule;
        if (!declarations.length) return;

        let classNames = '';

        const infiniteCardinalityDecls = [];
        let lowCardinalityDecls = [];

        for (let i = 0; i < declarations.length; i++) {
            const declaration = declarations[i];
            const [prop, value] = declaration;

            if (isClient) {
                if (HIGH_CARDINALITY_PROPERTIES[prop]) {
                    classNames += ' ' + this.sheets.cache.insert(atRulePrelude, selectorTemplate, prop, value);
                } else if (LOW_CARDINALITY_PROPERTIES[prop]) {
                    lowCardinalityDecls.push(declaration);
                } else {
                    infiniteCardinalityDecls.push(declaration);
                }
            } else {
                lowCardinalityDecls = declarations;
            }
        }

        if (lowCardinalityDecls.length) {
            declarationSort(lowCardinalityDecls);
            classNames += ' ' + this.sheets.cache.insertBatch(atRulePrelude, selectorTemplate, lowCardinalityDecls);
        }

        return [classNames, infiniteCardinalityDecls];
    }

    private renderCacheableSheet(
        rules: (TRule | TAtrule)[],
        atRulePrelude: TAtrulePrelude,
        onNonCacheableDeclarations: (
            atRulePrelude: TAtrulePrelude,
            selectors: string,
            declarations: TDeclarations
        ) => void,
        onKeyframeRule = atrule => {}
    ): string {
        let classNames = '';

        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            if (isRule(rule)) {
                // TRule
                const selectors = rule[0];
                const isCacheable = selectors.indexOf(SCOPE_SENTINEL) > -1;
                if (isCacheable) {
                    const [moreClassNames, nonCacheableDeclarations] = this.renderCacheable(
                        rule as TRule,
                        atRulePrelude
                    );
                    classNames += moreClassNames;
                    if (nonCacheableDeclarations.length) {
                        onNonCacheableDeclarations(atRulePrelude, selectors, nonCacheableDeclarations);
                    }
                } else {
                    onNonCacheableDeclarations(atRulePrelude, selectors, rule[1]);
                }
            } else {
                // TAtrule
                const atrule = rule as TAtrule;
                const isKeyframes = atrule.prelude[1] === 'k';

                if (isKeyframes) {
                    onKeyframeRule(atrule);
                } else {
                    classNames += this.renderCacheableSheet(atrule.rules, atrule.prelude, onNonCacheableDeclarations);
                }
            }
        }

        return classNames;
    }

    private putInfStatics(Comp, instance, key, atRulePrelude, selectorTemplate, declarations) {
        const className = genId();
        const id = className;

        const cache = new DeclarationCache(id, declarations);
        setInfCardStaticCache(Comp, key, cache);
        setInfCardStaticCache(instance, key, cache);

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

        if (USE_INLINE_STYLES && el && !atRulePrelude && selectorTemplate === SCOPE_SENTINEL) {
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
            const className = genId();
            const selectors = selectorTemplate.replace(SCOPE_SENTINEL, '.' + className);

            drule = dsheet.add(atRulePrelude, selectors, declarations, true);
            drule.className = className;
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
        let cache = getInfCardStaticCache(instance, key);

        if (!cache) {
            cache = getInfCardStaticCache(Comp, key);
            if (cache) {
                cache.cnt++;
                setInfCardStaticCache(instance, key, cache);
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

    render(Comp, instance, root: HTMLElement | null, tpl: TCssTemplate, args?: any[]): string {
        if (!tpl) {
            return '';
        }

        const styles = tplToStyles(tpl, args);

        if (process.env.NODE_ENV !== 'production') {
            require('../../debug').emit({
                type: 'RENDER',
                Comp,
                instance,
                el: root,
                styles,
                args,
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

    renderStatic(Comp, tpl: TCssTemplate, args?: any[]): string {
        let classNames = Comp[$$cn];

        if (classNames === void 0) {
            hidden(Comp, $$cn, '');
        } else {
            return classNames;
        }

        let styles = tplToStyles(tpl, args);
        if (!styles) return '';

        if (process.env.NODE_ENV !== 'production') {
            require('../../debug').emit({
                type: 'RENDER_STATIC',
                Comp,
                styles,
                args,
            });
        }

        const stylesheet = this.toStylesheet(styles, SCOPE_SENTINEL);
        let moreClassNames = '';

        classNames = this.renderCacheableSheet(
            stylesheet,
            '',
            (atRulePrelude, selectorTemplate, infiniteCardinalityDeclarations) => {
                const infClassName = genId();
                const selector = selectorTemplate.replace(SCOPE_SENTINEL, '.' + infClassName);

                this.putDecls(infClassName, selector, infiniteCardinalityDeclarations, atRulePrelude);
                moreClassNames += ' ' + infClassName;
            },
            (atrule: TAtrule) => {
                const rawCss = toCss([atrule]);

                this.sheets.global.addRaw(rawCss);
            }
        );

        classNames += moreClassNames;
        Comp[$$cn] = classNames;
        return classNames;
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

    // Use this method on server side to get raw CSS after every page render
    // and free memory before next request.
    flush(): string {
        const rawCss = this.sheets.toString();

        this.sheets = new SheetManager();

        return rawCss;
    }
}

export default Renderer;
