import {Component, createElement as h} from 'react';
import {IFreestylerStyles} from '../../types/styles';
import {styleit} from '../styleit';
import renderer from '../../renderer';
const {extend} = require('fast-extend');

export interface IJsxStyleProps extends IFreestylerStyles {
    [key: string]: any;
    $type?: string;
    $attr?: object;
    children?: any;
    mediaQueries?: any;
    className?: string;
}

export interface IJsxStyleState {}

const jsxstyle = (type, defaultStyles: IFreestylerStyles = {}) => {
    let JsxStyle: React.ComponentClass<IJsxStyleProps>;
    let staticClassNames: string;

    JsxStyle = class extends Component<IJsxStyleProps, IJsxStyleState> {
        el: HTMLElement = null;

        ref = el => (this.el = el);

        constructor(props, context) {
            super(props, context);

            if (staticClassNames === void 0) {
                staticClassNames = renderer.renderStatic(JsxStyle, defaultStyles);
            }
        }

        componentWillUnmount() {
            renderer.unrender(JsxStyle, this, this.el);
        }

        render() {
            let {
                $type = type,
                $attr = {} as any,
                children,
                mediaQueries,
                className = '',
                ...dynamicStyles
            } = this.props;

            if (process.env.FREESTYLER_JSXSTYLE_MEDIA_QUERIES) {
                for (let prefix in mediaQueries) {
                    const prefixLength = prefix.length;
                    const mediaQuery = mediaQueries[prefix];
                    const mediaQueryStyles = {};
                    let mediaQueryHasStyles = false;
                    for (let styleName in dynamicStyles) {
                        if (styleName.indexOf(prefix) === 0) {
                            mediaQueryHasStyles = true;
                            const styleNameSansPrefix =
                                styleName[prefixLength].toLowerCase() + styleName.substr(prefixLength + 1);
                            mediaQueryStyles[styleNameSansPrefix] = dynamicStyles[styleName];
                            delete (dynamicStyles as any)[styleName];
                        }
                    }
                    if (mediaQueryHasStyles) {
                        const mediaQueryPrelude = mediaQueries[prefix];
                        (dynamicStyles as any)[mediaQueryPrelude] = mediaQueryStyles;
                    }
                }
            }

            const dynamicClassNames = renderer.render(JsxStyle, this, this.el, dynamicStyles);

            if (process.env.NODE_ENV !== 'production') {
                return h(
                    $type,
                    {
                        ...$attr,
                        className: className + staticClassNames + dynamicClassNames,
                    },
                    children
                );
            }

            $attr.className = className + staticClassNames + dynamicClassNames;

            return h($type, $attr, children);
        }
    };

    return JsxStyle;
};

export default jsxstyle;
