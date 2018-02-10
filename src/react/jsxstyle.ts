import jsxstyle from './jsxstyle/implementation2';

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

// Deprecated?
export const Flex = jsxstyle(DIV, {d: 'flex'});
export const InlineFlex = jsxstyle(SPAN, {d: 'inline-flex'});
export const Table = jsxstyle('table', {d: 'table'});
export const TableRow = jsxstyle('tr', {d: 'table-row'});
export const TableCell = jsxstyle('td', {d: 'table-cell'});
