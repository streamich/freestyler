import {TDeclarations} from './toStylesheet';

/**
 * Converts a list of CSS declartions into a valid CSS string.
 * @param {string} selector Rule selector.
 * @param {Array} declarations
 * @returns {string}
 */
const toCssDeclarations: (declarations: TDeclarations) => string = declarations => {
    let css = '';

    if (process.env.NODE_ENV === 'production') {
        for (let j = 0; j < declarations.length; j++) {
            const [property, value] = declarations[j];
            css += property + ':' + value + ';';
        }
    } else {
        for (let j = 0; j < declarations.length; j++) {
            const [property, value] = declarations[j];
            css += '    ' + property + ': ' + value + ';\n';
        }
    }

    return css;
};

export default toCssDeclarations;
