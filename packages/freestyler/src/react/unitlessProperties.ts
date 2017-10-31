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

const unitlessProperties = {};

for (let i = 0; i < UNITLESS_NUMBER_PROPS.length; i++) {
    const prop = UNITLESS_NUMBER_PROPS[i];
    unitlessProperties[prop] = 1;
    unitlessProperties['-webkit-' + prop] = 1;
    unitlessProperties['-ms-' + prop] = 1;
    unitlessProperties['-moz-' + prop] = 1;
    unitlessProperties['-o-' + prop] = 1;
}

export default unitlessProperties;
