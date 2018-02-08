import {$$cn, $$cnt, hidden, sym, camelCase} from '../util';
import supportsCssVariables from '../supportsCssVariables';
import {TCssTemplate, TCssDynamicTemplate, IStyles} from './types';
import {TDeclarations, TAtrule, TAtrulePrelude} from './ast/toStylesheet';
import toStyleSheet, {TStyles, TStyleSheet} from './ast/toStylesheet';
import toCss from './ast/toCss';
import toCssRule from './ast/toCssRule';
import {IRenderer} from './util';
import hoistGlobalsAndWrapContext from './hoistGlobalsAndWrapContext';
import {list} from './sheet';
import SCOPE_SENTINEL from './util/sentinel';
import declarationIntersectStrict from './declaration/intersectStrict';
import declarationSubtract from './declaration/subtract';
import declarationSort from './declaration/sort';
import declarationEqualityStrict from './declaration/equalityStrict';
import declarationSubtractStrict from './declaration/subtractStrict';
import renderCacheableSheet from './cache/renderCacheableSheet';
import renderInlineStyles from './util/renderInlineStyles';

const USE_CSS_VARIABLES = supportsCssVariables;
const USE_INLINE_STYLES = true;

const $$statics = sym('stat'); // Static infinite cardinality declaration cache.
const $$dynamics = sym('dyn'); // Dynamic infinite cardinality declaration cache.

let classNameCounter = 1;
const PREFIX = process.env.FREESTYLER_PREFIX || '';
const genId = () => `${PREFIX}_${(classNameCounter++).toString(36)}`;

// prettier-ignore
const tplToStyles: (tpl: TCssTemplate, args?: any[]) => IStyles =
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
    toStylesheet(styles: TStyles, selector: string): TStyleSheet {
        styles = hoistGlobalsAndWrapContext(styles, selector);
        return toStyleSheet(styles);
    }

    private putDecls(id: string, selector: string, declarations: TDeclarations, atRulePrelude?: TAtrulePrelude) {
        list.ssheet.set(id, atRulePrelude, selector, declarations);
        // list.ssheet.set(id, toCssRule(selector, declarations, atRulePrelude));
    }

    private putInfStatics(Comp, instance, key, atRulePrelude, selectorTemplate, declarations) {
        const className = genId();
        const id = className;

        const cache = new DeclarationCache(id, declarations);
        setInfCardStaticCache(Comp, key, cache);
        setInfCardStaticCache(instance, key, cache);

        const selector = selectorTemplate.replace(SCOPE_SENTINEL, '.' + className);
        this.putDecls(id, selector, declarations, atRulePrelude);

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
            dsheet = list.create();
            hidden(instance, $$dynamics, dsheet);
        }

        let drule = dsheet.get(atRulePrelude, selectorTemplate);
        if (!drule) {
            const selectors = selectorTemplate.replace(SCOPE_SENTINEL, '.' + genId());

            drule = dsheet.add(atRulePrelude, selectors);
        }

        const className = drule.name;
        const selector = selectorTemplate.replace(SCOPE_SENTINEL, '.' + className);

        // Use CSS variables.
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

        drule.put(declarations);
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

    render(Comp, instance, root: HTMLElement | null, tpl: TCssTemplate, args: any[]): string {
        const styles = tplToStyles(tpl, args);

        if (process.env.NODE_ENV !== 'production') {
            require('../debug').emit({
                type: 'RENDER',
                Comp,
                instance,
                el: root,
                styles,
                args,
            });
        }

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
                    atRulePrelude,
                    selectorTemplate,
                    infiniteCardinalityDecls
                );
            }
        );

        return classNames + infDeclClassNames;
    }

    unrender(Comp, instance, el: HTMLElement | null) {
        require('../debug').emit({
            type: 'UNRENDER',
            Comp,
            instance,
            el,
        });

        // Remove statics
        const cacheMap = instance[$$statics] as {[key: string]: DeclarationCache};
        for (const key in cacheMap) {
            const cache = cacheMap[key];
            cache.cnt--;
            if (!cache.cnt) {
                list.ssheet.remove(cache.id);
                delete Comp[$$statics];
            }
        }

        // Remove dynamics
        const dynamics = instance[$$dynamics];
        if (dynamics) {
            dynamics.destroy();
            // TODO: Do we really need this line?
            instance[$$dynamics] = null;
            // delete instance[$$dynamics];
        }
    }

    renderStatic(Comp, tpl: TCssTemplate, args?: any[]): string {
        let classNames = Comp[$$cn];

        if (classNames === void 0) {
            hidden(Comp, $$cn, '');
        }

        let styles = tplToStyles(tpl, args);
        if (!styles) return '';

        if (process.env.NODE_ENV !== 'production') {
            require('../debug').emit({
                type: 'RENDER_STATIC',
                Comp,
                styles,
                args,
            });
        }

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
