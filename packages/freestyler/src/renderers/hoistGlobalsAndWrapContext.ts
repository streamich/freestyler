import {TStyles} from '../ast';

export default (styles: TStyles, className: string) => {
    let global = {
        ['.' + className]: styles,
    };
    for (const rule in styles) {
        if (rule[0] === '@') {
            global[rule] = {
                ['.' + className]: styles[rule],
            };
            delete styles[rule];
        } else if (rule === '_' || rule === ':global') {
            global = {...global, ...styles[rule]};
            delete styles[rule];
        }
    }
    return global;
};
