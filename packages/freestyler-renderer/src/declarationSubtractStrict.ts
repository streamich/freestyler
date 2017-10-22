import {TDeclarations} from './ast/toStylesheet';
import declarationSubtract from './declarationSubtract';
import declarationIntersectStrict from './declarationIntersectStrict';

/**
 * A and B have to be sorted in ASC order. "Strict" means, both, prop and value have to match.
 * @param {TDeclarations} A Positive set.
 * @param {TDeclarations} B Negative set.
 * @return {TDeclarations} Strict subtraction of two sets.
 */
const declarationSubtractStrict: (A: TDeclarations, B: TDeclarations) => TDeclarations = (A, B) => {
    const intersection = declarationIntersectStrict(A, B);
    return declarationSubtract(A, intersection);
};

export default declarationSubtractStrict;
