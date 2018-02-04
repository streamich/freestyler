import createStyleElement from '../util/createStyleElement';
import removeDomElement from '../util/removeDomElement';
import {TAtrulePrelude, TSelectors, TDeclarations} from '../ast/toStylesheet';
import SCOPE_SENTINEL from '../util/sentinel';

type TMapBySelectors = {[selectors: string]: Rule};
type TMapByAtRulePrelude = {[atRulePrelude: string]: TMapBySelectors};

export class Rule {
    name: string; // Class name.
    style: CSSStyleDeclaration;
    decl: TDeclarations = null;

    constructor(name: string, style: CSSStyleDeclaration) {
        this.name = name;
        this.style = style;
    }

    put(declarations: TDeclarations) {
        const {style} = this;
        const len = declarations.length;

        this.decl = declarations;
        for (let i = 0; i < len; i++) style.setProperty.apply(style, declarations[i]);
    }

    trunc() {
        this.style.cssText = '';
    }
}

export class Sheet {
    Rule = Rule as new (...args) => Rule;

    el: HTMLStyleElement = createStyleElement();
    map: TMapBySelectors | TMapByAtRulePrelude = {};

    get(atRulePrelude: TAtrulePrelude, selectors: TSelectors): Rule {
        const {map} = this;

        return !atRulePrelude ? map[selectors] as Rule : map[atRulePrelude] && map[atRulePrelude][selectors];
    }

    addBase(atRulePrelude: TAtrulePrelude, selectors: string): Rule {
        const sheet = this.el.sheet as CSSStyleSheet;
        const {cssRules} = sheet;
        const {length} = cssRules;

        if (atRulePrelude) {
            sheet.insertRule(`${atRulePrelude}{${selectors}{}}`, length);
        } else {
            sheet.insertRule(`${selectors}{}`, length);
        }

        // TODO: Benchmark `cssRules[length]` vs `cssRules.item(length)`.
        const rule = new this.Rule(name, (cssRules[length] as CSSStyleRule).style);

        return (this.map[selectors] = rule);
    }

    add(name: string, atRulePrelude: TAtrulePrelude, selectorTemplate: string): Rule {
        const selectors = selectorTemplate.replace(SCOPE_SENTINEL, '.' + name);

        return this.addBase(atRulePrelude, selectors);
    }

    destroy() {
        removeDomElement(this.el);
    }
}

export class SSheet {
    byId: {[id: string]: Sheet} = {};

    set(id: string, atRulePrelude: TAtrulePrelude, selectors: TSelectors, declarations: TDeclarations) {
        let sheet = this.byId[id];

        if (!sheet) {
            sheet = new Sheet();
            sheet.addBase(atRulePrelude, selectors).put(declarations);
            this.byId[id] = sheet;
        }
    }

    remove(id: string) {
        const sheet = this.byId[id];

        if (sheet) {
            sheet.destroy();
            delete this.byId[id];
        }
    }
}
