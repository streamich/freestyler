import {createElement as h} from 'react';
import {mount} from 'enzyme';
import {Theme, Themed, themed} from '../index';

describe('themestyler', () => {
    describe('<Theme/>', () => {
        it('<Theme/> passes theme to <Themed/>', () => {
            const wrapper = mount(
                h(
                    Theme,
                    {value: {color: 'red'}},
                    h(
                        'div',
                        {},
                        h(Themed, {}, theme => {
                            return h('span', {}, theme.color);
                        })
                    )
                )
            );
            expect(wrapper.find('span').props().children).toBe('red');
        });
        xit('merges multiple themes together', () => {});
    });
    describe('themed()', () => {
        const Box = ({theme}) => {
            return h('div', {}, theme.color);
        };
        const BoxThemed = themed(Box);
        const wrapper = mount(h(Theme, {value: {color: 'red'}}, h(BoxThemed)));
        expect(wrapper.find('div').props().children).toBe('red');
    });
});
