import {TAtrulePrelude, TDeclarations, TProperty, TPseudo, TSelectors, TValue} from '../ast/toStylesheet';
import memoizer from './memoizer';
import SCOPE_SENTINEL from '../util/sentinel';
import createStyleElement from '../util/createStyleElement';

class VSheet {
    sheet: CSSStyleSheet;
    memo = memoizer();

    // Used only in development mode;
    private node;

    constructor() {
        const node = createStyleElement();
        this.sheet = node.sheet as CSSStyleSheet;

        if (process.env.NODE_ENV !== 'production') {
            this.node = node;
        }
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
        const idString = idNumber.toString(36);

        if (this.memo.length > length) {
            let selector = selectorTemplate.replace(SCOPE_SENTINEL, '.' + idString);
            this.inject(atRulePrelude, selector, rawDeclarations);
        }

        return idString;
    }

    inject(atRulePrelude: TAtrulePrelude, selectors: string, rawDeclarations: string) {
        const {sheet} = this;
        let ruleStr = `${selectors}{${rawDeclarations}}`;
        if (atRulePrelude) {
            ruleStr = `${atRulePrelude}{${ruleStr}}`;
        }

        if (process.env.NODE_ENV === 'production') {
            sheet.insertRule(ruleStr, sheet.cssRules.length);
        } else {
            try {
                const {innerText} = this.node;

                // We use `insertRule` here just to see if it throws. If it
                // throws, we will show the error in development mode.
                sheet.insertRule(ruleStr, sheet.cssRules.length);

                this.node.innerText = innerText + ' ' + ruleStr;
            } catch (error) {
                console.warn('Error inserting CSS rule: ' + ruleStr);
                console.error(error);
            }
        }
    }
}

export default VSheet;
