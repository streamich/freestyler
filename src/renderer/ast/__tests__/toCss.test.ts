import toCss from '../toCss';

describe('toCss', () => {
    it('basic example', () => {
        const css = toCss([['.foo', [['color', 'red']]]]);
        expect(css).toBe('.foo{color:red;}');
    });

    it('@-rule', () => {
        const css = toCss([
            ['.foo', [['color', 'red']]],
            {
                prelude: '@media screen',
                rules: [['.foo', [['color', 'red']]]],
            },
        ] as any);
        expect(css).toBe('.foo{color:red;}@media screen{.foo{color:red;}}');
    });
});
