import {TCssTemplate, TCssDynamicTemplate} from '../../types/index';
import transformComponentStatic from '../transform/componentStatic';
import transformComponentDynamic from '../transform/componentDynamic';

const decoratorClass = (tpl: TCssTemplate | TCssDynamicTemplate, dynamic?: boolean) => {
    return Comp => {
        if (!tpl) return;

        if (dynamic) transformComponentDynamic(Comp, tpl as TCssDynamicTemplate);
        else transformComponentStatic(Comp, tpl as TCssTemplate);
    };
};

export default decoratorClass;
