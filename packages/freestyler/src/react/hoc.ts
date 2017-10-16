import {TCssTemplate, TElement, THoc} from 'freestyler-renderer/src/types';
import wrap from './wrap';

function hoc(template?: TCssTemplate, dynamicTemplate?: TCssTemplate): THoc {
    return (Element: TElement) => {
        const Comp = wrap(Element, template, () => dynamicTemplate, 'hoc') as any;

        Comp.css = newDynamicTemplate => {
            dynamicTemplate = newDynamicTemplate;
        };

        return Comp;
    };
}

export default hoc;
