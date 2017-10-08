import {$$cn, $$cnt, hidden, noop, sym} from '../index';

describe('util', () => {
    describe('sym()', () => {
        it('returns a non-empty string', () => {
            const $$test = sym('test');
            expect(typeof $$test).toBe('string');
            expect(!!$$test).toBe(true);
        });
    });
    describe('hidden()', () => {
        it('adds a property on an object', () => {
            const obj = {};
            hidden(obj, 'foo', 'bar');
            expect(obj['foo']).toBe('bar');
        });
        it('property can be delted', () => {
            const obj = {};
            hidden(obj, 'foo', 'bar');
            delete obj['foo'];
        });
        it('properties are configured correctly', () => {
            const obj = {};
            hidden(obj, 'foo', 'bar');
            const desc = Object.getOwnPropertyDescriptor(obj, 'foo');
            expect(desc.writable).toBe(true);
            expect(desc.enumerable).toBe(false);
            expect(desc.configurable).toBe(true);
        });
    });
    it('exports $$cnt and $$cn symbols', () => {
        expect(!!$$cnt).toBe(true);
        expect(!!$$cn).toBe(true);
    });
    it('exports noop function', () => {
        expect(typeof noop).toBe('function');
        noop();
    });
});
