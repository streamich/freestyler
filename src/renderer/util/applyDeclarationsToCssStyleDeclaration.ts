import {TDeclarations} from '../../ast/toStylesheet';

const applyDeclarationsToCssStyleDeclaration = (style: CSSStyleDeclaration, declarations: TDeclarations) => {
    const len = declarations.length;
    for (let i = 0; i < len; i++) style.setProperty.apply(style, declarations[i]);
};

export default applyDeclarationsToCssStyleDeclaration;
