import {TCssTemplate, TCssDynamicTemplate} from '../../types/index';
import transformComponentStatic from '../transform/componentStatic';
import transformComponentDynamic from '../transform/componentDynamic';

const decoratorClass = (template: TCssTemplate) => {
    return Comp => transformComponentStatic(Comp, template);
};

export default decoratorClass;
