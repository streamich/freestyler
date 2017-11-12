import {TDeclarations} from '../ast/toStylesheet';
import applyDeclarationsToCssStyleDeclaration from './applyDeclarationsToCssStyleDeclaration';

const applyInlineStyles = (element: HTMLElement, declarations: TDeclarations) => {
    applyDeclarationsToCssStyleDeclaration(element.style, declarations);
};

export default applyInlineStyles;
