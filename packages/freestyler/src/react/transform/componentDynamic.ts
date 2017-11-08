import {cloneElement} from 'react';
import {TCssDynamicTemplate} from 'freestyler-renderer/src/types';
import transformMethodRenderDynamic from './methodRenderDynamic';
import transformMethodComponentWillUnmountDynamic from './methodComponentWillUnmountDynamic';

const transformComponentDynamic = (Comp, dynamicTemplate: TCssDynamicTemplate) => {
    const {prototype: p} = Comp;
    p.componentWillUnmount = transformMethodComponentWillUnmountDynamic(p.componentWillUnmount);
    p.render = transformMethodRenderDynamic(p.render, dynamicTemplate);
};

export default transformComponentDynamic;
