import {TDeclarations} from '../ast/toStylesheet';

/**
 * A and B have to be sorted in ASC order.
 * @param {TDeclarations} A Positive set.
 * @param {TDeclarations} B Negative set.
 * @return {TDeclarations} Subtraction of two sets.
 */
const declarationSubtract: (A: TDeclarations, B: TDeclarations) => TDeclarations = (A, B) => {
    let subtraction: TDeclarations = [];

    let i = 0;
    let j = 0;
    for (; i < A.length && j < B.length; i++) {
        const declarationA = A[i];
        const [propertyA] = declarationA;

        while (j < B.length && propertyA > B[j][0]) j++;
        if (j >= B.length) break;

        const [propertyB] = B[j];
        if (propertyA !== propertyB) subtraction.push(declarationA);
    }

    if (i < A.length) subtraction = subtraction.concat(A.slice(i));

    return subtraction;
};

export default declarationSubtract;
