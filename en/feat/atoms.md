# Atoms

Atoms are shorthand notations for common CSS rules. For example, instead of writing

```js
const template = {
    width: '100px',
    height: '100px',
    'border-radius': '5px',
    'background-color': 'yellow',
};
```

you can instead write:

```js
const template = {
    w: '100px',
    h: '100px',
    bdrad: '5px',
    bgc: 'yellow',
};
```

List of supported atoms:

```js
const atoms = {
    d:      'display',
    mar:    'margin',
    mart:   'margin-top',
    marr:   'margin-right',
    marb:   'margin-bottom',
    marl:   'margin-left',
    pad:    'padding',
    padt:   'padding-top',
    padr:   'padding-right',
    padb:   'padding-bottom',
    padl:   'padding-left',
    bd:     'border',
    bdt:    'border-top',
    bdr:    'border-right',
    bdb:    'border-bottom',
    bdl:    'border-left',
    bdrad:  'border-radius',
    col:    'color',
    op:     'opacity',
    bg:     'background',
    bgc:    'background-color',
    fz:     'font-size',
    fs:     'font-style',
    fw:     'font-weight',
    ff:     'font-family',
    lh:     'line-height',
    bxz:    'box-sizing',
    cur:    'cursor',
    ov:     'overflow',
    pos:    'position',
    ls:     'list-style',
    ta:     'text-align',
    td:     'text-decoration',
    fl:     'float',
    w:      'width',
    h:      'height',
    trs:    'transition',
    out:    'outline',
    vis:    'visibility',
    ww:     'word-wrap',
    con:    'content',
}
```
> R.I.P. [`absurdjs`](https://github.com/krasimir/absurd), your [Atoms](http://absurdjs.com/pages/css-preprocessing/organic-css/atoms/) will be in our hearts forever.
