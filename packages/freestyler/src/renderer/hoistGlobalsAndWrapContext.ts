const REG_AT = /^@/;

const hoistGlobalsAndWrapContext = (styles, selector: string) => {
    let global = {
        [selector]: styles,
    };

    for (const rule in styles) {
        if (REG_AT.test(rule[0])) {
            global[rule] = {
                [selector]: styles[rule],
            };
            delete styles[rule];
        }
    }

    return global;
};

export default hoistGlobalsAndWrapContext;
