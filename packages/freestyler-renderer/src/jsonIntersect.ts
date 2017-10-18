export type TFlatJson = {[prop: string]: any};

const jsonIntersect: (base: TFlatJson, next: TFlatJson) => TFlatJson = (base, next) => {
    let intersection = {};

    for (let prop in base) {
        const value = base[prop];
        if (value === next[prop]) intersection[prop] = value;
    }

    return intersection;
};

export default jsonIntersect;
