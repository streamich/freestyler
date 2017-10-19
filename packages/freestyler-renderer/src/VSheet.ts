import {TAtrulePrelude, TDeclarations, TProperty, TPseudo, TSelectors, TValue} from './ast/toStylesheet';
import SCOPE_SENTINEL from './sentinel';
import createStyleElement from './util/createStyleElement';

export interface Imemoizer {
    length: number;
    next: () => number;
    getId: (atRulePrelude: string, selectorTemplate: string, property: string, value: string) => number;
}

export type TValueCache = {[value: string]: number};
export type TPropertyCache = {[property: string]: TValueCache};
export type TSelectorTemplateCache = {[selectorTemplate: string]: TPropertyCache};
export type TAtruleCache = {[atRulePrelude: string]: TSelectorTemplateCache};

export const memoizer: () => Imemoizer = () => {
    let offset = 10;
    let msb = 35;
    let power = 1;
    let cache: TAtruleCache = {};

    const self = {
        length: 0,
        next: () => {
            const vcount = self.length + offset;
            if (vcount === msb) {
                offset += (msb + 1) * 9;
                msb = Math.pow(36, ++power) - 1;
            }
            self.length++;
            return vcount;
        },
        getId: (atRulePrelude: string, selectorTemplate: string, property: string, value: string) => {
            atRulePrelude = atRulePrelude || '_';

            let selectorTemplates = cache[atRulePrelude];
            if (!selectorTemplates) selectorTemplates = cache[atRulePrelude] = {};

            let properties = selectorTemplates[selectorTemplate];
            if (!properties) properties = selectorTemplates[selectorTemplate] = {};

            let values = properties[property];
            if (!values) values = properties[property] = {};

            let id = values[value];
            if (!id) id = values[value] = self.next();

            return id;
        },
    };

    return self;
};

class VSheet {
    style;
    memo = memoizer();

    constructor() {
        this.style = createStyleElement();
    }

    insert(atRulePrelude: TAtrulePrelude, selectorTemplate: string, prop: TProperty, value: TValue): string {
        const rawDeclarations = prop + ':' + value;
        return this.insertRaw(atRulePrelude, selectorTemplate, prop, value, rawDeclarations);
    }

    insertBatch(atRulePrelude: TAtrulePrelude, selectorTemplate: string, declarations: TDeclarations): string {
        let rawDeclarations = '';
        let propIdentifier = '';
        let valueIdentifier = '';
        for (let i = 0; i < declarations.length; i++) {
            const [prop, value] = declarations[i];
            rawDeclarations += prop + ':' + value + ';';
            propIdentifier += prop;
            valueIdentifier += value;
        }
        return this.insertRaw(atRulePrelude, selectorTemplate, propIdentifier, valueIdentifier, rawDeclarations);
    }

    insertRaw(
        atRulePrelude: TAtrulePrelude,
        selectorTemplate: string,
        propIdentifier: string,
        valueIdentifier: string,
        rawDeclarations: string
    ): string {
        const {length} = this.memo;
        const idNumber = this.memo.getId(atRulePrelude, selectorTemplate, propIdentifier, valueIdentifier);
        const idString = idNumber.toString(36);

        if (this.memo.length > length) {
            let selector = selectorTemplate.replace(SCOPE_SENTINEL, '.' + idString);
            this.inject(atRulePrelude, selector, rawDeclarations);
        }

        return idString;
    }

    inject(atRulePrelude: TAtrulePrelude, selectors: string, rawDeclarations: string) {
        const {sheet} = this.style;
        let ruleStr = `${selectors}{${rawDeclarations}}`;
        if (atRulePrelude) ruleStr = `${atRulePrelude}{${ruleStr}}`;
        sheet.insertRule(ruleStr, sheet.cssRules.length);
    }
}

export default VSheet;
