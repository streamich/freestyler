import {Component, createElement as h} from 'react';
import {IFreestylerStyles} from '../../types/styles';
import {styleit} from '../styleit';
import renderer from '../../renderer';
const {extend} = require('fast-extend');

export interface IHotProps {
    css: IFreestylerStyles;
    attr?: React.AllHTMLAttributes<any>;
}

export interface IHotState {}

const hot = (tag, defaultStyles: IFreestylerStyles = {}) => {
    let HotType: React.ComponentClass<IHotProps>;
    let staticClassNames: string = '';

    HotType = class HotType extends Component<IHotProps, IHotState> {
        el: HTMLElement = null;

        ref = el => (this.el = el);

        componentWillUnmount() {
            renderer.unrender(HotType, this, this.el);
        }

        render() {
            let {css, attr} = this.props;
            const dynamicClassNames = renderer.render(HotType, this, this.el, css);
            const {className} = attr;

            if (process.env.NODE_ENV === 'production') {
                attr.className = staticClassNames + dynamicClassNames + (className || '');

                return h(tag, attr);
            } else {
                return h(tag, {
                    ...attr,
                    className: staticClassNames + dynamicClassNames + (className || ''),
                });
            }
        }
    };

    if (process.env.NODE_ENV !== 'production') {
        HotType.displayName = `Hot<${String(tag)}>`;
    }

    staticClassNames = renderer.renderStatic(HotType, defaultStyles);

    return (css?: IFreestylerStyles) => attr =>
        h(HotType, {
            css,
            attr,
        });
};

export default hot;
