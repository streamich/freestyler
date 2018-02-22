import {TCssTemplateCallback} from '../../types';
import transformMethodRenderDynamic from './methodRenderDynamic';
import transformMethodComponentWillUnmountDynamic from './methodComponentWillUnmountDynamic';

const transformComponentDynamic = (Comp, dynamicTemplate: TCssTemplateCallback) => {
    const {prototype} = Comp;
    transformMethodComponentWillUnmountDynamic(prototype);
    transformMethodRenderDynamic(prototype, dynamicTemplate);
};

export default transformComponentDynamic;
