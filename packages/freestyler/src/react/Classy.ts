import transformComponentStatic from './transform/componentStatic';
import transformComponentDynamic from './transform/componentDynamic';

const Classy = Comp => {
    const template = Comp.css || Comp.style;
    if (typeof template === 'object') transformComponentStatic(Comp, template);
    else transformComponentDynamic(Comp, template);
};

export default Classy;
