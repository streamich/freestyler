import toStyleSheet, {TStyles, TStyleSheet, TAtrule} from '../ast/toStylesheet';
import {IStyles} from '../types';
import SCOPE_SENTINEL from '../util/sentinel';
import renderCacheableSheet from './renderCacheableSheet';
import toCss from '../ast/toCss';

const combineIntoStylesheet = (stylesheet: TStyleSheet, className: string) => {
    const dottedClassName = '.' + className;
    return (prelude, selectorTemplate, declarations) => {
        const selector = selectorTemplate.replace(SCOPE_SENTINEL, dottedClassName);
        if (prelude) {
            stylesheet.push({
                prelude,
                rules: [[selector, declarations]],
            } as TAtrule);
        } else {
            stylesheet.push([selector, declarations]);
        }
    };
};

/**
 * Renders cacheable declarations (low and high cardinality); returns
 * class names for those declarations, also returns raw CSS string
 * for the infinite cardinality declarations.
 * @param styles
 */
const renderCacheableAndGetInfCss: (stylesheet: TStyleSheet, className: string) => [string, string] = (
    stylesheet,
    className
) => {
    const remainingStylesheet: TStyleSheet = [];
    const onInfCardDeclaration = combineIntoStylesheet(remainingStylesheet, className);
    const classNames = renderCacheableSheet(stylesheet, '', onInfCardDeclaration);
    const css = toCss(remainingStylesheet);

    return [classNames, css];
};

export default renderCacheableAndGetInfCss;
