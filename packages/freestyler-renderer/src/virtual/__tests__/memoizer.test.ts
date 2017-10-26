import memoizer from '../memoizer';

describe('memoizer', () => {
    it('is a function', () => {
        expect(typeof memoizer).toBe('function');
    });

    it('returns an object', () => {
        expect(typeof memoizer()).toBe('object');
    });

    it('returned object has expected interface', () => {
        const memo = memoizer();

        expect(typeof memo.length).toBe('number');
        expect(typeof memo.next).toBe('function');
        expect(typeof memo.getId).toBe('function');
    });

    describe('.next()', () => {
        it('returns unique incremental numbers', () => {
            const memo = memoizer();
            let last = memo.next();
            for (let i = 0; i < 100; i++) {
                let next = memo.next();
                expect(next).toBeGreaterThan(last);
                last = next;
            }
        });
    });

    describe('.getId(...keys)', () => {
        it('caches by a single key', () => {
            const memo = memoizer();
            const value = memo.getId('foo');

            expect(value).toBe(memo.getId('foo'));
        });

        it('caches by 4 keys', () => {
            const memo = memoizer();
            const value = memo.getId('@media (min-width: 1000px)', '&.test', 'width', '100%');

            expect(value).toBe(memo.getId('@media (min-width: 1000px)', '&.test', 'width', '100%'));
        });

        it('handles empty keys', () => {
            const memo = memoizer();
            const value = memo.getId('', '&.test', 'width', '100%');

            expect(value).not.toBe(memo.getId('@media (min-width: 1000px)', '&.test', 'width', '100%'));
            expect(value).toBe(memo.getId('', '&.test', 'width', '100%'));
        });
    });
});
