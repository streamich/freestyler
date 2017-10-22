const supportsCssVariables = () => (window as any).CSS && CSS.supports && CSS.supports('--a', '0');

export default supportsCssVariables;
