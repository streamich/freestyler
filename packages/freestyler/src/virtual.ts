import {
    TAtrulePrelude,
    TDeclarations,
    TProperty,
    TPseudo,
    TSelectors,
    TValue,
} from './ast';

export type TMemoizer = (key: string) => number;

export class Memoizer {
    length = 0;
    offset = 10;
    msb = 35;
    power = 1;
    data: {[key: string]: number} = {};

    next(): number {
        const vcount = this.length + this.offset;
        if (vcount === this.msb) {
            this.offset += (this.msb + 1) * 9;
            this.msb = Math.pow(36, ++this.power) - 1;
        }
        this.length++;
        return vcount;
    }

    getId(key: string): number {
        if (!this.data[key]) this.data[key] = this.next();
        return this.data[key];
    }
}

export class Declaration {
    prop: TProperty;
    value: TValue;
    pseudo: TPseudo;
    media: TAtrulePrelude;
    selectors: TSelectors;

    constructor(
        prop: TProperty,
        value: TValue,
        pseudo: TPseudo,
        media: TAtrulePrelude
    ) {
        this.prop = prop;
        this.value = value;
        this.pseudo = pseudo;
        this.media = media;
    }
}

export class DeclarationRaw {
    media: TAtrulePrelude;
    selectors: TSelectors;
    pseudo: TPseudo;
    data: string;

    constructor(
        media: TAtrulePrelude,
        selectors: TSelectors,
        pseudo: TPseudo,
        data: string
    ) {
        this.media = media;
        this.selectors = selectors;
        this.pseudo = pseudo;
        this.data = data;
    }
}

export class VSheet {
    style;
    memo = new Memoizer();

    constructor() {
        const style = document.createElement('style');
        document.head.appendChild(style);
        this.style = style;
    }

    getId(
        media: TAtrulePrelude,
        pseudo: TPseudo,
        prop: TProperty,
        value: TValue
    ) {
        const rawRule = prop + ':' + value;
        return this.getIdRaw(media, pseudo, rawRule);
    }

    getIdBatch(media: TAtrulePrelude, pseudo: TPseudo, decls: TDeclarations) {
        const rawRule = decls
            .map(([prop, value]) => prop + ':' + value)
            .join(';');
        return this.getIdRaw(media, pseudo, rawRule);
    }

    getIdRaw(media: TAtrulePrelude, pseudo: TPseudo, rawRule: string) {
        const {length} = this.memo;
        const id = this.memo.getId(`${media}|${pseudo}|${rawRule}`);
        const className = id.toString(36);
        if (this.memo.length > length) {
            this.inject(media, pseudo, '.' + className, rawRule);
        }
        return className;
    }

    inject(
        media: TAtrulePrelude,
        pseudo: TPseudo,
        selectors: TSelectors,
        data: string
    ) {
        const {sheet} = this.style;
        let ruleStr = `${selectors}${pseudo ? ':' + pseudo : ''}{${data}}`;
        if (media) {
            ruleStr = `${media}{${ruleStr}}`;
        }
        sheet.insertRule(ruleStr, sheet.cssRules.length);
    }
}
