import * as extend from 'fast-extend';

const REG_AT = /^@/;

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
        }
    }

    return global;
};
