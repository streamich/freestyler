import {TCssTemplate, TCssDynamicTemplate} from '../../types';
import transformComponentStatic from '../transform/componentStatic';
import transformComponentDynamic from '../transform/componentDynamic';

const decoratorMethod = function(tpl: TCssTemplate | TCssDynamicTemplate, dynamic: boolean = true) {
    return (instance, key, descriptor) => {
        if (!tpl) return descriptor;

        const Comp = instance.constructor;

        if (dynamic) transformComponentDynamic(Comp, tpl as TCssDynamicTemplate);
        else transformComponentStatic(Comp, tpl as TCssTemplate);

        const {prototype} = Comp;
        descriptor.value = prototype.render;

        const {componentWillUnmount} = prototype;
        if (componentWillUnmount) {
            instance.componentWillUnmount = componentWillUnmount;
        }

        return descriptor;
    };
};

export default decoratorMethod;
