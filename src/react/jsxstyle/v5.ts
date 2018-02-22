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

export interface IJsxstyleProps extends Partial<IJsxstyleDefinition>, IFreestylerStyles {
    [key: string]: any;
    children?: any;
}

export interface IJsxStyleState {}

const jsxstyle = (defOrType: string | IJsxstyleDefinition, defaultStyles: IFreestylerStyles = {}) => {
    let JsxStyle: React.ComponentClass<IJsxstyleProps>;
    let staticClassNames: string;
    let defaultType;
    let defaultAttr;
    let defaultClassName;

    if (typeof defOrType === 'string') {
        defaultType = defOrType;
        defaultAttr = {};
        defaultClassName = '';
    } else {
        defaultType = defOrType.type;
        defaultAttr = defOrType.attr || {};
        defaultClassName = defOrType.className || '';
    }

    JsxStyle = class extends Component<IJsxstyleProps, IJsxStyleState> {
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
                type = defaultType,
                attr = {} as any,
                children,
                mediaQueries,
                className = '',
                ...dynamicStyles
            } = this.props;

            const dynamicClassNames = renderer.render(JsxStyle, this, this.el, dynamicStyles);
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
                    className: allClassNames,
                };

                if (typeof type === 'string') {
                    return h(type, attr, children);
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

            if (typeof type === 'string') {
                return h(type, attr, children);
            } else {
                (this.props as any).attr = attr;

                return h(type, this.props, children);
            }
        }
    };

    return JsxStyle;
};

export default jsxstyle;
