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

export type TCursor = string;
export type TOverflow = string;
export type TPosition = string;
export type TListStyle = string;
export type TTextAlign = string;
export type TTextDecoration = string;
export type TFloat = string;
export type TWordWrap = string;
export type TColor =
    | string
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'turquoise'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen';
export type TValue = string | number;
export type TValueZeroable = string | 0;

export interface IStyles {
    // Nested styles
    [selector: string]: IStyles | TValue;

    // Atoms
    d?: string;
    mar?: TValueZeroable;
    mart?: TValueZeroable;
    marr?: TValueZeroable;
    marb?: TValueZeroable;
    marl?: TValueZeroable;
    pad?: TValueZeroable;
    padt?: TValueZeroable;
    padr?: TValueZeroable;
    padb?: TValueZeroable;
    padl?: TValueZeroable;
    bd?: TValueZeroable;
    bdt?: TValueZeroable;
    bdr?: TValueZeroable;
    bdb?: TValueZeroable;
    bdl?: TValueZeroable;
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
    w?: TValueZeroable;
    h?: TValueZeroable;
    trs?: string;
    out?: TValueZeroable;
    vis?: string;
    ww?: TWordWrap;
    con?: string;

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
