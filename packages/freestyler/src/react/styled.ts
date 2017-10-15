import {
    TComponentConstructor,
    TCssTemplate,
    TElement,
    TStyled,
    THoc,
} from '../types';
import wrap from './wrap';

function styled(Element: TElement): TStyled<TComponentConstructor> {
    return (template?: TCssTemplate, dynamicTemplate?: TCssTemplate) => {
        const Comp = wrap(
            Element,
            template,
            () => dynamicTemplate,
            'styled'
        ) as any;

        Comp.css = newDynamicTemplate => {
            dynamicTemplate = newDynamicTemplate;
        };

        return Comp;
    };
}

export default styled;
