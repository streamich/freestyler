import {createElement as h} from 'react';
import toStylesheet from '../ast/toStylesheet';
import toCss from '../ast/toCss';
import renderer from '../renderer';

let globalCss: (tpl) => React.SFC<{}>;

if (process.env.FREESTYLER_NO_BODY_CSS) {
    globalCss = cssTemplate => {
        let injected = false;

        return () => {
            if (!injected) {
                injected = true;
                renderer.sheets.injectRaw(toCss(toStylesheet(cssTemplate)));
            }

            return null;
        };
    };
} else {
    globalCss = cssTemplate => {
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
}

export default globalCss;
