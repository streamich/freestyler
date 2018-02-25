import global from './global';

const CssFadeOutAnimations = global({
    '@keyframes foOpacity': {
        '100%': {
            op: 0,
        },
    },

    '@keyframes foScale': {
        '100%': {
            transform: 'scale(.9)',
        },
    },

    '@keyframes foDrop': {
        '100%': {
            transform: 'translate(0,-20px)',
        },
    },

    '@keyframes foAll': {
        '100%': {
            op: 0,
            transform: 'scale(.9) translate(0,-20px)',
        },
    },

    '.foOpacity': {
        animation: 'foOpacity .5s',
    },

    '.foAll': {
        animation: 'foAll .3s',
    },
});

export default CssFadeOutAnimations;
