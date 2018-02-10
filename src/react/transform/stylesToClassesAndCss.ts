import renderer from '../../renderer';
import {IStyles} from '../../renderer/types';
import SCOPE_SENTINEL from '../../renderer/util/sentinel';

let classNameCounter = 0;
const PREFIX = process.env.FREESTYLER_PREFIX || '';

const genClassName = () => PREFIX + '__' + (classNameCounter++).toString(36);

const transformStylesToClassesAndCss: (styles: IStyles) => [string, string] = styles => {
    const className = genClassName();
    const stylesheet = renderer.toStylesheet(styles, SCOPE_SENTINEL);
    let [classNames, css] = renderer.renderCacheAndGetInfCss(stylesheet, className);

    if (css) {
        classNames = className + classNames;
    }

    return [classNames, css];
};

export default transformStylesToClassesAndCss;
