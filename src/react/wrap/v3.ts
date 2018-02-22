import {createElement as h} from 'react';
import jsxstyle from '../jsxstyle';

const wrap = (type, staticTemplate, dynamicTemplate, name?) => {
    const Block = jsxstyle(type, staticTemplate);

    return props => {
        return h(Block, dynamicTemplate ? dynamicTemplate(props) : {}, props.children);
    };
};

export default wrap;
