import declarationIntersectStrict from '../intersectStrict';
import {TDeclarations} from '../../ast/toStylesheet';

describe('declarationIntersect', () => {
    it('overlapping sets', () => {
        const A: TDeclarations = [['background', 'blue'], ['color', 'red'], ['font', 'Tahoma'], ['z-index', '1']];
        const B: TDeclarations = [['color', 'red'], ['font', 'Verdana'], ['z-index', '1']];
        const intersection = declarationIntersectStrict(A, B);
        expect(intersection).toEqual([['color', 'red'], ['z-index', '1']]);
    });

    it('disjoint sets', () => {
        const A: TDeclarations = [['a', 'a'], ['aa', 'aa']];
        const B: TDeclarations = [['b', 'b'], ['font', 'Verdana'], ['z-index', '1']];
        const intersection = declarationIntersectStrict(A, B);
        expect(intersection).toEqual([]);
    });

    it('equal sets', () => {
        const A: TDeclarations = [['a', 'a'], ['aa', 'aa']];
        const B: TDeclarations = [['a', 'a'], ['aa', 'aa']];
        const intersection = declarationIntersectStrict(A, B);
        expect(intersection).toEqual([['a', 'a'], ['aa', 'aa']]);
    });

    it('last item overlapping', () => {
        const A: TDeclarations = [['a', 'a'], ['aa', 'aa'], ['aaa', 'aaa']];
        const B: TDeclarations = [['aaa', 'aaa']];
        const intersection = declarationIntersectStrict(A, B);
        expect(intersection).toEqual([['aaa', 'aaa']]);
    });

    it('first item overlapping', () => {
        const A: TDeclarations = [['a', 'a'], ['aa', 'aa'], ['aaa', 'aaa']];
        const B: TDeclarations = [['a', 'a']];
        const intersection = declarationIntersectStrict(A, B);
        expect(intersection).toEqual([['a', 'a']]);
    });

    it('only property matches', () => {
        const A: TDeclarations = [['a', 'a'], ['aa', 'aa'], ['aaa', 'aaa']];
        const B: TDeclarations = [['aa', 'foo']];
        const intersection = declarationIntersectStrict(A, B);
        expect(intersection).toEqual([]);
    });

    it('only value matches', () => {
        const A: TDeclarations = [['a', 'a'], ['aa', 'aa'], ['aaa', 'aaa']];
        const B: TDeclarations = [['_aa', 'aa']];
        const intersection = declarationIntersectStrict(A, B);
        expect(intersection).toEqual([]);
    });

    it('Example 1', () => {
        const A: TDeclarations = [['background', '#eee'], ['border', '1px solid red'], ['color', 'red']];
        const B: TDeclarations = [['background', '#eee'], ['border', '1px solid red'], ['color', 'blue']];
        const intersection = declarationIntersectStrict(A, B);
        expect(intersection).toEqual([['background', '#eee'], ['border', '1px solid red']]);
    });

    it('is commutative', () => {
        const A: TDeclarations = [['background', '#eee'], ['border', '1px solid red'], ['color', 'red']];
        const B: TDeclarations = [['background', '#eee'], ['border', '1px solid red'], ['color', 'blue']];

        const intersection1 = declarationIntersectStrict(A, B);
        const intersection2 = declarationIntersectStrict(B, A);

        expect(intersection1).toEqual(intersection2);
    });
});
