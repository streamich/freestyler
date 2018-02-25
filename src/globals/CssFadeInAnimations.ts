import global from './global';

const CssFadeInAnimations = global({
    '@keyframes fi-opacity': {
        '0%': {
            op: 0,
        },
    },

    '@keyframes fi-scale': {
        '0%': {
            transform: 'scale(.9)',
        },
    },

    '@keyframes fi-drop': {
        '0%': {
            transform: 'translate(0,-20px)',
        },
    },

    '@keyframes fi-all': {
        '0%': {
            op: 0,
            transform: 'scale(.9) translate(0,-20px)',
        },
    },
});

export default CssFadeInAnimations;
