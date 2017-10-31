import {IStyles} from 'freestyler-renderer/src/types';
import rule from './rule';

const StyleSheet = {
    create: (sheet: {[name: string]: IStyles}) => {
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
