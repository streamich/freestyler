import {Component, createElement as h} from 'react';
import {IFreestylerStyles} from '../../types/styles';
import {styleit} from '../styleit';
const {extend} = require('fast-af/extend');

export interface IJsxStyleProps extends IFreestylerStyles {
    [key: string]: any;
    component?: string;
    props?: object;
    children?: any;
    mediaQueries?: any;
    className?: string;
    style?: object;
}

const jsxstyle = (Comp, defaultStyles: IFreestylerStyles = {}) => {
    return (props: IJsxStyleProps) => {
        let {
            component,
            props: customProps = null,
            children,
            mediaQueries,
            className,
            style,
            ref,
            ...customStyles
        } = props;

        if (process.env.FREESTYLER_JSXSTYLE_MEDIA_QUERIES) {
            for (let prefix in mediaQueries) {
                const prefixLength = prefix.length;
                const mediaQuery = mediaQueries[prefix];
                const mediaQueryStyles = {};
                let mediaQueryHasStyles = false;
                for (let styleName in customStyles) {
                    if (styleName.indexOf(prefix) === 0) {
                        mediaQueryHasStyles = true;
                        const styleNameSansPrefix =
                            styleName[prefixLength].toLowerCase() + styleName.substr(prefixLength + 1);
                        mediaQueryStyles[styleNameSansPrefix] = customStyles[styleName];
                        delete customStyles[styleName];
                    }
                }
                if (mediaQueryHasStyles) {
                    const mediaQueryPrelude = mediaQueries[prefix];
                    customStyles[mediaQueryPrelude] = mediaQueryStyles;
                }
            }
        }

        const styles = extend({}, defaultStyles, customStyles);

        return styleit(
            styles,
            h(
                component || Comp,
                {
                    ...customProps,
                    className,
                    style,
                    ref,
                },
                children
            )
        );
    };
};

export default jsxstyle;
