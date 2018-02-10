export type TDisplay = 'block' | 'inline-block' | 'inline' | 'none' | 'table' | 'table-cell';

export type TCursor =
    | 'auto'
    | 'default'
    | 'none'
    | 'context-menu'
    | 'help'
    | 'pointer'
    | 'progress'
    | 'wait'
    | 'cell'
    | 'crosshair'
    | 'text'
    | 'vertical-text'
    | 'alias'
    | 'copy'
    | 'move'
    | 'no-drop'
    | 'not-allowed'
    | 'all-scroll'
    | 'col-resize'
    | 'row-resize'
    | 'n-resize'
    | 'e-resize'
    | 's-resize'
    | 'w-resize'
    | 'ne-resize'
    | 'nw-resize'
    | 'se-resize'
    | 'sw-resize'
    | 'ew-resize'
    | 'ns-resize'
    | 'nesw-resize'
    | 'nwse-resize'
    | 'zoom-in'
    | 'zoom-out'
    | 'grab'
    | 'grabbing';

export type TOverflow = 'visible' | 'hidden' | 'scroll' | 'auto';

export type TPosition = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

export type TListStyle = 'square' | 'inside' | 'none' | 'inherit' | 'initial' | 'unset' | string;

export type TTextAlign = 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'justify-all' | 'match-parent';

export type TTextDecorationLine = 'none' | 'underline' | 'overline' | 'line-through' | 'blink';

export type TTextDecorationStyle = 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';

export type TTextDecoration = TTextDecorationLine | string;

export type TFloat = 'left' | 'right' | 'none' | 'inherit';

export type TWordWrap = 'normal' | 'break-word' | 'initial' | 'inherit';

export type TOverflowWrap = 'normal' | 'break-word';

export type TValue = string | number;

export type TValueNullable = string | 0;
