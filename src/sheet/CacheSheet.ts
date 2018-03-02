import {TAtrulePrelude, TDeclarations, TProperty, TPseudo, TSelectors, TValue} from '../ast/toStylesheet';
import memoizer from './memoizer';
import SCOPE_SENTINEL from '../renderer/util/sentinel';
import {ClientSheet} from './client';

// CacheSheet - rules rendered in cache sheet never move again.
class CacheSheet {
    sheet: ClientSheet;
    memo = memoizer();

    constructor(sheet: ClientSheet) {
        this.sheet = sheet;
    }

    insert(atRulePrelude: TAtrulePrelude, selectorTemplate: string, prop: TProperty, value: TValue): string {
        return this.insertRaw(atRulePrelude, selectorTemplate, prop, value, [[prop, value]]);
    }

    insertBatch(atRulePrelude: TAtrulePrelude, selectorTemplate: string, declarations: TDeclarations): string {
        let rawDeclarations = '';
        let propIdentifier = '';
        let valueIdentifier = '';
        for (let i = 0; i < declarations.length; i++) {
            const [prop, value] = declarations[i];
            propIdentifier += prop;
            valueIdentifier += value;
        }
        return this.insertRaw(atRulePrelude, selectorTemplate, propIdentifier, valueIdentifier, declarations);
    }

    insertRaw(
        atRulePrelude: TAtrulePrelude,
        selectorTemplate: string,
        propIdentifier: string,
        valueIdentifier: string,
        declarations: TDeclarations
    ): string {
        const {length} = this.memo;
        const idNumber = this.memo.getId(atRulePrelude, selectorTemplate, propIdentifier, valueIdentifier);
        const idString = require('../renderer').default.prefix + idNumber.toString(36);

        if (this.memo.length > length) {
            let selector = selectorTemplate.replace(SCOPE_SENTINEL, '.' + idString);
            this.sheet.add(atRulePrelude, selector, declarations);
        }

        return idString;
    }
}

export default CacheSheet;
