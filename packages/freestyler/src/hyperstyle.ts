import {TCssTemplate} from 'freestyler-renderer/src/types';

export type TCssTemplateMap = {[name: string]: TCssTemplate};

const styles = () => {};

const hyperstyle = (h_, templateMap: TCssTemplateMap) => {
    return (el, props, ...children) => {
        if (props) {
            const {styleName} = props;
            if (styleName) {
                const template = templateMap[styleName];
                if (template) {
                }
            }
        }
    };
};

export default hyperstyle;
