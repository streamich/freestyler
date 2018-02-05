import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');

import {Story4thGenRender} from './css/Story4thGenRender';

storiesOf('@css/.render() Decorator', module)
  .add('3rd Generation', () => <Story4thGenRender />);
