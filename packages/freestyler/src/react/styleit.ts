import {createElement as h, cloneElement, Component} from 'react';
import {IStyles} from 'freestyler-renderer/src/types';
import renderer from '../renderer';

let classNameCounter = 0;

export function styleit(styles: IStyles, element) {
    const styleitClassName = 'i' + classNameCounter++;
    const css = renderer.format(styles, '.' + styleitClassName);
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

export interface IStyleitProps {
    children: (className: string) => any;
    css: IStyles;
}

export const Styleit: any = ({children, css: styles}: IStyleitProps) => {
    if (process.env.NODE_ENV !== 'production') {
        if (typeof styles !== 'object') {
            throw TypeError(
                `Expected "css" property of Styleig Facc to be a CSS object, ` +
                    `${typeof styles} given. ${JSON.stringify(styles)}`
            );
        }
    }

    const className = 'i' + classNameCounter++;
    const css = renderer.format(styles, '.' + className);

    if (process.env.NODE_ENV !== 'production') {
        if (typeof children !== 'function') {
            throw new TypeError('Expected children of Styleit Facc to be a function. (className) => jsx');
        }
    }

    return [h('style', null, css), children(className)];
};

export default Styleit;
