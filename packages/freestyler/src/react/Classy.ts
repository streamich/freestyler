import transform from './transform';

const Classy = Comp => transform(Comp, Comp.style);
export default Classy;
