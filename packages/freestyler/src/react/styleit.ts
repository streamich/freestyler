import {createElement as h, cloneElement} from 'react';
import {
    TComponentConstructor,
    TCssTemplate,
    TElement,
    TStyled,
    THoc,
    IStyles,
} from '../types';
import hoistGlobalsAndWrapContext from '../renderers/hoistGlobalsAndWrapContext';
import {toStyleSheet, toCss} from '../ast';

let styleitCounter = 0;
function styleit(styles: IStyles, element) {
    const styleitClassName = 'i' + styleitCounter++;
    styles = hoistGlobalsAndWrapContext(styles, styleitClassName);
    const stylesheet = toStyleSheet(styles);
    const css = toCss(stylesheet);
    const {className} = element.props;

    if (process.env.NODE_ENV === 'production') {
        element.props.className = (className || '') + ' ' + styleitClassName;
        return [h('style', null, css), element];
    } else {
        let {className, ...props} = element.props;
        className = (className || '') + ' ' + styleitClassName;
        return [
            h('style', {key: 'style'}, css),
            cloneElement(element, {...props, key: 'styleit', className}),
        ];
    }
}

export default styleit;
