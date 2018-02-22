import {createElement as h} from 'react';
import jsxstyleBase from '../jsxstyleBase';

const jsxstyle = (definition, staticTemplate) => {
    const Block = jsxstyleBase(definition, staticTemplate);

    return props => {
        const {type, attr, children, className, ...css} = props;

        return h(Block, {
            type,
            attr,
            children,
            className,
            css,
        });
    };
};

export default jsxstyle;
