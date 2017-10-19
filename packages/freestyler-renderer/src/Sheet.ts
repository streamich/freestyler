import createStyleElement from './util/createStyleElement';

class Sheet {
    style;

    constructor() {
        this.style = createStyleElement();
    }

    inject(rawCss: string) {
        const {sheet} = this.style;
        sheet.insertRule(rawCss, sheet.cssRules.length);
    }
}

export default Sheet;
