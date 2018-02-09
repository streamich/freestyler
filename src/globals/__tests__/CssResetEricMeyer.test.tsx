import {createElement as h} from 'react';
import CssResetEricMeyer from '../CssResetEricMeyer';
import {mount} from 'enzyme';

describe('globals', () => {
  describe('<CssResetEricMeyer>', () => {
    it('exists', () => {
      expect(CssResetEricMeyer).toBeInstanceOf(Function);
    });

    it('renders as expected', () => {
      const wrapper = mount(<CssResetEricMeyer />);

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
