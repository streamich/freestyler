import {TCssTemplate} from '../types';
import {TElement} from '../index';

export default wrap =>
    function facc(Element: TElement = 'div', template: TCssTemplate = null) {
        let dynamicTemplate = null;
        const Comp = wrap(Element, template, () => dynamicTemplate, 'facc');

        return childrenCallback => {
            return (...args) => {
                let ast;
                [dynamicTemplate, ast] = childrenCallback(...args)(Comp);
                return ast;
            };
        };
    };
