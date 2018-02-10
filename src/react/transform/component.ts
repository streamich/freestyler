import {TCssTemplate, TCssDynamicTemplate} from '../../types/index';
import transformComponentStatic from './componentStatic';
import transformComponentDynamic from './componentDynamic';

const transformComponent = (Comp, staticTemplate: TCssTemplate, dynamicTemplate: TCssDynamicTemplate) => {
    if (staticTemplate) transformComponentStatic(Comp, staticTemplate);

    if (dynamicTemplate) transformComponentDynamic(Comp, dynamicTemplate);
};

export default transformComponent;
