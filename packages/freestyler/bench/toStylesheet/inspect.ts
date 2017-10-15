import toStylesheet1 from './toStylesheet1';

const styles = {
    col: 'red',
    'font-size': '20px',
    bg: 'yellow',
    pos: 'absolute',
    cur: 'pointer',
    '&:hover': {
        col: 'blue',
    },
};

const result = toStylesheet1(styles);
console.log(result);
