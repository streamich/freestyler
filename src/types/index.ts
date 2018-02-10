import {IFreestylerStyles} from './styles';

export * from './base';
export {IFreestylerStyles};

export type TCssTemplateCallback = (...args) => IFreestylerStyles;
export type TCssTemplate = IFreestylerStyles | TCssTemplateCallback;
export type TCssDynamicTemplate = (...args) => TCssTemplate;
