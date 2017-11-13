import {TRule, TDeclarations} from '../ast/toStylesheet';
import declarationSort from '../declaration/sort';
import CSheet from './CSheet';

const vsheet = new CSheet();

// Low cardinality virtual style properties that should be batched.
//
// For example, `display` has only a limited number of available values:
// `block`, `inline`, `flex`, ...
const LOW_CARDINALITY_PROPERTIES = {
    'z-index': 1,
    display: 1,
    cursor: 1,
    'font-weight': 1,
    position: 1,
    'text-align': 1,
    'vertical-align': 1,
    visibility: 1,
    float: 1,
};

// High cardinality virtual style properties that should be cached atomicly.
//
// For example:
//     width: 0;
//     width: 0px - 2000px;
//     width: 0% - 100%;
//
// Only 2101 possible `width` variations.
//
// Fractions like `width: 1.1%` should place the `width` property in to the
// infinite bucket.
const HIGH_CARDINALITY_PROPERTIES = {
    width: 1,
    height: 1,
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
    'border-radius': 1,
    'margin-top': 1,
    'margin-right': 1,
    'margin-bottom': 1,
    'margin-left': 1,
    'padding-top': 1,
    'padding-right': 1,
    'padding-bottom': 1,
    'padding-left': 1,
};

// Properties that can be transformed from infinite cardinality to a set
// of high cardinality properties.
//
// For exmaple:
//
//     padding: 10px 15px 20px 25px;
//
// Can be transformed to:
//
//     padding-top: 10px;
//     padding-right: 15px;
//     padding-bottom: 20px;
//     padding-left: 25px;
const INFINITE_TO_HIGH_TRANSFORMABLE_PROPERTIES = {
    padding: 1,
    margin: 1,
};

const renderCacheable: (rule: TRule, atRulePrelude) => [string, TDeclarations] = (rule, atRulePrelude) => {
    const [selectorTemplate, declarations] = rule;
    if (!declarations.length) return;

    let classNames = '';

    const infiniteCardinalityDecls = [];
    let lowCardinalityDecls = [];

    for (let i = 0; i < declarations.length; i++) {
        const declaration = declarations[i];
        const [prop, value] = declaration;
        if (HIGH_CARDINALITY_PROPERTIES[prop]) {
            classNames += ' ' + vsheet.insert(atRulePrelude, selectorTemplate, prop, value);
        } else if (LOW_CARDINALITY_PROPERTIES[prop]) {
            lowCardinalityDecls.push(declaration);
        } else {
            infiniteCardinalityDecls.push(declaration);
        }
    }

    if (lowCardinalityDecls.length) {
        declarationSort(lowCardinalityDecls);
        classNames += ' ' + vsheet.insertBatch(atRulePrelude, selectorTemplate, lowCardinalityDecls);
    }

    return [classNames, infiniteCardinalityDecls];
};

export default renderCacheable;
