import {TDeclarations} from '../ast/toStylesheet';
import toCssDeclarations from '../ast/toCssDeclarations';

const applyInlineStyles = (element: HTMLElement, declarations: TDeclarations) => {
    element.style.cssText = toCssDeclarations(declarations);
};

export default applyInlineStyles;
