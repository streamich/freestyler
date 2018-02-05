const interpolateSelectors = (prop, selectors) => {
    let props = prop.split(',');
    let selectorList = [];

    for (var p of props) {
        if (p.indexOf('&') > -1) {
            for (var sel of selectors) {
                selectorList.push(p.replace('&', sel));
            }
        } else {
            for (var sel of selectors) {
                selectorList.push(sel + ' ' + p);
            }
        }
    }
    return selectorList.join(',');
};

export default interpolateSelectors;
