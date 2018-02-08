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
    let css = selector + '{' + toCssDeclarations(declarations) + '}';
    if (atRulePrelude) css = `${atRulePrelude}{${css}}`;
    return css;
};

export default toCssRule;
