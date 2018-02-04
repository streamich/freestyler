import {Sheet} from './isomorphic';
import {ClientSheet} from './client';
import {TAtrulePrelude, TSelectors, TDeclarations} from '../ast/toStylesheet';

export class SSheet {
    byId: {[id: string]: ClientSheet} = {};

    set(id: string, atRulePrelude: TAtrulePrelude, selectors: TSelectors, declarations: TDeclarations) {
        let sheet = this.byId[id];

        if (!sheet) {
            sheet = new Sheet();
            sheet.add(atRulePrelude, selectors).put(declarations);
            this.byId[id] = sheet;
        }
    }

    remove(id: string) {
        const sheet = this.byId[id];

        if (sheet) {
            sheet.destroy();
            delete this.byId[id];
        }
    }
}

export default SSheet;
