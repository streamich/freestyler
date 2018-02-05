import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');

import {Story3rdGenStatic1, Story3rdGenStatic2} from './css/Story3rdGenStatic';
import {Story4thGenRender1, Story4thGenRender2} from './css/Story4thGenRender';

storiesOf('@css/Static Decorator', module)
  .add('static .css', () => <Story3rdGenStatic1 />)
  .add('instance .css', () => <Story3rdGenStatic2 color='blue' />)

storiesOf('@css/.render() Decorator', module)
  .add('Basic', () => <Story4thGenRender1 />)
  .add('From props', () => <Story4thGenRender2 color='blue' />)
