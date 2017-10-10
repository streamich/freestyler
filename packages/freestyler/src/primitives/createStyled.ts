import {TElement, TStyled} from '../index';
import {TComponentConstructor, TCssTemplate} from '../types';

export default wrap =>
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
    };
