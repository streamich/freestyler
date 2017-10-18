import {TDeclarations} from './ast/toStylesheet';

/**
 * A and B have to be sorted in ASC order. Strict means that, both, property and value are compared.
 * @param {TDeclarations} A
 * @param {TDeclarations} B
 * @return {TDeclarations} An intersection of A and B.
 */
const declarationIntersectStrict: (A: TDeclarations, B: TDeclarations) => TDeclarations = (A, B) => {
    const intersection: TDeclarations = [];

    let j = 0;
    for (let i = 0; i < A.length && j < B.length; i++) {
        const declarationA = A[i];
        const [propertyA, valueA] = declarationA;

        while (j < B.length && propertyA > B[j][0]) j++;
        if (j >= B.length) break;

        const [propertyB, valueB] = B[j];
        if (propertyA === propertyB && valueA === valueB) intersection.push(declarationA);
    }

    return intersection;
};

export default declarationIntersectStrict;
