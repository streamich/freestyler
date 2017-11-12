import createStyleElement from '../util/createStyleElement';
import getById from '../util/getById';
import removeDomElement from '../util/removeDomElement';
import {TAtrulePrelude, TSelectors, TDeclarations} from '../ast/toStylesheet';
import applyDeclarationsToCssStyleDeclaration from '../util/applyDeclarationsToCssStyleDeclaration';

type TMapBySelectors = {[selectors: string]: DRule};
type TMapByAtRulePrelude = {[atRulePrelude: string]: TMapBySelectors};

class DRule {
    name: string; // Class name.
    style: CSSStyleDeclaration;
    decl: TDeclarations = null;

    constructor(name: string, style: CSSStyleDeclaration) {
        this.name = name;
        this.style = style;
    }

    put(declarations: TDeclarations) {
        applyDeclarationsToCssStyleDeclaration(this.style, declarations);
    }
}

class DSheet {
    el: HTMLStyleElement = createStyleElement();
    map: TMapBySelectors | TMapByAtRulePrelude = {};

    get(atRulePrelude: TAtrulePrelude, selectors: TSelectors): DRule {
        const {map} = this;

        return !atRulePrelude ? map[selectors] as DRule : map[atRulePrelude] && map[atRulePrelude][selectors];
    }

    create(name: string, atRulePrelude: TAtrulePrelude, selectors: TSelectors): DRule {
        let drule = this.get(atRulePrelude, selectors);

        if (!drule) {
            const sheet = this.el.sheet as CSSStyleSheet;
            const {rules} = sheet;
            const {length} = rules;

            if (atRulePrelude) {
                // TODO: Handle this case.
            } else {
                sheet.insertRule(`${selectors}{}`, length);
                // TODO: Benchmark `rules[length]` vs `rules.item(length)`.
                drule = new DRule(name, (rules[length] as CSSStyleRule).style);
                this.map[selectors] = drule;
            }
        }

        return drule;
    }

    destroy() {
        removeDomElement(this.el);
    }
}

export default DSheet;
