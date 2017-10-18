import hoistGlobalsAndWrapContext from '../hoistGlobalsAndWrapContext';

describe('hoistGlobalsAndWrapContext', () => {
    it('just wraps the context around a simple case', () => {
        const tpl = {
            col: 'red',
        };
        const result = hoistGlobalsAndWrapContext(tpl, '.foo');
        expect(result).toEqual({
            '.foo': {
                col: 'red',
            },
        });
    });
});
