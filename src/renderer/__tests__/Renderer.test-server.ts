import Renderer from '../Renderer';
import {expect} from 'chai';
import {rule} from '../..';
import renderer from '../../renderer';

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

            expect(rawCss.includes('background:tomato')).to.be.true;
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

            expect(rawCss.includes('background:tomato')).to.be.true;
            expect(rawCss.includes('cursor:pointer')).to.be.true;
            expect(rawCss.includes('display:block')).to.be.true;
            expect(rawCss.includes('width:100%')).to.be.true;
        });
    });

    describe('.render()', () => {
        it('returns class names', () => {
            const renderer = new Renderer();
            const classNames = renderer.render({}, {}, null, {
                bg: 'tomato',
                d: 'block',
                cur: 'pointer',
                w: '100%',
            });

            expect(typeof classNames).to.equal('string');
            expect(classNames.length > 0).to.be.true;
        });

        it('can get server-side CSS string', () => {
            const renderer = new Renderer();
            const classNames = renderer.render({}, {}, null, {
                bg: 'red',
                d: 'block',
                cur: 'pointer',
                w: '100%',
            });

            const rawCss = renderer.sheets.toString();

            expect(rawCss.includes('background:red')).to.be.true;
            expect(rawCss.includes('cursor:pointer')).to.be.true;
            expect(rawCss.includes('display:block')).to.be.true;
            expect(rawCss.includes('width:100%')).to.be.true;
        });
    });

    describe('.flush()', () => {
        it('flushes raw CSS', () => {
            const renderer = new Renderer();
            const classNames = renderer.renderStatic(
                {},
                {
                    bg: 'green',
                    d: 'block',
                    cur: 'pointer',
                    w: '100%',
                }
            );

            expect(typeof classNames).to.equal('string');
            expect(classNames.length > 1).to.be.true;

            const rawCss = renderer.flush();

            expect(rawCss.includes('background:green')).to.be.true;
            expect(rawCss.includes('cursor:pointer')).to.be.true;
            expect(rawCss.includes('display:block')).to.be.true;
            expect(rawCss.includes('width:100%')).to.be.true;

            const moreCss = renderer.sheets.toString();

            expect(moreCss).to.equal('');
        });

        it('can flush twice', () => {
            const renderer = new Renderer();
            const classNames = renderer.renderStatic(
                {},
                {
                    bg: 'green',
                    d: 'block',
                    cur: 'pointer',
                    w: '100%',
                }
            );

            expect(typeof classNames).to.equal('string');
            expect(classNames.length > 1).to.be.true;

            let rawCss = renderer.flush();

            expect(rawCss.includes('background:green')).to.be.true;
            expect(rawCss.includes('cursor:pointer')).to.be.true;
            expect(rawCss.includes('display:block')).to.be.true;
            expect(rawCss.includes('width:100%')).to.be.true;

            const moreCss = renderer.sheets.toString();

            expect(moreCss).to.equal('');

            renderer.renderStatic(
                {},
                {
                    bg: 'green',
                    d: 'block',
                    cur: 'pointer',
                    w: '100%',
                }
            );

            rawCss = renderer.flush();

            expect(rawCss.includes('background:green')).to.be.true;
            expect(rawCss.includes('cursor:pointer')).to.be.true;
            expect(rawCss.includes('display:block')).to.be.true;
            expect(rawCss.includes('width:100%')).to.be.true;
        });
    });

    describe('rule()', () => {
        it('flushes styles', () => {
            let cn = rule({
                bd: '1px solid red',
            });

            expect(renderer.flush().includes('border:1px solid red')).to.be.true;
            expect(!!renderer.flush()).to.be.false;

            cn = rule({
                bd: '1px solid tomato',
            });

            const rawCss = renderer.flush();

            expect(rawCss.includes('border:1px solid tomato')).to.be.true;
            expect(rawCss.includes('border:1px solid red')).to.be.false;
            expect(!!renderer.flush()).to.be.false;
        });
    });
});
