import CacheSheet from './CacheSheet';
import StaticSheet from './StaticSheet';
import {ClientSheet} from './client';
import {Sheet} from './isomorphic';

export class SheetManager {
    sheets: ClientSheet[] = [];
    cache = new CacheSheet(this.create());
    stat = new StaticSheet(this);

    create() {
        const sheet = new Sheet();

        this.sheets.push(sheet);

        return sheet;
    }

    destroy(sheet) {
        this.sheets = this.sheets.filter(s => sheet !== s);
        sheet.destroy();
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

export default SheetManager;
