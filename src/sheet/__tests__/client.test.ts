import {ClientRule, ClientSheet} from '../client';

describe('sheet', () => {
    describe('ClientRule', () => {
        it('exists', () => {
            expect(ClientRule).toBeInstanceOf(Function);
        });

        it('can instantiate', () => {
            const style = document.createElement('style');
            const rule = new ClientRule(style.style);
        });

        describe('.put()', () => {
            it('inserts declarations into <style>', () => {
                const style = document.createElement('style');

                style.style.setProperty = jest.fn();

                const rule = new ClientRule(style.style);

                rule.put([['color', 'tomato']]);

                expect(style.style.setProperty).toHaveBeenCalledTimes(1);
                expect(style.style.setProperty).toHaveBeenCalledWith('color', 'tomato');
            });
        });

        describe('.putRaw()', () => {
            it('inserts string declarations into <style>', () => {
                const style: any = {};
                const rule = new ClientRule(style as any);

                rule.putRaw('color:tomato');

                expect(style.cssText).toBe('color:tomato');
            });
        });

        describe('.trunc', () => {
            it('removes declarations', () => {
                const style: any = {
                    cssText: 'color:tomato',
                };
                const rule = new ClientRule(style);

                rule.decl = [['color', 'tomato']];

                rule.trunc();

                expect(rule.decl).toBe(null);
                expect(rule.style.cssText).toBe('');
            });
        });
    });
});
