import {createElement as h} from 'react';
import jsxstyleBase from '../jsxstyleBase';

const wrap = (definition, staticTemplate, dynamicTemplate, name?) => {
    const Block = jsxstyleBase(definition, staticTemplate);

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
