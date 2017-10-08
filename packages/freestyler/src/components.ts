

function createComponents(css) {
    const Null = () => null;

    const GlobalCssHoc = (staticTemplate, dynamic) =>
        css.styled(Null)({_: staticTemplate}, (...args) => ({_: dynamic ? dynamic(...args) : {}}));

}
