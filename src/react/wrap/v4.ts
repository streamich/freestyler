import {createElement as h} from 'react';
import jsxstyleBase from '../jsxstyleBase';

const wrap = (type, staticTemplate, dynamicTemplate, name?) => {
    const Block = jsxstyleBase(type, staticTemplate);

    return attr => {
        const css = dynamicTemplate ? dynamicTemplate(attr) : {};

        return h(Block, {attr, css}, attr.children);
    };
};

export default wrap;
