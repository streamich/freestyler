import {isClient} from 'freestyler-util';

let createStyleElement;

if (isClient) {
    createStyleElement = () => {
        const style = document.createElement('style');

        document.head.appendChild(style);

        return style;
    };
} else {
    createStyleElement = () => {
        const style = {
            sheet: {
                insertRule: () => {},
                cssRules: [],
            },
        };

        return style;
    };
}

export default createStyleElement;
