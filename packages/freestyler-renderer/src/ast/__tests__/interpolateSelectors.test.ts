import interpolateSelectors from '../interpolateSelectors';

describe('interpolateSelectors', () => {
    it('prepends selectors if no & operand', () => {
        expect(interpolateSelectors('.test', ['.one', '.two'])).toBe('.one .test,.two .test');
    });
    it('expands & operand after', () => {
        expect(interpolateSelectors('.test &', ['.one', '#two'])).toBe('.test .one,.test #two');
    });
    it('expands & operand before', () => {
        expect(interpolateSelectors('&:hover', ['.test'])).toBe('.test:hover');
    });
    it('expands & operand before and preserves spaces', () => {
        expect(interpolateSelectors('& .test', ['.one', '.two'])).toBe('.one .test,.two .test');
    });
});
