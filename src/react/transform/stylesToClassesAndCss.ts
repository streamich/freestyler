import renderer from '../../renderer';
import {IFreestylerStyles} from '../../types/index';
import SCOPE_SENTINEL from '../../renderer/util/sentinel';

let classNameCounter = 0;

const genClassName = () => renderer.prefix + '__' + (classNameCounter++).toString(36);

const transformStylesToClassesAndCss: (styles: IFreestylerStyles) => [string, string] = styles => {
    const className = genClassName();
    const stylesheet = renderer.toStylesheet(styles, SCOPE_SENTINEL);
    let [classNames, css] = renderer.renderCacheAndGetInfCss(stylesheet, className);

    if (css) {
        classNames = className + classNames;
    }

    return [classNames, css];
};

export default transformStylesToClassesAndCss;
