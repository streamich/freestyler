import {TDeclarations} from './ast/toStylesheet';

/**
 * A and B have to be sorted in ASC order.
 * @param {TDeclarations} A Positive set.
 * @param {TDeclarations} B Negative set.
 * @return {TDeclarations} True if bots sets are strictly (props and values) equal.
 */
const declarationEqualityStrict: (A: TDeclarations, B: TDeclarations) => boolean = (A, B) => {
    if (A.length !== B.length) return false;

    for (let i = 0; i < A.length; i++) {
        const declarationA = A[i];
        const declarationB = B[i];

        const [propertyA, valueA] = declarationA;
        const [propertyB, valueB] = declarationB;

        if (propertyA !== propertyB || valueA !== valueB) return false;
    }

    return true;
};

export default declarationEqualityStrict;
