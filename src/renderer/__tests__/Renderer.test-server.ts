import Renderer from '../Renderer';
import {expect} from 'chai';

describe('Renderer SSR', () => {
    it('is a function', () => {
        expect(typeof Renderer).to.equal('function');
    });

    it('is a constructor', () => {
        const renderer = new Renderer();

        expect(typeof renderer).to.equal('object');
    });

    describe('.renderAnon()', () => {
        it('returns a class name', () => {
            const renderer = new Renderer();
            const className = renderer.renderAnon({
                bg: 'tomato',
            });

            expect(typeof className).to.equal('string');
            expect(className.length > 0).to.be.true;
        });

        it('can get server-side CSS string', () => {
            const renderer = new Renderer();
            const className = renderer.renderAnon({
                bg: 'tomato',
            });
            const rawCss = renderer.sheets.toString();

            expect(rawCss).to.equal('.a{background:tomato;}');
        });
    });

    describe('.renderStatic()', () => {
        it('returns class names', () => {
            const renderer = new Renderer();
            const classNames = renderer.renderStatic(
                {},
                {
                    bg: 'tomato',
                    d: 'block',
                    cur: 'pointer',
                    w: '100%',
                }
            );

            expect(typeof classNames).to.equal('string');
            expect(classNames.length > 0).to.be.true;
        });

        it('can get server-side CSS string', () => {
            const renderer = new Renderer();
            const classNames = renderer.renderStatic(
                {},
                {
                    bg: 'tomato',
                    d: 'block',
                    cur: 'pointer',
                    w: '100%',
                }
            );

            const rawCss = renderer.sheets.toString();

            expect(rawCss).to.equal('.a{background:tomato;cursor:pointer;display:block;width:100%;}');
        });
    });

    describe('.render()', () => {
        it('returns class names', () => {
            const renderer = new Renderer();
            const classNames = renderer.render(
                {},
                {},
                null,
                {
                    bg: 'tomato',
                    d: 'block',
                    cur: 'pointer',
                    w: '100%',
                },
                []
            );

            expect(typeof classNames).to.equal('string');
            expect(classNames.length > 0).to.be.true;
        });

        it('can get server-side CSS string', () => {
            const renderer = new Renderer();
            const classNames = renderer.render(
                {},
                {},
                null,
                {
                    bg: 'red',
                    d: 'block',
                    cur: 'pointer',
                    w: '100%',
                },
                []
            );

            const rawCss = renderer.sheets.toString();

            expect(rawCss).to.equal('.a{background:red;cursor:pointer;display:block;width:100%;}');
        });
    });
});
