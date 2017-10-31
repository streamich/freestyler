import {IStyles} from 'freestyler-renderer/src/types';
import renderer from './renderer';

/**
 * In this case "rule" is NOT a collection of declarations, but
 * rather a collectoin of TRules, it is IStyles. The switch
 * in naming convetion because in many other CSS libraries this
 * function is called "rule".
 * @param styles Collection of rules.
 */
const rule = (styles: IStyles) => {
    return renderer.renderAnon(styles);
};

export default rule;
