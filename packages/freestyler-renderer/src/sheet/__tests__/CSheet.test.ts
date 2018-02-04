import * as rewire from 'rewire';
import CSheet from '../CSheet';
import SCOPE_SENTINEL from '../../util/sentinel';

jest.mock('../../util/createStyleElement', () => ({
    default: () => ({
        sheet: {
            insertRule: jest.fn(),
            cssRules: {
                length: 0,
            },
        },
    }),
}));

describe('VSheet', () => {
    it('is a function', () => {
        expect(typeof CSheet).toBe('function');
    });

    describe('.inject()', () => {
        it('inserts rule into stylesheet', () => {
            const vsheet = new CSheet();
            vsheet.inject('', '*', 'color:red;');

            expect(vsheet.sheet.insertRule).toHaveBeenCalledTimes(1);
            expect((vsheet.sheet.insertRule as any).mock.calls[0]).toEqual(['*{color:red;}', 0]);
        });
    });

    describe('.insert()', () => {
        it('inserts rule into stylesheet', () => {
            const vsheet = new CSheet();
            vsheet.insert('', SCOPE_SENTINEL, 'font-weight', 'bold');

            expect((vsheet.sheet.insertRule as any).mock.calls[0][0].indexOf('font-weight:bold')).toBeGreaterThan(-1);
        });

        xit('caches rule', () => {});
    });

    xit('.insertBatch()', () => {});

    xit('.insertRaw()', () => {});
});
