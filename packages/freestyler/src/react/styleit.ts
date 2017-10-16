import {createElement as h, cloneElement} from 'react';
import {IStyles} from 'freestyler-renderer/src/types';
import renderer from '../renderer';

let styleitCounter = 0;
function styleit(styles: IStyles, element) {
    const styleitClassName = 'i' + styleitCounter++;
    const css = renderer.format(styles, styleitClassName);
    const {className} = element.props;

    if (process.env.NODE_ENV === 'production') {
        element.props.className = (className || '') + ' ' + styleitClassName;
        return [h('style', null, css), element];
    } else {
        let {className, ...props} = element.props;
        className = (className || '') + ' ' + styleitClassName;
        return [h('style', {key: 'style'}, css), cloneElement(element, {...props, key: 'styleit', className})];
    }
}

export default styleit;
