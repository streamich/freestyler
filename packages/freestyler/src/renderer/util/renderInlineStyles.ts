import {hidden, sym} from 'freestyler-util';
import {TDeclarations} from '../ast/toStylesheet';
import declarationSubtractStrict from '../declaration/subtractStrict';
import setInlineStyles from './setInlineStyles';
import removeInlineStyles from './removeInlineStyles';

const $$last = sym('last');

const renderInlineStyles = (el: HTMLElement, declarations: TDeclarations) => {
    const previousDecls: TDeclarations = el[$$last];
    let newDecls: TDeclarations;

    // TODO: Check if it is faster to use `declarationSubtractStrict` and
    // TODO: apply them one-by-one, or use `applyInlineStyles` instead.

    if (previousDecls) {
        newDecls = declarationSubtractStrict(declarations, previousDecls);

        // Remove unused styles from previous render cycle.
        // const subtraction = declarationSubtract(previousDecls, declarations);
        // removeInlineStyles(style, subtraction);

        el[$$last] = declarations;
    } else {
        newDecls = declarations;
        hidden(el, $$last, declarations);
    }

    setInlineStyles(el, newDecls);
};

export default renderInlineStyles;
