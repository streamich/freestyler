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

export interface IAtomStyles {
    d?: TDisplay;
    mar?: TValueNullable;
    mart?: TValueNullable;
    marr?: TValueNullable;
    marb?: TValueNullable;
    marl?: TValueNullable;
    pad?: TValueNullable;
    padt?: TValueNullable;
    padr?: TValueNullable;
    padb?: TValueNullable;
    padl?: TValueNullable;
    bd?: TValueNullable;
    bdt?: TValueNullable;
    bdr?: TValueNullable;
    bdb?: TValueNullable;
    bdl?: TValueNullable;
    bdrad?: string;
    col?: TColor;
    op?: TValue;
    bg?: string;
    bgc?: TColor;
    fz?: TValue;
    fs?: string;
    fw?: TValue;
    ff?: string;
    lh?: TValue;
    bxz?: string;
    cur?: TCursor;
    ov?: TOverflow;
    pos?: TPosition;
    ls?: TListStyle;
    ta?: TTextAlign;
    td?: TTextDecoration;
    fl?: TFloat;
    w?: TValueNullable;
    h?: TValueNullable;
    trs?: string;
    out?: TValueNullable;
    vis?: string;
    ww?: TWordWrap;
    con?: string;
}
