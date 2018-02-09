import {createElement as h} from 'react';
import toStylesheet from '../ast/toStylesheet';
import toCss from '../ast/toCss';

const createCssResetComponent: (tpl) => React.SFC<{}> = cssTemplate => {
    const rawCss = toCss(toStylesheet(cssTemplate));

    return () =>
        h('style', {
            dangerouslySetInnerHTML: {
                __html: rawCss,
            },
        });
};

export default createCssResetComponent;
