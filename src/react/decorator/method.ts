import {TCssTemplateCallback} from '../../types/index';
import transformComponentStatic from '../transform/componentStatic';
import transformComponentDynamic from '../transform/componentDynamic';

const decoratorMethod = function(tpl: TCssTemplateCallback) {
    return (instance, key, descriptor) => {
        if (!tpl) return descriptor;

        const Comp = instance.constructor;

        transformComponentDynamic(Comp, tpl);

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
