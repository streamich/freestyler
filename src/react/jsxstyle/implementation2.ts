import {Component, createElement as h} from 'react';
import {styleit} from '../styleit';
import {extend} from 'fast-extend';
import renderer from '../../renderer';

export interface IJsxStyleProps {
    [key: string]: any;
    component?: string;
    props?: object;
    children?: any;
    mediaQueries?: any;
    className?: string;
    style?: object;
}

export interface IJsxStyleState {}

const jsxstyle = (Comp, defaultStyles = {}) => {
    let JsxStyle: React.ComponentClass<IJsxStyleProps>;
    let staticClassNames: string = '';

    JsxStyle = class JsxStyle extends Component<IJsxStyleProps, IJsxStyleState> {
        el: HTMLElement = null;

        ref = el => (this.el = el);

        componentWillUnmount() {
            renderer.unrender(JsxStyle, this, this.el);
        }

        render() {
            let {
                component,
                props: customProps = null,
                children,
                mediaQueries,
                className,
                style,
                ...customStyles
            } = this.props;

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
                            delete (customStyles as any)[styleName];
                        }
                    }
                    if (mediaQueryHasStyles) {
                        const mediaQueryPrelude = mediaQueries[prefix];
                        (customStyles as any)[mediaQueryPrelude] = mediaQueryStyles;
                    }
                }
            }

            const dynamicClassNames = renderer.render(JsxStyle, this, this.el, customStyles);

            return h(
                component || Comp,
                {
                    ...customProps,
                    className: staticClassNames + dynamicClassNames + (className || ''),
                    style,
                },
                children
            );
        }
    };

    staticClassNames = renderer.renderStatic(JsxStyle, defaultStyles);

    return JsxStyle;
};

export default jsxstyle;
