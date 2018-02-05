import {TAtrule, TRule, TStyleSheet} from './toStylesheet';
import toCssRule from './toCssRule';

const isArray = Array.isArray;
export const isRule: (rule: TRule | TAtrule) => boolean = rule => isArray(rule);

/**
 * Converts internal "stylesheet" AST representation to CSS string.
 * @param {TStyleSheet} stylesheet
 * @returns {string}
 */
const toCss: (stylesheet: TStyleSheet) => string = stylesheet => {
    let css = '';
    let rule;

    for (let i = 0; i < stylesheet.length; i++) {
        if (stylesheet.length) {
            rule = stylesheet[i];
            if (isRule(rule)) {
                // TRule
                css += toCssRule(rule[0], rule[1]);
            } else {
                // TAtrule
                const {prelude, rules} = rule as TAtrule;
                css += prelude + '{' + toCss(rules) + '}';
            }
        }
    }

    return css;
};

export default toCss;
