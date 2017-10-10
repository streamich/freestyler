import {css} from '../index';
import {TCssTemplate} from '../types';

const Global = () => null;

const globalizeTemplate = (template: TCssTemplate) => (...args) => ({
    ':global': typeof template === 'function' ? template(...args) : template,
});

export const global = (
    staticTemplate: TCssTemplate,
    dynamicTemplate?: TCssTemplate
) =>
    css.styled(Global)(
        globalizeTemplate(staticTemplate),
        globalizeTemplate(dynamicTemplate)
    );
