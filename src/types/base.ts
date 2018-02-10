import {TColor} from './color';

export type TComponent = any;
export type TComponentConstructor = new (...args) => TComponent;

export type TCssTemplateCallback = (...args) => IStyles;
export type TCssTemplate = IStyles | TCssTemplateCallback;
export type TCssDynamicTemplate = (...args) => TCssTemplate;

export type TElement = string | TComponentConstructor | ((props?, state?, context?) => any);

export interface TFreestyleComponent extends TComponentConstructor {
    css(newDynamicTemplate: TCssTemplate);
}

export type TStyled<TResult> = (template?: TCssTemplate, dynamicTemplate?: TCssTemplate) => TResult;

export type THoc = (Element: TElement) => TElement;
export type TPrimitiveStyled = (Element: TElement) => TStyled<TFreestyleComponent>;
export type TPrimitiveHoc = TStyled<THoc>;

export interface ICss {
    (tpl: TCssTemplate, second?: any): any;
    (tpl: TCssTemplate, jsx): any;
    css;
    wrap;
    // styled: TPrimitiveStyled;
    styled;
    styleit;
    hoc: TPrimitiveHoc;
    facc;
    div;
    span;
    // div: TStyled<TFreestyleComponent>;
    // span: TStyled<TFreestyleComponent>;
}

export interface IStyles {
    // Nested styles
    [selector: string]: IStyles | TValue;

    // CSS properties
    color?: TColor;
    border?: TValueZeroable;
    'border-top'?: TValueZeroable;
    'border-right'?: TValueZeroable;
    'border-bottom'?: TValueZeroable;
    'border-left'?: TValueZeroable;
    margin?: TValueZeroable;
    'margin-top'?: TValueZeroable;
    'margin-right'?: TValueZeroable;
    'margin-bottom'?: TValueZeroable;
    'margin-left'?: TValueZeroable;
}
