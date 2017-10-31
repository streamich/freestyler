import unitlessCssProperties from '../util/unitlessCssProperties';

const valueToString: (prop: string, value: any) => string = (prop, value) => {
    if (process.env.FREESTYLER_NUMBERS_TO_PX) {
        if (typeof value === 'number') {
            if (unitlessCssProperties[prop]) {
                value = '' + value;
            } else {
                value = value + 'px';
            }
        } else {
            value = '' + value;
        }
    } else {
        value = '' + value;
    }

    return value;
};

export default valueToString;
