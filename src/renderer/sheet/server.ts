import createStyleElement from '../util/createStyleElement';
import removeDomElement from '../util/removeDomElement';
import {TAtrulePrelude, TSelectors, TDeclarations} from '../ast/toStylesheet';
import toCssDeclarations from '../ast/toCssDeclarations';

type TMapBySelectors = {[selectors: string]: ServerRule};
type TMapByAtRulePrelude = {[atRulePrelude: string]: TMapBySelectors};

export class ServerRule {
    atRule: string;
    selectors: string;
    decl: TDeclarations = null;
    rawCss: string = '';

    constructor(atRulePrelude: string, selectors: string) {
        this.atRule = atRulePrelude;
        this.selectors = selectors;
    }

    put(declarations: TDeclarations) {
        this.decl = declarations;
    }

    putRaw(rawCss: string) {
        this.rawCss = rawCss;
    }

    trunc() {
        this.decl = null;
    }

    toString() {
        let rawCss = this.rawCss || toCssDeclarations(this.decl);

        rawCss = `${this.selectors}{${rawCss}}`;

        if (this.atRule) {
            rawCss = `${this.atRule}{${rawCss}}`;
        }

        return rawCss;
    }
}

export class ServerSheet {
    map: TMapBySelectors | TMapByAtRulePrelude = {};
    col;
    rules: ServerRule[] = [];

    constructor(collection) {
        this.col = collection;
    }

    get(atRulePrelude: TAtrulePrelude, selectors: TSelectors): ServerRule {
        const {map} = this;

        return !atRulePrelude ? map[selectors] as ServerRule : map[atRulePrelude] && map[atRulePrelude][selectors];
    }

    add(atRulePrelude: TAtrulePrelude, selectors: string): ServerRule {
        const rule = new ServerRule(atRulePrelude, selectors);

        this.rules.push(rule);

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
        this.map = null;
        this.col.destroy(this);
    }

    toString() {
        let rawCss = '';

        for (let i = 0; i < this.rules.length; i++) rawCss += this.rules[i].toString();

        return rawCss;
    }
}
