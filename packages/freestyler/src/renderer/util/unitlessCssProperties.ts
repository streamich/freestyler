const UNITLESS_NUMBER_PROPS = [
    'animation-iteration-count',
    'border-image-outset',
    'border-image-slice',
    'border-image-width',
    'box-flex',
    'box-flex-group',
    'box-ordinal-group',
    'column-count',
    'columns',
    'flex',
    'flex-grow',
    'flex-positive',
    'flex-shrink',
    'flex-negative',
    'flex-order',
    'grid-row',
    'grid-row-end',
    'grid-row-span',
    'grid-row-start',
    'grid-column',
    'grid-column-end',
    'grid-column-span',
    'grid-column-start',
    'font-weight',
    'line-clamp',
    'line-height',
    'opacity',
    'order',
    'orphans',
    'tabSize',
    'widows',
    'z-index',
    'zoom',

    // SVG-related properties
    'fill-opacity',
    'flood-opacity',
    'stop-opacity',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke-width',
];

const TRUE = 1;
const WEBKIT = '-webkit-';
const MS = '-ms-';
const MOZ = '-moz-';
const O = '-o-';
const unitlessCssProperties = {};

for (let i = 0; i < UNITLESS_NUMBER_PROPS.length; i++) {
    const prop = UNITLESS_NUMBER_PROPS[i];

    unitlessCssProperties[prop] = TRUE;
    unitlessCssProperties[WEBKIT + prop] = TRUE;
    unitlessCssProperties[MS + prop] = TRUE;
    unitlessCssProperties[MOZ + prop] = TRUE;
    unitlessCssProperties[O + prop] = TRUE;
}

export default unitlessCssProperties;
