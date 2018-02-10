import {TComponentTag, THoc} from '../types/base';
import {TCssTemplate} from '../types/index';
import wrap from './wrap';

function hoc(template?: TCssTemplate, dynamicTemplate?: TCssTemplate): THoc<any, any> {
    return (Element: TComponentTag<any>) => {
        const Comp = wrap(Element, template, () => dynamicTemplate, 'hoc') as any;

        Comp.css = newDynamicTemplate => {
            dynamicTemplate = newDynamicTemplate;
        };

        return Comp;
    };
}

export default hoc;
