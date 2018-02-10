import {styleit} from './styleit';
import {TCssTemplate, IFreestylerStyles} from '../types';

export type TCssTemplateMap = {[name: string]: TCssTemplate};

const styles = () => {};

const hyperstyle = (h_, templateMap: TCssTemplateMap) => {
    return (el, props, ...children) => {
        if (props) {
            const {styleName} = props;
            if (styleName) {
                const template = templateMap[styleName];
                if (template) {
                    const jsx = h_(el, props, ...children);

                    let styles: IFreestylerStyles;

                    if (typeof template === 'function') {
                        styles = template(props);
                    } else {
                        styles = template as IFreestylerStyles;
                    }

                    return styleit(styles, jsx);
                }
            }
        }

        return h_(el, props, ...children);
    };
};

export default hyperstyle;
