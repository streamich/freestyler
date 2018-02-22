import jsxstyle from './jsxstyle/v4';

export {jsxstyle};

const DIV = 'div';
const SPAN = 'span';

export const Box = jsxstyle(DIV, null);
export const Block = jsxstyle(DIV, {d: 'block'});
export const Inline = jsxstyle(SPAN, {d: 'inline'});
export const InlineBlock = jsxstyle(DIV, {d: 'inline-block'});
export const Row = jsxstyle(DIV, {d: 'flex', flexDirection: 'row'});
export const Column = jsxstyle(DIV, {d: 'flex', flexDirection: 'column'});
export const Grid = jsxstyle(DIV, {d: 'grid'});
