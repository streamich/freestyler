import {IFreestylerStyles} from './types/styles';
import rule from './rule';

const StyleSheet = {
    create: (sheet: {[name: string]: IFreestylerStyles}) => {
        const result: {[name: string]: string} = {};
        for (const name in sheet) {
            const styles = sheet[name];
            Object.defineProperty(result, name, {
                get: function() {
                    return rule(styles);
                },
            });
        }
        return result;
    },
};

export default StyleSheet;
