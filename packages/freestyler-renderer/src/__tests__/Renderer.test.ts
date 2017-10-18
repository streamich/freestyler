import Renderer from '../Renderer';

describe('Renderer', () => {
    describe('renderFluid', () => {
        it('works', () => {
            const renderer = new Renderer();
            renderer.renderFluid(
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
                            ff: 'Verdatan',
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
