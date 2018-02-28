const hoistGlobalsAndWrapContext = (styles, selector: string) => {
    let global = {
        [selector]: styles,
    };

    for (const key in styles) {
        if (key[0] === '@') {
            // At-rule.
            if (key[1] === 'k') {
                // @keyframes
                global[key] = styles[key];
            } else {
                global[key] = {
                    [selector]: styles[key],
                };
            }

            delete styles[key];
        }
    }

    return global;
};

export default hoistGlobalsAndWrapContext;
