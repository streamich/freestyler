import {createElement as h} from 'react';
import jsxstyle from '../jsxstyle';

const wrap = (type, staticTemplate, dynamicTemplate, name?) => {
    const Block = jsxstyle(type, staticTemplate);

    return props => {
        const css = dynamicTemplate ? dynamicTemplate(props) : {};

        if (process.env.NODE_ENV !== 'production') {
            return h(Block, {...props, css});
        }

        props.css = css;

        return h(Block, props);
    };
};

export default wrap;
