import transformComponentDynamic from './transform/componentDynamic';

const Classy = Comp => transformComponentDynamic(Comp, Comp.style || Comp.css);

export default Classy;
