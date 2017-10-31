import {TAtrule, TRule, TDeclarations} from './toStylesheet';
import toCssDeclarations from './toCssDeclarations';

/**
 * Converts simple CSS rule into CSS string.
 * @param {string} selector Rule selector.
 * @param {Array} declarations
 * @returns {string}
 */
const toCssRule: (selector: string, declarations: TDeclarations) => string = (selector, declarations) => {
    return selector + '{' + toCssDeclarations(declarations) + '}';
};

export default toCssRule;
