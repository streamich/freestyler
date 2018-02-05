import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');

import {Story3rdGenStatic1, Story3rdGenStatic2} from './css/Story3rdGenStatic';
import {Story4thGenRender} from './css/Story4thGenRender';

storiesOf('@css/Static Decorator', module)
  .add('static css', () => <Story3rdGenStatic1 />)
  .add('static styles', () => <Story3rdGenStatic2 />)

storiesOf('@css/.render() Decorator', module)
  .add('Basic', () => <Story4thGenRender />);
