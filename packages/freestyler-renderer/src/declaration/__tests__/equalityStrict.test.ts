import declarationEqualityStrict from '../declarationEqualityStrict';

describe('declarationEqualityStrict', () => {
    it('equal sets return true', () => {
        const A = [['color', 'blue'], ['font', 'Arial']];
        const B = [['color', 'blue'], ['font', 'Arial']];
        expect(declarationEqualityStrict(A, B)).toBe(true);
    });

    it('wrong set length returns false', () => {
        const A = [['color', 'blue'], ['color', 'blue'], ['font', 'Arial']];
        const B = [['color', 'blue'], ['font', 'Arial']];
        expect(declarationEqualityStrict(A, B)).toBe(false);
    });

    it('last declaration missing', () => {
        const A = [['color', 'blue'], ['cursor', 'pointer']];
        const B = [['color', 'blue'], ['cursor', 'pointer'], ['font', 'Arial']];
        expect(declarationEqualityStrict(A, B)).toBe(false);
    });

    it('first declaration missing', () => {
        const A = [['cursor', 'pointer'], ['font', 'Arial']];
        const B = [['color', 'blue'], ['cursor', 'pointer'], ['font', 'Arial']];
        expect(declarationEqualityStrict(A, B)).toBe(false);
    });

    it('middle declaration is missing', () => {
        const A = [['color', 'blue'], ['font', 'Arial']];
        const B = [['color', 'blue'], ['cursor', 'pointer'], ['font', 'Arial']];
        expect(declarationEqualityStrict(A, B)).toBe(false);
    });

    it('A set is empty', () => {
        const A = [];
        const B = [['color', 'blue'], ['cursor', 'pointer'], ['font', 'Arial']];
        expect(declarationEqualityStrict(A, B)).toBe(false);
    });

    it('B set is empty', () => {
        const A = [['color', 'blue'], ['cursor', 'pointer'], ['font', 'Arial']];
        const B = [];
        expect(declarationEqualityStrict(A, B)).toBe(false);
    });

    it('two empty sets', () => {
        const A = [];
        const B = [];
        expect(declarationEqualityStrict(A, B)).toBe(true);
    });
});
