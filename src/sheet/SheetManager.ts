import CacheSheet from './CacheSheet';
import StaticSheet from './StaticSheet';
import {ClientSheet} from './client';
import {Sheet} from './isomorphic';
import {isClient} from '../util';
import createStyleElement from '../client/createStyleElement';

export class SheetManager {
    sheets: ClientSheet[] = [];
    global = this.create();
    cache = new CacheSheet(this.create());
    stat = new StaticSheet(this);
    raw: string = '';

    create() {
        const sheet = new Sheet();

        this.sheets.push(sheet);

        return sheet;
    }

    destroy(sheet) {
        this.sheets = this.sheets.filter(s => sheet !== s);
        sheet.destroy();
    }

    injectRaw(rawCss: string, id?: string) {
        if (isClient) {
            const style = createStyleElement();
            style.innerText = rawCss;

            if (process.env.NODE_ENV !== 'production') {
                style.id = id;
            }
        } else {
            this.raw += rawCss;
        }
    }

    toString(): string {
        const {sheets} = this;
        let rawCss = this.raw;

        for (let i = 0; i < sheets.length; i++) {
            rawCss += sheets[i].toString();
        }

        return rawCss;
    }
}

export default SheetManager;
