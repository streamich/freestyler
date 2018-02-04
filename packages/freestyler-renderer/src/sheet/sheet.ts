import createStyleElement from '../util/createStyleElement';
import removeDomElement from '../util/removeDomElement';
import {TAtrulePrelude, TSelectors, TDeclarations} from '../ast/toStylesheet';

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
        this.decl = null;
        this.style.cssText = '';
    }
}

export class Sheet {
    el: HTMLStyleElement = createStyleElement();
    map: TMapBySelectors | TMapByAtRulePrelude = {};

    get(atRulePrelude: TAtrulePrelude, selectors: TSelectors): Rule {
        const {map} = this;

        return !atRulePrelude ? map[selectors] as Rule : map[atRulePrelude] && map[atRulePrelude][selectors];
    }

    add(atRulePrelude: TAtrulePrelude, selectors: string): Rule {
        const sheet = this.el.sheet as CSSStyleSheet;
        const {cssRules} = sheet;
        const {length} = cssRules;

        if (atRulePrelude) {
            sheet.insertRule(`${atRulePrelude}{${selectors}{}}`, length);
        } else {
            sheet.insertRule(`${selectors}{}`, length);
        }

        // TODO: Benchmark `cssRules[length]` vs `cssRules.item(length)`.
        const rule = new Rule(name, (cssRules[length] as CSSStyleRule).style);

        if (atRulePrelude) {
            if (!this.map[atRulePrelude]) {
                this.map[atRulePrelude] = {};
            }
            this.map[atRulePrelude][selectors] = rule;
        } else {
            this.map[selectors] = rule;
        }

        return rule;
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
            sheet.add(atRulePrelude, selectors).put(declarations);
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
