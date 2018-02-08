export default function loadBalancer(...methods) {
    let cnt = 0;
    const argumentsParent = arguments;
    const length = arguments.length;
    return function(...args: any[]) {
        const method = argumentsParent[cnt];
        cnt = (cnt + 1) % length;
        return method.apply(this, arguments);
    };
}
