import {TCssTemplate, TCssDynamicTemplate} from '../../renderer/types';
import transformComponentStatic from './componentStatic';
import transformComponentDynamic from './componentDynamic';

const transformComponent = (Comp, staticTemplate: TCssTemplate, dynamicTemplate: TCssDynamicTemplate) => {
    if (staticTemplate) transformComponentStatic(Comp, staticTemplate);

    if (dynamicTemplate) transformComponentDynamic(Comp, dynamicTemplate);
};

export default transformComponent;
