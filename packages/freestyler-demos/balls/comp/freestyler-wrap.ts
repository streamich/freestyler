import wrap from 'freestyler/src/react/wrap';

export default wrap(
    'div',
    {
        pos: 'absolute',
        bdrad: '50%',
        bg: 'red',
        w: '20px',
        h: '20px',
    },
    () => ({x, y}) => ({
        top: y + 'px',
        left: x + 'px',
    })
);
