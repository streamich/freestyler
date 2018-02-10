import {TAtrulePrelude, TDeclarations, TProperty, TPseudo, TSelectors, TValue} from '../ast/toStylesheet';
import memoizer from './memoizer';
import SCOPE_SENTINEL from '../renderer/util/sentinel';
import {ClientSheet} from './client';

const PREFIX = process.env.FREESTYLER_PREFIX || '';

// CacheSheet - rules rendered in cache sheet never move again.
class CacheSheet {
    sheet: ClientSheet;
    memo = memoizer();

    constructor(sheet: ClientSheet) {
        this.sheet = sheet;
    }

    insert(atRulePrelude: TAtrulePrelude, selectorTemplate: string, prop: TProperty, value: TValue): string {
        const rawDeclarations = prop + ':' + value;
        return this.insertRaw(atRulePrelude, selectorTemplate, prop, value, rawDeclarations);
    }

    insertBatch(atRulePrelude: TAtrulePrelude, selectorTemplate: string, declarations: TDeclarations): string {
        let rawDeclarations = '';
        let propIdentifier = '';
        let valueIdentifier = '';
        for (let i = 0; i < declarations.length; i++) {
            const [prop, value] = declarations[i];
            rawDeclarations += prop + ':' + value + ';';
            propIdentifier += prop;
            valueIdentifier += value;
        }
        return this.insertRaw(atRulePrelude, selectorTemplate, propIdentifier, valueIdentifier, rawDeclarations);
    }

    insertRaw(
        atRulePrelude: TAtrulePrelude,
        selectorTemplate: string,
        propIdentifier: string,
        valueIdentifier: string,
        rawDeclarations: string
    ): string {
        const {length} = this.memo;
        const idNumber = this.memo.getId(atRulePrelude, selectorTemplate, propIdentifier, valueIdentifier);
        const idString = PREFIX + idNumber.toString(36);

        if (this.memo.length > length) {
            let selector = selectorTemplate.replace(SCOPE_SENTINEL, '.' + idString);
            this.inject(atRulePrelude, selector, rawDeclarations);
        }

        return idString;
    }

    inject(atRulePrelude: TAtrulePrelude, selectors: string, rawDeclarations: string) {
        const rule = this.sheet.add(atRulePrelude, selectors);

        rule.putRaw(rawDeclarations);
    }
}

export default CacheSheet;
