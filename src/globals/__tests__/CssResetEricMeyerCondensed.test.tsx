import {createElement as h} from 'react';
import CssResetEricMeyerCondensed from '../CssResetEricMeyerCondensed';
import {mount} from 'enzyme';

describe('globals', () => {
  describe('<CssResetEricMeyerCondensed>', () => {
    it('exists', () => {
      expect(CssResetEricMeyerCondensed).toBeInstanceOf(Function);
    });

    it('renders as expected', () => {
      const wrapper = mount(<CssResetEricMeyerCondensed />);

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
