import * as extend from 'fast-extend';

const REG_AT = /^@/;
const REG_UNDERSCORE = /^_/;
const REG_GLOBAL = /^:global/;

export default (styles, className: string) => {
    let global = {
        ['.' + className]: styles,
    };

    for (const rule in styles) {
        if (REG_AT.test(rule[0])) {
            global[rule] = {
                ['.' + className]: styles[rule],
            };
            delete styles[rule];
        } else if (REG_UNDERSCORE.test(rule) || REG_GLOBAL.test(rule)) {
            extend(global, ...styles[rule]);
            delete styles[rule];
        }
    }

    return global;
};
