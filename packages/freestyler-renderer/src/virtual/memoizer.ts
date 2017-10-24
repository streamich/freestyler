export interface Imemoizer {
    length: number;
    next: () => number;
    getId: (atRulePrelude: string, selectorTemplate: string, property: string, value: string) => number;
}

export type TValueCache = {[value: string]: number};
export type TPropertyCache = {[property: string]: TValueCache};
export type TSelectorTemplateCache = {[selectorTemplate: string]: TPropertyCache};
export type TAtruleCache = {[atRulePrelude: string]: TSelectorTemplateCache};

const memoizer: () => Imemoizer = () => {
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

export default memoizer;
