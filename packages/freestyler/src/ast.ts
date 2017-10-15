import {kebabCase} from 'freestyler-util';
import atoms from './atoms';

export type TStyles = object;

export type TAtrulePrelude = string;
export type TSelectors = string;
export type TPseudo = string; // `:hover` part of the selector
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

const interpolateSelectors = (prop, selectors) => {
    let props = prop.split(',');
    let selectorList = [];

    for (var p of props) {
        if (p.indexOf('&') > -1) {
            for (var sel of selectors) {
                selectorList.push(p.replace('&', sel));
            }
        } else {
            for (var sel of selectors) {
                selectorList.push(sel + ' ' + p);
            }
        }
    }
    return selectorList.join(',');
};

export function toStyleSheet(pojso: TStyles): TStyleSheet {
    let stylesheet = [];
    for (let selector in pojso) {
        let values = pojso[selector];

        // Atrule: @media, @keyframe, ...
        if (selector[0] === '@') {
            stylesheet.push({
                type: 'Atrule',
                prelude: selector,
                rules: toStyleSheet(values),
            });
            continue;
        }

        const selectors = selector.split(',');
        let styles = values;

        const declarations = [];
        const rule = [selector, declarations];
        stylesheet.push(rule);
        for (let prop in styles) {
            const value = styles[prop];
            switch (typeof value) {
                case 'string':
                case 'number':
                    prop = atoms[prop] || kebabCase(prop);
                    declarations.push([prop, value]);
                    break;
                case 'object': {
                    let selectorsInterpolated =
                        selectors.length > 1
                            ? interpolateSelectors(prop, selectors)
                            : prop.replace('&', selector);
                    stylesheet = stylesheet.concat(
                        toStyleSheet({[selectorsInterpolated]: value})
                    );
                    break;
                }
            }
        }
    }

    return stylesheet;
}

export function toCss(stylesheet: TStyleSheet): string {
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
}
