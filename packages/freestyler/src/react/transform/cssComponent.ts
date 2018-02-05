import {TCssTemplate, TCssDynamicTemplate} from '../../renderer/types';
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
        console.log('instance.css', instance.css);
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
            console.log('aa', Comp, dynamicTemplate);
            transformComponentDynamic(Comp, dynamicTemplate);
        }
    }
};

export default transformCssComponent;
