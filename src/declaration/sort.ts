import {TDeclarations} from '../ast/toStylesheet';

const comparator = ([propA], [propB]) => (propA > propB ? 1 : -1);

const declarationSort: (list: TDeclarations) => void = list => list.sort(comparator as any);

export default declarationSort;
