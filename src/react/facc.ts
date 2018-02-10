import {TCssTemplate} from '../types/index';
import {TComponentTag} from '../types/base';
import wrap from './wrap';

function facc(Element: TComponentTag<any> = 'div', template: TCssTemplate = null) {
    let dynamicTemplate = null;
    const Comp = wrap(Element, template, () => dynamicTemplate, 'facc');

    return childrenCallback => {
        return (...args) => {
            let ast;
            [dynamicTemplate, ast] = childrenCallback(...args)(Comp);
            return ast;
        };
    };
}

export default facc;
