import {Sheet} from './isomorphic';
import {CacheSheet} from './CacheSheet';
import SSheet from './SSheet';

export class SheetList {
    sheets;
    csheet;
    ssheet;

    constructor() {
        this.reset();
    }

    reset() {
        this.sheets = [];
        this.csheet = new CacheSheet(this);
        this.ssheet = new SSheet(this);
    }

    create() {
        const sheet = new Sheet(this);

        this.sheets.push(sheet);

        return sheet;
    }

    destroy(sheet) {
        this.sheets = this.sheets.filter(s => sheet !== s);
    }

    toString(): string {
        const {sheets} = this;
        let rawCss = '';

        for (let i = 0; i < sheets.length; i++) {
            rawCss += sheets[i].toString();
        }

        return rawCss;
    }
}

export const list = new SheetList();
