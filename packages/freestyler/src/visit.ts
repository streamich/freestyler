import {isRule, TAtrule, TDeclaration, TRule, TRules, TStyleSheet} from './ast';

export type TAtruleVisit = (atrule?: TAtrule) => TAtrule;
export type TRuleVisit = (rule: TRule, atrule?: TAtrule) => TRule;
export type TDeclarationVisit = (
    declaration: TDeclaration,
    rule: TRule,
    atrule?: TAtrule
) => TDeclaration;
export type TVisitor = {
    atrule?: TAtruleVisit;
    rule?: TRuleVisit;
    decl?: TDeclarationVisit;
};

const passthrough = a => a;

export const visitRule = (rule: TRule, atrule: TAtrule, visitor: TVisitor) => {
    if (visitor.decl) {
        const [selectors, declarations] = rule;
        for (let i = 0; i < declarations.length; i++) {
            const declaration = declarations[i];
            declarations[i] = visitor.decl(declaration, rule);
        }
    }

    if (visitor.rule) {
        rule = visitor.rule(rule);
    }

    return rule;
};

export const visitAtrule = (atrule: TAtrule, visitor: TVisitor) => {
    atrule.rules = visitRules(atrule.rules, atrule, visitor) as TRules;
    atrule = (visitor.atrule || passthrough)(atrule);
    return atrule;
};

const visitRules = (
    stylesheet: TStyleSheet,
    atrule: TAtrule,
    visitor: TVisitor
) => {
    for (let i = 0; i < stylesheet.length; i++) {
        const rule = stylesheet[i];
        if (isRule(rule)) {
            // Rule
            stylesheet[i] = visitRule(rule as TRule, null, visitor);
        } else {
            // Atrule
            stylesheet[i] = visitAtrule(rule as TAtrule, visitor);
        }
    }
    return stylesheet;
};

export const visit = (stylesheet: TStyleSheet, visitor: TVisitor) =>
    visitRules(stylesheet, null, visitor);
