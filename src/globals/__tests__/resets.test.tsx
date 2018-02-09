import {createElement as h} from 'react';
import CssResetEricMeyer from '../CssResetEricMeyer';
import CssResetEricMeyerCondensed from '../CssResetEricMeyerCondensed';
import CssResetMinimalistic from '../CssResetMinimalistic';
import CssResetMinimalistic2 from '../CssResetMinimalistic2';
import CssResetMinimalistic3 from '../CssResetMinimalistic3';
import CssResetPoorMan from '../CssResetPoorMan';
import CssResetShaunInman from '../CssResetShaunInman';
import CssResetSiolon from '../CssResetSiolon';
import CssResetTantek from '../CssResetTantek';
import CssResetTripoli from '../CssResetTripoli';
import {mount} from 'enzyme';

describe('globals', () => {
  describe('CSS resets', () => {
    it('<CssResetEricMeyer>', () => {
        const wrapper = mount(<CssResetEricMeyer />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('<CssResetEricMeyerCondensed>', () => {
        const wrapper = mount(<CssResetEricMeyerCondensed />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('<CssResetMinimalistic>', () => {
        const wrapper = mount(<CssResetMinimalistic />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('<CssResetMinimalistic2>', () => {
        const wrapper = mount(<CssResetMinimalistic2 />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('<CssResetMinimalistic3>', () => {
        const wrapper = mount(<CssResetMinimalistic3 />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('<CssResetPoorMan>', () => {
        const wrapper = mount(<CssResetPoorMan />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('<CssResetShaunInman>', () => {
        const wrapper = mount(<CssResetShaunInman />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('<CssResetSiolon>', () => {
        const wrapper = mount(<CssResetSiolon />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('<CssResetTantek>', () => {
        const wrapper = mount(<CssResetTantek />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('<CssResetTripoli>', () => {
        const wrapper = mount(<CssResetTripoli />);

        expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
