import {TAtrule, TRule, TStyleSheet} from './toStylesheet';

const isArray = Array.isArray;
export const isRule: (rule: TRule | TAtrule) => boolean = rule => isArray(rule);

/**
 * Converts internal "stylesheet" AST representation to CSS string.
 * @param {TStyleSheet} stylesheet
 * @returns {string}
 */
const toCss: (stylesheet: TStyleSheet) => string = stylesheet => {
    let css = '';

    for (let i = 0; i < stylesheet.length; i++) {
        if (stylesheet.length) {
            const rule = stylesheet[i];
            if (isRule(rule)) {
                // TRule
                const [selector, rules] = rule as TRule;
                let ruleStrings = '{';
                for (let j = 0; j < rules.length; j++) {
                    const [key, value] = rules[j];
                    ruleStrings += key + ':' + value + ';';
                }
                if (ruleStrings.length) css += selector + ruleStrings + '}';
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
