import {Component, createElement as h} from 'react';
import {Consumer, Provider, TValue} from 'freestyler-context';

export type TElement = string | (new (...args) => Component) | ((props?, state?, context?) => any);
export type THoc = (Element: TElement) => TElement;
export type TTheme = TValue;

export interface IThemeProps {
    name?: string;
    value: TTheme;
}

export class Theme extends Component<IThemeProps, any> {
    render() {
        const {name = 'theme', value, children} = this.props;
        return h(Provider, {name, value}, children);
    }
}

export interface IThemedProps {
    name?: string;
}

export class Themed extends Component<IThemedProps, any> {
    render() {
        const {name = 'theme', children} = this.props;
        return h(Consumer, {name}, children);
    }
}

export const themed: THoc = (Element, name = 'theme') => props =>
    h(Consumer, {name}, value => {
        return h(Element, {...props, [name]: value});
    });
