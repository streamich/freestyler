import global from './global';

const CssFadeInAnimations = global({
    '@keyframes fiOpacity': {
        '0%': {
            op: 0,
        },
    },

    '@keyframes fiScale': {
        '0%': {
            transform: 'scale(.9)',
        },
    },

    '@keyframes fiDrop': {
        '0%': {
            transform: 'translate(0,-20px)',
        },
    },

    '@keyframes fiAll': {
        '0%': {
            op: 0,
            transform: 'scale(.9) translate(0,-20px)',
        },
    },

    '.fiOpacity': {
        animation: 'fiOpacity .5s',
    },

    '.fiAll': {
        animation: 'fiAll .3s',
    },
});

export default CssFadeInAnimations;
