import SheetManager from './SheetManager';
import {ClientSheet} from './client';
import {TAtrulePrelude, TSelectors, TDeclarations} from '../ast/toStylesheet';

export class StaticSheet {
    man: SheetManager;
    byId: {[id: string]: ClientSheet} = {};

    constructor(manager: SheetManager) {
        this.man = manager;
    }

    set(
        id: string,
        atRulePrelude: TAtrulePrelude,
        selectors: TSelectors,
        declarations: TDeclarations,
        important?: boolean
    ) {
        let sheet = this.byId[id];

        if (!sheet) {
            sheet = this.man.create();
            sheet.add(atRulePrelude, selectors, declarations, important);
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

export default StaticSheet;
