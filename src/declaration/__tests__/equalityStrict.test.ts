import {TDeclarations} from '../../ast/toStylesheet';
import declarationEqualityStrict from '../equalityStrict';

describe('declarationEqualityStrict', () => {
    it('equal sets return true', () => {
        const A: TDeclarations = [['color', 'blue'], ['font', 'Arial']];
        const B: TDeclarations = [['color', 'blue'], ['font', 'Arial']];
        expect(declarationEqualityStrict(A, B)).toBe(true);
    });

    it('wrong set length returns false', () => {
        const A: TDeclarations = [['color', 'blue'], ['color', 'blue'], ['font', 'Arial']];
        const B: TDeclarations = [['color', 'blue'], ['font', 'Arial']];
        expect(declarationEqualityStrict(A, B)).toBe(false);
    });

    it('last declaration missing', () => {
        const A: TDeclarations = [['color', 'blue'], ['cursor', 'pointer']];
        const B: TDeclarations = [['color', 'blue'], ['cursor', 'pointer'], ['font', 'Arial']];
        expect(declarationEqualityStrict(A, B)).toBe(false);
    });

    it('first declaration missing', () => {
        const A: TDeclarations = [['cursor', 'pointer'], ['font', 'Arial']];
        const B: TDeclarations = [['color', 'blue'], ['cursor', 'pointer'], ['font', 'Arial']];
        expect(declarationEqualityStrict(A, B)).toBe(false);
    });

    it('middle declaration is missing', () => {
        const A: TDeclarations = [['color', 'blue'], ['font', 'Arial']];
        const B: TDeclarations = [['color', 'blue'], ['cursor', 'pointer'], ['font', 'Arial']];
        expect(declarationEqualityStrict(A, B)).toBe(false);
    });

    it('A set is empty', () => {
        const A: TDeclarations = [];
        const B: TDeclarations = [['color', 'blue'], ['cursor', 'pointer'], ['font', 'Arial']];
        expect(declarationEqualityStrict(A, B)).toBe(false);
    });

    it('B set is empty', () => {
        const A: TDeclarations = [['color', 'blue'], ['cursor', 'pointer'], ['font', 'Arial']];
        const B: TDeclarations = [];
        expect(declarationEqualityStrict(A, B)).toBe(false);
    });

    it('two empty sets', () => {
        const A: TDeclarations = [];
        const B: TDeclarations = [];
        expect(declarationEqualityStrict(A, B)).toBe(true);
    });
});
