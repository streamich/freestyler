import {Component, createElement as h} from 'react';
import {IFreestylerStyles} from '../../types/styles';
import {styleit} from '../styleit';
import renderer from '../../renderer';
const {extend} = require('fast-extend');

export interface IJsxstyleDefinition {
    type: string;
    attr?: object;
    className?: string;
}

export interface IJsxstyleProps extends Partial<IJsxstyleDefinition> {
    [key: string]: any;
    children?: any;
    css?: IFreestylerStyles;
}

export interface IJsxStyleState {}

const jsxstyleBase = (defOrType: string | any | IJsxstyleDefinition, defaultStyles: IFreestylerStyles = {}) => {
    let JsxStyleBase: React.ComponentClass<IJsxstyleProps>;
    let staticClassNames: string;
    let defaultType;
    let defaultAttr;
    let defaultClassName;

    if (typeof defOrType === 'object') {
        defaultType = defOrType.type;
        defaultAttr = defOrType.attr || {};
        defaultClassName = defOrType.className || '';
    } else {
        defaultType = defOrType;
        defaultAttr = {};
        defaultClassName = '';
    }

    JsxStyleBase = class extends Component<IJsxstyleProps, IJsxStyleState> {
        el: HTMLElement = null;

        ref = el => (this.el = el);

        constructor(props, context) {
            super(props, context);

            if (staticClassNames === void 0) {
                staticClassNames = renderer.renderStatic(JsxStyleBase, defaultStyles);
            }
        }

        componentWillUnmount() {
            renderer.unrender(JsxStyleBase, this, this.el);
        }

        render() {
            let {type = defaultType, attr = {} as any, children, className = '', css} = this.props;

            const dynamicClassNames = renderer.render(JsxStyleBase, this, this.el, css);
            const allClassNames =
                (defaultClassName ? defaultClassName + ' ' : '') +
                (attr.className ? attr.className + ' ' : '') +
                ' ' +
                className +
                staticClassNames +
                dynamicClassNames;

            if (process.env.NODE_ENV !== 'production') {
                attr = {
                    ...defaultAttr,
                    ...attr,
                    children,
                    className: allClassNames,
                };

                if (typeof type === 'string') {
                    return h(type, attr);
                } else {
                    const props = {
                        ...this.props,
                        attr,
                    };

                    return h(type, props, children);
                }
            }

            attr.className = allClassNames;
            attr = extend({}, defaultAttr, attr);
            attr.children = children;

            if (typeof type === 'string') {
                return h(type, attr);
            } else {
                (this.props as any).attr = attr;

                return h(type, this.props);
            }
        }
    };

    if (process.env.NODE_ENV !== 'production') {
        let name;

        if (typeof defaultType === 'string') {
            name = defaultType;
        } else {
            name = defaultType.displayName || defaultType.name;
        }

        JsxStyleBase.displayName = `JsxStyleBase(${name})`;
    }

    return JsxStyleBase;
};

export default jsxstyleBase;
