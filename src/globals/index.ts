import styled from '../react/styled';
import {TCssTemplate} from '../types';

const Global = () => null;

const globalizeTemplate = (template: TCssTemplate) => (...args) =>
    !template ? null : typeof template === 'function' ? template(...args) : template;

export const global = (staticTemplate: TCssTemplate, dynamicTemplate?: TCssTemplate) =>
    styled(Global)(
        staticTemplate ? globalizeTemplate(staticTemplate) : null,
        dynamicTemplate ? globalizeTemplate(dynamicTemplate) : null
    );
