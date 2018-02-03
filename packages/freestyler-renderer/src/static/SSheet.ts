import createStyleElement from '../util/createStyleElement';
import removeDomElement from '../util/removeDomElement';
import {TAtrulePrelude, TSelectors, TDeclarations} from '../ast/toStylesheet';
import applyDeclarationsToCssStyleDeclaration from '../util/applyDeclarationsToCssStyleDeclaration';

const sheets: {[id: string]: HTMLStyleElement} = {};

class SSheet {
    set(id: string, atRulePrelude: TAtrulePrelude, selectors: TSelectors, declarations: TDeclarations) {
        let styleElement = sheets[id] as HTMLStyleElement;

        if (!styleElement) {
            styleElement = createStyleElement();
            styleElement.id = id;
        }

        const sheet = styleElement.sheet as CSSStyleSheet;
        const {cssRules} = sheet;

        if (!cssRules.length) {
            let emptyRawRule;
            if (atRulePrelude) {
                emptyRawRule = `${atRulePrelude}{${selectors}{}}`;
            } else {
                emptyRawRule = `${selectors}{}`;
            }
            sheet.insertRule(emptyRawRule, 0);
        }

        // TODO: Benchmark `rules[0]` vs `rules.item(0)`.
        const style = (cssRules[0] as CSSStyleRule).style;
        applyDeclarationsToCssStyleDeclaration(style, declarations);
    }

    remove(id: string) {
        const styleElement = sheets[id];

        if (styleElement) {
            delete sheets[id];
            removeDomElement(styleElement);
        }
    }
}

export default SSheet;
