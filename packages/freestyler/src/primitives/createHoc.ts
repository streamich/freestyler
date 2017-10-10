import {TCssTemplate} from '../types';
import {TElement, THoc} from '../index';

export default wrap =>
    function hoc(
        template?: TCssTemplate,
        dynamicTemplate?: TCssTemplate
    ): THoc {
        return (Element: TElement) => {
            const Comp = wrap(
                Element,
                template,
                () => dynamicTemplate,
                'hoc'
            ) as any;

            Comp.css = newDynamicTemplate => {
                dynamicTemplate = newDynamicTemplate;
            };

            return Comp;
        };
    };
