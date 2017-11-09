import {TCssTemplate, TCssDynamicTemplate} from 'freestyler-renderer/src/types';
import transformComponentStatic from './componentStatic';
import transformComponentDynamic from './componentDynamic';
import {sym, hidden} from 'freestyler-util';

const sCssComponent = sym('CssComponent');

const transformCssComponent = instance => {
    const Comp = instance.constructor;

    if (!Comp[sCssComponent]) {
        hidden(Comp, sCssComponent, 1);

        const staticTemplate: TCssTemplate = Comp.css;
        if (staticTemplate) transformComponentStatic(Comp, staticTemplate);

        let dynamicTemplate: TCssDynamicTemplate = instance.css;
        if (dynamicTemplate) {
            dynamicTemplate = dynamicTemplate.bind(instance);
            transformComponentDynamic(Comp, dynamicTemplate);
        }
    }
};

export default transformCssComponent;
