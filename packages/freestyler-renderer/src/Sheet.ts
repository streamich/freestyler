import createStyleElement from './util/createStyleElement';
import getById from './util/getById';
import removeDomElement from './util/removeDomElement';
import {TAtrulePrelude, TSelectors, TDeclarations} from './ast/toStylesheet';

class Sheet {
    set(id: string, atRulePrelude: TAtrulePrelude, selectors: TSelectors, declarations: TDeclarations) {
        let styleElement = getById(id) as HTMLStyleElement;

        if (!styleElement) {
            styleElement = createStyleElement();
            styleElement.id = id;
        }

        const sheet = styleElement.sheet as CSSStyleSheet;
        const {rules} = sheet;

        if (!rules.length) {
            let emptyRawRule;
            if (atRulePrelude) {
                emptyRawRule = `${atRulePrelude}{${selectors}{}}`;
            } else {
                emptyRawRule = `${selectors}{}`;
            }
            sheet.insertRule(emptyRawRule, 0);
        }

        console.log(atRulePrelude, sheet.rules);

        // TODO: Benchmark `rules[0]` vs `rules.item(0)`.
        const style = (rules[0] as CSSStyleRule).style;
        const len = declarations.length;
        for (let i = 0; i < len; i++) {
            const [prop, value] = declarations[i];
            style.setProperty(prop, value);
        }
    }

    put(id: string, rawRule: string) {
        let styleElement = getById(id) as HTMLStyleElement;

        if (!styleElement) {
            styleElement = createStyleElement();
            styleElement.id = id;
        }

        // `_iT` - innerText cache.
        if ((styleElement as any)._iT !== rawRule) {
            (styleElement as any)._iT = rawRule;

            if (process.env.NODE_ENV === 'production') {
                const sheet = styleElement.sheet as any;
                // if (sheet.cssRules.length) {
                // sheet.deleteRule(0);
                // }
                // sheet.insertRule(rawRule, 0);
                if (!sheet.cssRules.length) {
                    sheet.insertRule(rawRule, 0);
                }
            } else {
                styleElement.innerText = rawRule;
            }
        }
    }

    remove(id: string) {
        const styleElement = getById(id);
        if (styleElement) removeDomElement(styleElement);
    }
}

export default Sheet;
