import declarationSubtract from '../declarationSubtract';
import {TDeclarations} from '../ast/toStylesheet';

describe('declarationSubtract', () => {
    it('overlapping sets', () => {
        const A: TDeclarations = [['background', 'blue'], ['color', 'red'], ['font', 'Verdana'], ['z', 'z']];
        const B: TDeclarations = [['background', 'purple'], ['color', 'red'], ['text-decoration', 'underline']];
        const subtraction = declarationSubtract(A, B);
        expect(subtraction).toEqual([['font', 'Verdana'], ['z', 'z']]);
    });

    it('empty sets', () => {
        expect(declarationSubtract([], [])).toEqual([]);
    });

    it('subtraction from empty set', () => {
        expect(declarationSubtract([], [['a', 'b'], ['c', 'd']])).toEqual([]);
    });

    it('subtraction by empty set', () => {
        const A: TDeclarations = [['background', 'blue'], ['color', 'red'], ['font', 'Verdana'], ['z', 'z']];
        const subtraction = declarationSubtract(A, []);
        expect(subtraction).toEqual(A);
    });

    it('equivalent sets', () => {
        const set: TDeclarations = [['background', 'purple'], ['color', 'red'], ['text-decoration', 'underline']];
        const subtraction = declarationSubtract(set, set);
        expect(subtraction).toEqual([]);
    });

    it('first item', () => {
        const A: TDeclarations = [['a', 'a'], ['b', 'b'], ['c', 'c']];
        const B: TDeclarations = [['a', 'a']];
        const subtraction = declarationSubtract(A, B);
        expect(subtraction).toEqual([['b', 'b'], ['c', 'c']]);
    });

    it('last item', () => {
        const A: TDeclarations = [['a', 'a'], ['b', 'b'], ['c', 'c']];
        const B: TDeclarations = [['c', 'c']];
        const subtraction = declarationSubtract(A, B);
        expect(subtraction).toEqual([['a', 'a'], ['b', 'b']]);
    });

    it('middle item', () => {
        const A: TDeclarations = [['a', 'a'], ['b', 'b'], ['c', 'c']];
        const B: TDeclarations = [['b', 'b']];
        const subtraction = declarationSubtract(A, B);
        expect(subtraction).toEqual([['a', 'a'], ['c', 'c']]);
    });
});
