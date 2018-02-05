import {createElement as h, cloneElement, Component} from 'react';
import {IStyles} from '../renderer/types';
import stylesToClassesAndCss from './transform/stylesToClassesAndCss';

export type TStyleitFacc = (classNames: string) => any;

const styleJsx = (classNames: string, css: string, jsx) => {
    const {className} = jsx.props;

    if (process.env.NODE_ENV === 'production') {
        jsx.props.className = (className || '') + ' ' + classNames;
        return css ? [h('style', null, css), jsx] : jsx;
    } else {
        let {className, ...props} = jsx.props;
        className = (className || '') + ' ' + classNames;
        return [h('style', {key: 'style'}, css), cloneElement(jsx, {...props, key: 'styleit', className})];
    }
};

const styleFacc = (classNames: string, css: string, facc: (classNames: string) => any) => {
    if (process.env.NODE_ENV !== 'production') {
        if (typeof facc !== 'function') {
            throw new TypeError('Expected children of Styleit Facc to be a function. (className) => jsx');
        }
    }

    if (process.env.NODE_ENV === 'production') {
        return css ? [h('style', null, css), facc(classNames)] : facc(classNames);
    } else {
        const jsx = cloneElement(facc(classNames), {key: 'jsx'});
        return [h('style', {key: 'style'}, css), jsx];
    }
};

export function styleit(styles: IStyles, jsxOrFacc: any | TStyleitFacc) {
    if (process.env.NODE_ENV !== 'production') {
        if (typeof styles !== 'object') {
            throw TypeError(
                `Expected "css" property of Styleit Facc to be a CSS object, ` +
                    `${typeof styles} given. ${JSON.stringify(styles)}`
            );
        }
    }

    const [classNames, css] = stylesToClassesAndCss(styles);
    return typeof jsxOrFacc === 'function'
        ? styleFacc(classNames, css, jsxOrFacc)
        : styleJsx(classNames, css, jsxOrFacc);
}

export interface IStyleitProps {
    children: (className: string) => any;
    css: IStyles;
}

export const Styleit: any = (props: IStyleitProps | any) => {
    let {children: jsxOrFacc, css: styles} = props;

    if (!styles) {
        ({children: jsxOrFacc, ...styles} = props);
    }

    return styleit(styles, jsxOrFacc);
};
