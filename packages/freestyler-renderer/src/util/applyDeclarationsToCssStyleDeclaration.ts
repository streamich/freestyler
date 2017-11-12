import {TDeclarations} from '../ast/toStylesheet';

const applyDeclarationsToCssStyleDeclaration = (style: CSSStyleDeclaration, declarations: TDeclarations) => {
    const len = declarations.length;

    // TODO: Benchmark this.
    switch (len) {
        case 1:
            style.setProperty(declarations[0][0], declarations[0][1]);
            break;
        case 2:
            style.setProperty(declarations[0][0], declarations[0][1]);
            style.setProperty(declarations[1][0], declarations[1][1]);
            break;
        default:
            for (let i = 0; i < len; i++) style.setProperty.apply(style, declarations[i]);
    }
};

export default applyDeclarationsToCssStyleDeclaration;
