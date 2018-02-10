import {TCssTemplate, TCssDynamicTemplate} from '../../types/index';
import transformComponentStatic from './componentStatic';
import transformComponentDynamic from './componentDynamic';
import {sym, hidden} from '../../util';

const sCssComponent = sym('CssComponent');

const transformCssComponent = instance => {
    const Comp = instance.constructor;

    if (!Comp[sCssComponent]) {
        hidden(Comp, sCssComponent, 1);

        const staticTemplate: TCssTemplate = Comp.css;
        if (staticTemplate) transformComponentStatic(Comp, staticTemplate);

        let dynamicTemplate: TCssDynamicTemplate = instance.css;

        if (dynamicTemplate) {
            if (process.env.NODE_ENV !== 'production') {
                if (typeof dynamicTemplate !== 'function') {
                    let what;

                    try {
                        what = JSON.stringify(dynamicTemplate);
                    } catch {
                        what = String(dynamicTemplate);
                    }

                    throw new TypeError('Dynamic CSS template must always be a function, ' + 'received: ' + what);
                }
            }

            dynamicTemplate = dynamicTemplate.bind(instance);
            transformComponentDynamic(Comp, dynamicTemplate);
        }
    }
};

export default transformCssComponent;
