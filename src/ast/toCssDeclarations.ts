import {TDeclarations} from './toStylesheet';

/**
 * Converts a list of CSS declartions into a valid CSS string.
 * @param {string} selector Rule selector.
 * @param {Array} declarations
 * @returns {string}
 */
const toCssDeclarations: (declarations: TDeclarations, important?) => string = (declarations, important?) => {
    let css = '';

    if (declarations) {
        if (process.env.NODE_ENV === 'production') {
            for (let j = 0; j < declarations.length; j++) {
                const [property, value] = declarations[j];
                css += property + ':' + value + (important ? ' !important' : '') + ';';
            }
        } else {
            for (let j = 0; j < declarations.length; j++) {
                const [property, value] = declarations[j];
                css += '    ' + property + ': ' + value + (important ? ' !important' : '') + ';\n';
            }
        }
    }

    return css;
};

export default toCssDeclarations;
