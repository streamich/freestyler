import {TAtrulePrelude, TSelectors, TDeclarations} from '../ast/toStylesheet';
import toCssDeclarations from '../ast/toCssDeclarations';

type TMapBySelectors = {[selectors: string]: ServerRule};
type TMapByAtRulePrelude = {[atRulePrelude: string]: TMapBySelectors};

export class ServerRule {
    atRule: string;
    selectors: string;
    decl: TDeclarations = null;
    rawCss: string = '';
    rawRule: string = '';
    imp: boolean = false;

    constructor(atRulePrelude: string, selectors: string) {
        this.atRule = atRulePrelude;
        this.selectors = selectors;
    }

    put(declarations: TDeclarations, important: boolean = false) {
        this.decl = declarations;
        this.imp = important;
    }

    putRaw(rawCss: string) {
        this.rawCss = rawCss;
    }

    putRawRule(rawCssWithSelectors: string) {
        this.rawRule = rawCssWithSelectors;
    }

    trunc() {
        this.decl = null;
    }

    toString() {
        if (this.rawRule) {
            return this.rawRule;
        }

        let rawCss = this.rawCss || toCssDeclarations(this.decl, this.imp);

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

        return !atRulePrelude ? (map[selectors] as ServerRule) : map[atRulePrelude] && map[atRulePrelude][selectors];
    }

    add(
        atRulePrelude: TAtrulePrelude,
        selectors: string,
        declarations,
        important?: boolean,
        selectorTemplate?: string
    ): ServerRule {
        const rule = new ServerRule(atRulePrelude, selectors);

        this.rules.push(rule);

        rule.put(declarations, important);

        if (selectorTemplate) this.cache(atRulePrelude, selectorTemplate, rule);

        return rule;
    }

    cache(atRulePrelude: TAtrulePrelude, selectorTemplate: string, rule: ServerRule) {
        if (atRulePrelude) {
            if (!this.map[atRulePrelude]) {
                this.map[atRulePrelude] = {};
            }
            this.map[atRulePrelude][selectorTemplate] = rule;
        } else {
            this.map[selectorTemplate] = rule;
        }
    }

    addRaw(rawCss: string): ServerRule {
        const rule = new ServerRule('', '');

        rule.putRawRule(rawCss);
        this.rules.push(rule);

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
