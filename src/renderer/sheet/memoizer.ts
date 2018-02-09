export interface Imemoizer {
    length: number;
    next: () => number;
    getId: (...keys: string[]) => number;
}

const EMPTY = '_';

const memoizer: () => Imemoizer = () => {
    let offset = 10;
    let msb = 35;
    let power = 1;
    let cache = {};

    const self = {
        length: 0,

        next: () => {
            const vcount = self.length + offset;
            if (vcount === msb) {
                offset += (msb + 1) * 9;
                msb = Math.pow(36, ++power) - 1;
            }
            self.length++;
            return vcount;
        },

        getId: function() {
            let curr: any = cache;
            const lastIndex = arguments.length - 1;
            const lastStep = arguments[lastIndex];

            for (let i = 0; i < lastIndex; i++) {
                const step = arguments[i] || EMPTY;
                if (!curr[step]) curr[step] = {};
                curr = curr[step];
            }

            if (!curr[lastStep]) curr[lastStep] = self.next();
            return curr[lastStep];
        },
    };

    return self;
};

export default memoizer;
