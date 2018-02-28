const interpolateSelectors = (parents: string[], selector: string) => {
    const result = [];
    const selectors = selector.split(',');
    const len1 = parents.length;
    const len2 = selectors.length;

    for (let i = 0; i < len2; i++) {
        const sel = selectors[i];
        const pos = sel.indexOf('&');

        if (pos > -1) {
            const part1 = sel.substr(0, pos);
            const part2 = sel.substr(pos + 1);

            for (let j = 0; j < len1; j++) {
                const parent = parents[j];
                const replacedSelector = part1 + parent + part2;

                result.push(replacedSelector);
            }
        } else {
            for (let j = 0; j < len1; j++) {
                const parent = parents[j];

                if (parent) {
                    result.push(parent + ' ' + sel);
                } else {
                    result.push(sel);
                }
            }
        }
    }

    return result.join(',');
};

export default interpolateSelectors;
