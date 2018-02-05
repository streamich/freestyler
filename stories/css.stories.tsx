import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');

import {StoryStatic1, StoryStatic2, StoryStatic3, StoryStatic4} from './css/StoryStatic';
import {Story4thGenRender1, Story4thGenRender2} from './css/Story4thGenRender';

storiesOf('@css/Static Decorator', module)
  .add('static .css', () => <StoryStatic1 />)
  .add('instance .css', () => <StoryStatic2 color='blue' />)
  .add('static .css()', () => <StoryStatic3 color='blue' />)
  .add('static and instance', () => <StoryStatic4 color='blue' />)

storiesOf('@css/.render() Decorator', module)
  .add('Basic', () => <Story4thGenRender1 />)
  .add('From props', () => <Story4thGenRender2 color='blue' />)
