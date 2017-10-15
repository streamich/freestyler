import {styled} from '../index';
import {TCssTemplate} from '../types';

const Global = () => null;

const globalizeTemplate = (template: TCssTemplate) => (...args) =>
    !template
        ? null
        : {
              ':global':
                  typeof template === 'function' ? template(...args) : template,
          };

export const global = (
    staticTemplate: TCssTemplate,
    dynamicTemplate?: TCssTemplate
) =>
    styled(Global)(
        globalizeTemplate(staticTemplate),
        globalizeTemplate(dynamicTemplate)
    );
