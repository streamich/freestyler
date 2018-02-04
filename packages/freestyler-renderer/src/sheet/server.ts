import createStyleElement from '../util/createStyleElement';
import removeDomElement from '../util/removeDomElement';
import {TAtrulePrelude, TSelectors, TDeclarations} from '../ast/toStylesheet';

type TMapBySelectors = {[selectors: string]: ServerRule};
type TMapByAtRulePrelude = {[atRulePrelude: string]: TMapBySelectors};

export class ServerRule {
    name: string; // Class name.
    atRule: string;
    selectors: string;
    decl: TDeclarations = null;

    constructor(name: string, atRulePrelude: string, selectors: string) {
        this.name = name;
        this.atRule = atRulePrelude;
        this.selectors = selectors;
    }

    put(declarations: TDeclarations) {
        this.decl = declarations;
    }

    trunc() {
        this.decl = null;
    }
}

export class ServerSheet {
    map: TMapBySelectors | TMapByAtRulePrelude = {};

    constructor() {
        sheets.add(this);
    }

    get(atRulePrelude: TAtrulePrelude, selectors: TSelectors): ServerRule {
        const {map} = this;

        return !atRulePrelude ? map[selectors] as ServerRule : map[atRulePrelude] && map[atRulePrelude][selectors];
    }

    add(atRulePrelude: TAtrulePrelude, selectors: string): ServerRule {
        const rule = new ServerRule(name, atRulePrelude, selectors);

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
        sheets.sheets = sheets.sheets.filter(sheet => sheet !== this);
    }
}

export class ServerSheetCollection {
    sheets: ServerSheet[] = [];

    add(sheet: ServerSheet) {
        this.sheets.push(sheet);
    }

    toString() {}
}

export let sheets: ServerSheetCollection = null;

export const createNewCollection = () => {
    sheets = new ServerSheetCollection();

    return sheets;
};
