import global from './global';

const CssFadeInAnimations = global({
    '@keyframes fiOpacity': {
        from: {
            op: 0,
        },
    },

    '@keyframes fiScale': {
        from: {
            transform: 'scale(.9)',
        },
    },

    '@keyframes fiDrop': {
        from: {
            transform: 'translate(0,-20px)',
        },
    },

    '@keyframes fiAll': {
        from: {
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
