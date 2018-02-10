import {TCssDynamicTemplate} from '../../types/index';
import transformMethodRenderDynamic from './methodRenderDynamic';
import transformMethodComponentWillUnmountDynamic from './methodComponentWillUnmountDynamic';

const transformComponentDynamic = (Comp, dynamicTemplate: TCssDynamicTemplate) => {
    const {prototype} = Comp;
    transformMethodComponentWillUnmountDynamic(prototype);
    transformMethodRenderDynamic(prototype, dynamicTemplate);
};

export default transformComponentDynamic;
