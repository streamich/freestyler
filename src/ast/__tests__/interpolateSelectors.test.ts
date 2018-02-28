import interpolateSelectors from '../interpolateSelectors';

describe('interpolateSelectors', () => {
    it('prepends selectors if no & operand', () => {
        expect(interpolateSelectors(['.one', '.two'], '.test')).toBe('.one .test,.two .test');
    });

    it('expands & operand after', () => {
        expect(interpolateSelectors(['.one', '#two'], '.test &')).toBe('.test .one,.test #two');
    });

    it('expands & operand before', () => {
        expect(interpolateSelectors(['.test'], '&:hover')).toBe('.test:hover');
    });

    it('expands & operand before and preserves spaces', () => {
        expect(interpolateSelectors(['.one', '.two'], '& .test')).toBe('.one .test,.two .test');
    });
});
