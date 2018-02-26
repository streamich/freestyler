import {TAtrule, TAtrulePrelude, TRule, TDeclarations} from './toStylesheet';
import toCssDeclarations from './toCssDeclarations';

/**
 * Converts simple CSS rule into CSS string.
 * @param {string} selector Rule selector.
 * @param {Array} declarations
 * @returns {string}
 */
const toCssRule: (selector: string, declarations: TDeclarations, atRulePrelude?: TAtrulePrelude) => string = (
    selector,
    declarations,
    atRulePrelude
) => {
    let css;

    if (process.env.NODE_ENV === 'production') {
        css = selector + '{' + toCssDeclarations(declarations) + '}';
    } else {
        css = selector + ' {\n' + toCssDeclarations(declarations) + '}\n';
    }

    if (atRulePrelude) {
        if (process.env.NODE_ENV === 'production') {
            css = `${atRulePrelude}{${css}}`;
        } else {
            css = `${atRulePrelude}{\n${css}}\n`;
        }
    }
    return css;
};

export default toCssRule;
