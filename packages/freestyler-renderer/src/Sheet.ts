import createStyleElement from './util/createStyleElement';
import getById from './util/getById';
import removeDomElement from './util/removeDomElement';

class Sheet {
    put(id: string, rawRule: string) {
        let styleElement = getById(id) as HTMLStyleElement;

        if (!styleElement) {
            styleElement = createStyleElement();
            styleElement.id = id;
        }

        if ((styleElement as any)._iT !== rawRule) {
            (styleElement as any)._iT = rawRule;

            if (process.env.NODE_ENV !== 'production') {
                const sheet = styleElement.sheet as any;
                if (sheet.cssRules.length) {
                    sheet.deleteRule(0);
                }
                sheet.insertRule(rawRule, 0);
            } else {
                styleElement.innerText = rawRule;
            }
        }
    }

    remove(id: string) {
        const styleElement = getById(id);
        if (styleElement) removeDomElement(id);
    }
}

export default Sheet;
