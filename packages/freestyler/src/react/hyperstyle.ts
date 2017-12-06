import {styleit} from './styleit';
import {IStyles, TCssTemplate} from 'freestyler-renderer/src/types';

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

                    let styles: IStyles;

                    if (typeof template === 'function') {
                        styles = template(props);
                    } else {
                        styles = template as IStyles;
                    }

                    return styleit(styles, jsx);
                }
            }
        }

        return h_(el, props, ...children);
    };
};

export default hyperstyle;
