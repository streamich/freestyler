import {TDeclarations} from '../ast/toStylesheet';

const removeInlineStyles = (el: HTMLElement, declarations: TDeclarations) => {
    const {style} = el;
    for (let i = 0; i < declarations.length; i++) style.removeProperty(declarations[i][0]);
};

export default removeInlineStyles;
