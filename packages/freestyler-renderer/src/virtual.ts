import {TAtrulePrelude, TDeclarations, TProperty, TPseudo, TSelectors, TValue} from './ast/toStylesheet';

export interface Imemoizer {
    length: number;
    next: () => number;
    getId: (key: string, value: string) => number;
}

export const memoizer: () => Imemoizer = () => {
    let offset = 10;
    let msb = 35;
    let power = 1;
    let data: {[key: string]: {[key: string]: number}} = {};

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
        getId: (key, value) => {
            let keyCache = data[key];
            if (!keyCache) data[key] = keyCache = {};
            if (!keyCache[value]) keyCache[value] = self.next();

            return keyCache[value];
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
