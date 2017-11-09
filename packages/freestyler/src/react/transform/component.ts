import {TCssTemplate, TCssDynamicTemplate} from 'freestyler-renderer/src/types';
import transformComponentStatic from './componentStatic';
import transformComponentDynamic from './componentDynamic';

const transformComponent = (Comp, staticTemplate: TCssTemplate, dynamicTemplate: TCssDynamicTemplate) => {
    if (staticTemplate) transformComponentStatic(Comp, staticTemplate);

    if (dynamicTemplate) transformComponentDynamic(Comp, dynamicTemplate);
};

export default transformComponent;
