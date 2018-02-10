import {isClient} from '../util';

const createStyleElement = () => {
    const style = document.createElement('style');

    document.head.appendChild(style);

    return style;
};

export default createStyleElement;
