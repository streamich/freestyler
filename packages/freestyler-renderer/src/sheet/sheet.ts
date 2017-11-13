import createStyleElement from '../util/createStyleElement';
import getById from '../util/getById';
import removeDomElement from '../util/removeDomElement';
import {TAtrulePrelude, TSelectors, TDeclarations} from '../ast/toStylesheet';
import applyDeclarationsToCssStyleDeclaration from '../util/applyDeclarationsToCssStyleDeclaration';

type TMapBySelectors = {[selectors: string]: Rule};
type TMapByAtRulePrelude = {[atRulePrelude: string]: TMapBySelectors};

export class Rule {
    name: string; // Class name.
    style: CSSStyleDeclaration;

    constructor(name: string, style: CSSStyleDeclaration) {
        this.name = name;
        this.style = style;
    }

    put(declarations: TDeclarations) {
        applyDeclarationsToCssStyleDeclaration(this.style, declarations);
    }

    trunc() {
        this.style.cssText = '';
    }
}

export class Sheet<TRule extends Rule> {
    Rule = Rule as new (...args) => TRule;

    el: HTMLStyleElement = createStyleElement();
    map: TMapBySelectors | TMapByAtRulePrelude = {};

    get(atRulePrelude: TAtrulePrelude, selectors: TSelectors): TRule {
        const {map} = this;

        return !atRulePrelude ? map[selectors] as TRule : map[atRulePrelude] && map[atRulePrelude][selectors];
    }

    add(name: string, atRulePrelude: TAtrulePrelude, selectors: TSelectors): TRule {
        const sheet = this.el.sheet as CSSStyleSheet;
        const {cssRules} = sheet;
        const {length} = cssRules;

        if (atRulePrelude) {
            sheet.insertRule(`${atRulePrelude}{${selectors}{}}`, length);
            // TODO: handle this case...
        } else {
            sheet.insertRule(`${selectors}{}`, length);
            // TODO: Benchmark `cssRules[length]` vs `cssRules.item(length)`.
            const rule = new this.Rule(name, (cssRules[length] as CSSStyleRule).style);
            return (this.map[selectors] = rule);
        }
    }

    destroy() {
        removeDomElement(this.el);
    }
}
