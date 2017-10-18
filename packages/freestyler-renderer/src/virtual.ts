import {TAtrulePrelude, TDeclarations, TProperty, TPseudo, TSelectors, TValue} from './ast/toStylesheet';

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

export class VSheet {
    style;
    memo = memoizer();

    constructor() {
        const style = document.createElement('style');
        document.head.appendChild(style);
        this.style = style;
    }

    insert(atRulePrelude: TAtrulePrelude, selectorTemplate: string, prop: TProperty, value: TValue) {}

    insertRaw(
        atRulePrelude: TAtrulePrelude,
        selectorTemplate: string,
        prop: TProperty,
        value: TValue,
        rawDeclarations: string
    ): string {
        const {length} = this.memo;
        const idNumber = this.memo.getId(atRulePrelude, selectorTemplate, prop, value);
        const idString = idNumber.toString(36);

        if (this.memo.length > length) {
            let selector = selectorTemplate.replace('~', '.' + idString);
            this.inject(atRulePrelude, selector, rawDeclarations);
        }

        return idString;
    }

    getId(media: TAtrulePrelude, pseudo: TPseudo, prop: TProperty, value: TValue) {
        const rawRule = prop + ':' + value;
        return this.getIdRaw(prop, String(value), media, pseudo, rawRule);
    }

    getIdBatch(media: TAtrulePrelude, pseudo: TPseudo, decls: TDeclarations) {
        const rawRule = decls.map(([prop, value]) => prop + ':' + value).join(';');
        return this.getIdRaw(rawRule, '', media, pseudo, rawRule);
    }

    getIdRaw(key: string, value: string, media: TAtrulePrelude, pseudo: TPseudo, rawRule: string) {
        const {length} = this.memo;
        const id = this.memo.getId(key, value);
        const className = id.toString(36);
        if (this.memo.length > length) {
            this.inject(media, pseudo, `.${className},[data-css-${className}]`, rawRule);
        }
        return className;
    }

    inject(media: TAtrulePrelude, pseudo: TPseudo, selectors: TSelectors, data: string) {
        const {sheet} = this.style;
        let ruleStr = `${selectors}${pseudo ? ':' + pseudo : ''}{${data}}`;
        // if (media) {
        //     ruleStr = `${media}{${ruleStr}}`;
        // }
        sheet.insertRule(ruleStr, sheet.cssRules.length);
    }
}
