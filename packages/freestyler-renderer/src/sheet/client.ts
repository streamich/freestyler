import createStyleElement from '../util/createStyleElement';
import removeDomElement from '../util/removeDomElement';
import {TAtrulePrelude, TSelectors, TDeclarations} from '../ast/toStylesheet';

type TMapBySelectors = {[selectors: string]: ClientRule};
type TMapByAtRulePrelude = {[atRulePrelude: string]: TMapBySelectors};

export class ClientRule {
    style: CSSStyleDeclaration;
    decl: TDeclarations = null;

    constructor(style: CSSStyleDeclaration) {
        this.style = style;
    }

    put(declarations: TDeclarations) {
        const {style} = this;
        const len = declarations.length;

        this.decl = declarations;
        for (let i = 0; i < len; i++) style.setProperty.apply(style, declarations[i]);
    }

    putRaw(rawCss: string) {
        this.style.cssText = rawCss;
    }

    trunc() {
        this.decl = null;
        this.style.cssText = '';
    }
}

export class ClientSheet {
    el: HTMLStyleElement = createStyleElement();
    map: TMapBySelectors | TMapByAtRulePrelude = {};
    col;

    constructor(collection) {
        this.col = collection;
    }

    get(atRulePrelude: TAtrulePrelude, selectors: TSelectors): ClientRule {
        const {map} = this;

        return !atRulePrelude ? map[selectors] as ClientRule : map[atRulePrelude] && map[atRulePrelude][selectors];
    }

    add(atRulePrelude: TAtrulePrelude, selectors: string): ClientRule {
        const sheet = this.el.sheet as CSSStyleSheet;
        const {cssRules} = sheet;
        const {length} = cssRules;

        if (atRulePrelude) {
            sheet.insertRule(`${atRulePrelude}{${selectors}{}}`, length);
        } else {
            sheet.insertRule(`${selectors}{}`, length);
        }

        // TODO: Benchmark `cssRules[length]` vs `cssRules.item(length)`.
        const rule = new ClientRule((cssRules[length] as CSSStyleRule).style);

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
        this.col.destroy(this);
    }
}
