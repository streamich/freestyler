import Renderer from '../Renderer';

describe('Renderer', () => {
    describe('renderFluid', () => {
        xit('works', () => {
            const renderer = new Renderer();
            renderer.render(
                {} as any,
                {},
                null,
                () => ({
                    '&': {
                        color: 'red',
                    },
                    '&:hover': {
                        color: 'blue',
                    },
                    '&:active': {
                        color: 'yellow',
                        $txt: {
                            ff: 'Verdana',
                        },
                    },
                    '& .icon': {
                        'text-align': 'center',
                        '& svg': {
                            fill: 'black',
                        },
                    },
                    '.is-mobile &': {
                        color: 'black',
                    },
                    '.global': {
                        bg: '#eee',
                    },
                }),
                []
            );
        });
    });
});
