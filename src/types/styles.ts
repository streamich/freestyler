import {
    TValue,
    TValueNullable,
    TCursor,
    TOverflow,
    TPosition,
    TListStyle,
    TTextAlign,
    TTextDecoration,
    TFloat,
    TDisplay,
    TWordWrap,
} from './values';
import {TColor} from './color';
import {IAtomStyles} from './atoms';

export interface IOneWordStyles {
    color?: TColor;
    border?: TValueNullable;
    margin?: TValueNullable;
    display?: TDisplay;
    padding?: TValueNullable;
    opacity?: TValue;
    background?: string;
    cursor?: TCursor;
    overflow?: TOverflow;
    position?: TPosition;
    float?: TFloat;
    width?: TValueNullable;
    height?: TValueNullable;
    transition?: string;
    outline?: TValueNullable;
    visibility?: string;
    content?: string;
}

export interface IKebabStyles extends IOneWordStyles {
    'border-top'?: TValueNullable;
    'border-right'?: TValueNullable;
    'border-bottom'?: TValueNullable;
    'border-left'?: TValueNullable;
    'margin-top'?: TValueNullable;
    'margin-right'?: TValueNullable;
    'margin-bottom'?: TValueNullable;
    'margin-left'?: TValueNullable;
    'padding-top'?: TValueNullable;
    'padding-right'?: TValueNullable;
    'padding-bottom'?: TValueNullable;
    'padding-left'?: TValueNullable;
    'border-radius'?: string;
    'background-color'?: TColor;
    'font-size'?: TValue;
    'font-style'?: string;
    'font-weight'?: TValue;
    'font-family'?: string;
    'line-height'?: TValue;
    'box-sizing'?: string;
    'list-style'?: TListStyle;
    'text-align'?: TTextAlign;
    'text-decoration'?: TTextDecoration;
    'word-wrap'?: TWordWrap;
}

export interface ICamelStyles extends IOneWordStyles {
    borderTop?: TValueNullable;
    borderRight?: TValueNullable;
    borderBottom?: TValueNullable;
    borderLeft?: TValueNullable;
    marginTop?: TValueNullable;
    marginRight?: TValueNullable;
    marginBottom?: TValueNullable;
    marginLeft?: TValueNullable;
    paddingTop?: TValueNullable;
    paddingRight?: TValueNullable;
    paddingBottom?: TValueNullable;
    paddingLeft?: TValueNullable;
    borderRadius?: string;
    backgroundColor?: TColor;
    fontSize?: TValue;
    fontStyle?: string;
    fontWeight?: TValue;
    fontFamily?: string;
    lineHeight?: TValue;
    boxSizing?: string;
    listStyle?: TListStyle;
    textAlign?: TTextAlign;
    textDecoration?: TTextDecoration;
    wordWrap?: TWordWrap;
}

export interface IFreestylerStyles extends IAtomStyles, IKebabStyles, ICamelStyles {
    // Nested styles
    [selector: string]: IFreestylerStyles | TValue;
}
