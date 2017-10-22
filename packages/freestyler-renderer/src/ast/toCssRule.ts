import {TAtrule, TRule, TDeclarations} from './toStylesheet';

/**
 * Converts simple CSS rule into CSS string.
 * @param {string} selector Rule selector.
 * @param {Array} declarations 
 * @returns {string}
 */
const toCssRule: (selector: string, declarations: TDeclarations) => string = (selector, declarations) => {
    let css = selector + '{';

    for (let j = 0; j < declarations.length; j++) {
        const [property, value] = declarations[j];
        css += property + ':' + value + ';';
    }

    return css + '}';
};

export default toCssRule;
