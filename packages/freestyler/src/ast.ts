import atoms from './atoms';

export type TStyles = object;

export type TAtrulePrelude = string;
export type TSelectors = string;
export type TProperty = string;
export type TValue = string | number;

export type TDeclaration = [TProperty, TValue];
export type TDeclarations = TDeclaration[];
export type TRule = [TSelectors, TDeclarations];
export type TRules = TRule[];
export type TAtrule = {
    type: 'Atrule';
    prelude: TAtrulePrelude;
    rules: TRules;
};
export type TStyleSheet = (TRule | TAtrule)[];

const isArray = Array.isArray;
export const isRule: (rule: TRule | TAtrule) => boolean = rule => isArray(rule);

export function toStyleSheet(pojso: TStyles): TStyleSheet {
    let stylesheet = [];
    for (let selector in pojso) {
        let styles = pojso[selector];

        // Atrule: @media, @keyframe, ...
        if (selector[0] === '@') {
            stylesheet.push({
                type: 'Atrule',
                prelude: selector,
                rules: toStyleSheet(styles),
            });
            continue;
        }

        // prettier-ignore
        ((styles) => {
            const selectors = selector.split(',');

            if (!isArray(styles)) styles = [styles];

            var statements = [];
            var block = [selector, statements];
            stylesheet.push(block);
            for (let i = 0; i < styles.length; i++) {
                const st = styles[i];
                for (let prop in st) {
                    const declaration = st[prop];
                    switch (typeof declaration) {
                        case 'string':
                        case 'number':
                            prop = atoms[prop] || prop;
                            statements.push([prop, declaration]);
                            break;
                        case 'object':
                            var props = prop.split(',');
                            var selector_list = [];

                            for (var p of props) {
                                if (p.indexOf('&') > -1) {
                                    for (var sel of selectors) {
                                        selector_list.push(p.replace('&', sel));
                                    }
                                } else {
                                    for (var sel of selectors) {
                                        selector_list.push(sel + ' ' + p);
                                    }
                                }
                            }

                            var selectors_combined = selector_list.join(',');
                            var innerpojo = {[selectors_combined]: declaration};
                            stylesheet = stylesheet.concat(
                                toStyleSheet(innerpojo)
                            );
                            break;
                    }
                }
            }
        })(styles);
    }

    return stylesheet;
}

export function toCss(stylesheet: TStyleSheet): string {
    const blockStrings = [];
    for (let i = 0; i < stylesheet.length; i++) {
        if (stylesheet.length) {
            const rule = stylesheet[i];
            if (isRule(rule)) {
                // TRule
                const [selector, rules] = rule as TRule;
                const ruleStrings = [];
                for (let j = 0; j < rules.length; j++) {
                    const [key, value] = rules[j];
                    ruleStrings.push(key + ':' + value);
                }
                if (ruleStrings.length)
                    blockStrings.push(
                        selector + '{' + ruleStrings.join(';') + '}'
                    );
            } else {
                // TAtrule
                const {prelude, rules} = rule as TAtrule;
                blockStrings.push(prelude + '{' + toCss(rules) + '}');
            }
        }
    }
    return blockStrings.join('');
}
