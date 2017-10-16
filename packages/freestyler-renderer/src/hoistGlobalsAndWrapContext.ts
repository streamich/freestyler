const REG_AT = /^@/;

const hoistGlobalsAndWrapContext = (styles, className: string) => {
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

export default hoistGlobalsAndWrapContext;
