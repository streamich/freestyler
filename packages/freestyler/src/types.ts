export type TComponent = any;
export type TComponentConstructor = new (...args) => TComponent;

export type TCssTemplateObject = {[rule: string]: any};
export type TCssTemplateCallback = (...args) => TCssTemplateObject;
export type TCssTemplate = TCssTemplateObject | TCssTemplateCallback;
export type TCssDynamicTemplate = () => TCssTemplate;
