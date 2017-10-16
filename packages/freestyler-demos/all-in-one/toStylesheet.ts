import {TStyles, TStyleSheet} from '../../freestyler/src/ast';
import atoms from '../../freestyler/src/atoms';
import {toStyleSheet} from '../../freestyler/src/ast';

const isArray = Array.isArray;

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

export default function toStyleSheet2(pojso: TStyles): TStyleSheet {
    let stylesheet = [];
    for (let selector in pojso) {
        let values = pojso[selector];

        // Atrule: @media, @keyframe, ...
        if (selector[0] === '@') {
            stylesheet.push({
                type: 'Atrule',
                prelude: selector,
                rules: toStyleSheet2(values),
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
                    prop = atoms[prop] || prop;
                    declarations.push([prop, value]);
                    break;
                case 'object': {
                    let selectorsInterpolated =
                        selectors.length > 1 ? interpolateSelectors(prop, selectors) : prop.replace('&', selector);
                    stylesheet = stylesheet.concat(toStyleSheet2({[selectorsInterpolated]: value}));
                    break;
                }
            }
        }
    }

    return stylesheet;
}

const styles = {
    '.className,.lol': {
        col: 'red',
        'font-size': '20px',
        bg: 'yellow',
        pos: 'absolute',
        cur: 'pointer',
        '&:hover': {
            col: 'blue',
        },
    },
};

let time = Date.now();

let res = {};
for (let i = 0; i < 100000; i++) {
    res = toStyleSheet2(styles);
}

console.log(Date.now() - time);
console.log(res);
