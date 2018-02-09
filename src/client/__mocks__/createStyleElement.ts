const createStyleElement = () => {
    const style = {
        sheet: {
            insertRule: jest.fn(),
            cssRules: [],
        },
    };

    return style;
};

export default createStyleElement;
