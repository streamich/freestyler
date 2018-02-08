import declarationSort from '../sort';
import {TDeclarations} from '../../ast/toStylesheet';

describe('declarationSort', () => {
    it('works', () => {
        const decls: TDeclarations = [['a', 'a'], ['c', 'c'], ['aa', 'aa'], ['b', 'b']];
        declarationSort(decls);
        expect(decls).toEqual([['a', 'a'], ['aa', 'aa'], ['b', 'b'], ['c', 'c']]);
    });
});
