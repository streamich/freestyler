export default (styles, className: string) => {
    return {
        ['.' + className]: styles,
    };
};
