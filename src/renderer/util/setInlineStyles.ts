import {TDeclarations} from '../../ast/toStylesheet';
import applyDeclarationsToCssStyleDeclaration from './applyDeclarationsToCssStyleDeclaration';

const setInlineStyles = (element: HTMLElement, declarations: TDeclarations) => {
    applyDeclarationsToCssStyleDeclaration(element.style, declarations);
};

export default setInlineStyles;
