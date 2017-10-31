import {TRule, TAtrule, TAtrulePrelude} from '../ast/toStylesheet';
import {isRule} from '../ast/toCss';
import renderCacheableRule from './renderCacheableRule';

export type TRenderCacheableSheet = (
    rules: (TRule | TAtrule)[],
    atRulePrelude: TAtrulePrelude,
    onInfiniteDeclarations
) => string;

const renderCacheableSheet: TRenderCacheableSheet = (rules, atRulePrelude, onInfiniteDeclarations) => {
    let classNames = '';

    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        if (isRule(rule)) {
            // TRule
            const [moreClassNames, infiniteCardinalityDeclarations] = renderCacheableRule(rule as TRule, atRulePrelude);
            classNames += moreClassNames;
            if (infiniteCardinalityDeclarations.length) {
                onInfiniteDeclarations(atRulePrelude, rule[0], infiniteCardinalityDeclarations);
            }
        } else {
            // TAtrule
            const atrule = rule as TAtrule;
            classNames += renderCacheableSheet(atrule.rules, atrule.prelude, onInfiniteDeclarations);
        }
    }

    return classNames;
};

export default renderCacheableSheet;
