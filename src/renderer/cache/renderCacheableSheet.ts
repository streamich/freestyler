import {TRule, TAtrule, TAtrulePrelude, TDeclarations} from '../../ast/toStylesheet';
import {isRule} from '../../ast/toCss';
import renderCacheableRule from './renderCacheableRule';
import SCOPE_SENTINEL from '../util/sentinel';

export type TRenderCacheableSheet = (
    rules: (TRule | TAtrule)[],
    atRulePrelude: TAtrulePrelude,
    onNonCacheableDeclarations: (atRulePrelude: TAtrulePrelude, selectors: string, declarations: TDeclarations) => void
) => string;

const renderCacheableSheet: TRenderCacheableSheet = (rules, atRulePrelude, onNonCacheableDeclarations) => {
    let classNames = '';

    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        if (isRule(rule)) {
            // TRule
            const selectors = rule[0];
            const isCacheable = selectors.indexOf(SCOPE_SENTINEL) > -1;
            if (isCacheable) {
                const [moreClassNames, nonCacheableDeclarations] = renderCacheableRule(rule as TRule, atRulePrelude);
                classNames += moreClassNames;
                if (nonCacheableDeclarations.length) {
                    onNonCacheableDeclarations(atRulePrelude, selectors, nonCacheableDeclarations);
                }
            } else {
                onNonCacheableDeclarations(atRulePrelude, selectors, rule[1]);
            }
        } else {
            // TAtrule
            const atrule = rule as TAtrule;
            classNames += renderCacheableSheet(atrule.rules, atrule.prelude, onNonCacheableDeclarations);
        }
    }

    return classNames;
};

export default renderCacheableSheet;
