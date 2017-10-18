export type TFlatJson = {[prop: string]: any};

const jsonSubtract: (base: TFlatJson, negative: TFlatJson) => TFlatJson = (base, negative) => {
    let subtraction = {};

    for (let prop in base) {
        const value = base[prop];
        if (value !== negative[prop]) subtraction[prop] = value;
    }

    return subtraction;
};

export default jsonSubtract;
