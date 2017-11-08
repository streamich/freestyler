import renderer from '../../renderer';
import {IStyles} from 'freestyler-renderer/src/types';
import renderCacheableAndGetInfCss from 'freestyler-renderer/src/virtual/renderCacheableAndGetInfCss';
import SCOPE_SENTINEL from 'freestyler-renderer/src/util/sentinel';

let classNameCounter = 0;

const genClassName = () => '__' + (classNameCounter++).toString(36);

const transformStylesToClassesAndCss: (styles: IStyles) => [string, string] = styles => {
    const className = genClassName();
    const stylesheet = renderer.toStylesheet(styles, SCOPE_SENTINEL);
    let [classNames, css] = renderCacheableAndGetInfCss(stylesheet, className);

    if (css) {
        classNames = className + classNames;
    }

    return [classNames, css];
};

export default transformStylesToClassesAndCss;
