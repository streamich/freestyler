import {createElement as h} from 'react';
import toStylesheet from '../ast/toStylesheet';
import toCss from '../ast/toCss';
import renderer from '../renderer';
import {IFreestylerStyles} from '../types';

const globalIntoRenderer = cssTemplate => {
    let injected = false;

    return () => {
        if (!injected) {
            injected = true;
            renderer.sheets.injectRaw(toCss(toStylesheet(cssTemplate)));
        }

        return null;
    };
};

const globalIntoBody = cssTemplate => {
    let element;

    return () => {
        if (!element) {
            element = h('style', {
                dangerouslySetInnerHTML: {
                    __html: toCss(toStylesheet(cssTemplate)),
                },
            });
        }

        return element;
    };
};

const globalCss: (tpl) => React.SFC<{}> = (cssTemplate: IFreestylerStyles) => {
    return process.env.FREESTYLER_NO_BODY_CSS ? globalIntoRenderer(cssTemplate) : globalIntoBody(cssTemplate);
};

export default globalCss;
