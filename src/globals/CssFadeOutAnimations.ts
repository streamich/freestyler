import globalCss from './global';

const CssFadeOutAnimations = globalCss({
    '@keyframes foOpacity': {
        to: {
            op: 0,
        },
    },

    '@keyframes foAll': {
        to: {
            op: 0,
            transform: 'scale(.9)',
        },
    },

    '.foOpacity': {
        animation: 'foOpacity .25s',
        animationFillMode: 'forwards',
    },

    '.foAll': {
        animation: 'foAll .3s',
        animationFillMode: 'forwards',
    },
});

export default CssFadeOutAnimations;
