import {TCssTemplate, TComponentTag, TComponentType} from '../types/index';
import wrap from './wrap';

export type TStyled<P> = (styles?: TCssTemplate, styles2?: TCssTemplate) => TComponentType<P>;

function styled<P>(tag: TComponentTag<P>): TStyled<P> {
    return (template?: TCssTemplate, dynamicTemplate?: TCssTemplate) => {
        const Comp = wrap(tag, template, () => dynamicTemplate, 'styled') as any;

        Comp.css = newDynamicTemplate => {
            dynamicTemplate = newDynamicTemplate;
        };

        return Comp;
    };
}

export default styled;
