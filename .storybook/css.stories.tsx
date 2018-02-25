import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');

import {StoryStatic1, StoryStatic2, StoryStatic3, StoryStatic4, Button} from './css/StoryStatic';
import {Story4thGenRender1, Story4thGenRender2} from './css/Story4thGenRender';
import {Container as ExampleButton} from './css/Button';
import {Checkbox} from './css/Checkbox';
import {Input} from './css/Input';
import checkbox from './css/checkbox-method-decorator';

storiesOf('@css/Static Decorator', module)
  .add('static .css', () => <StoryStatic1 />)
  .add('instance .css', () => <StoryStatic2 color='blue' />)
  .add('static .css()', () => <StoryStatic3 color='blue' />)
  .add('static and instance', () => <StoryStatic4 color='blue' />)
  .add('Button', () => (
    <div>
      <Button color='blue' />
      <Button color='tomato' />
    </div>
  ))
  .add('Checkbox', () => <Checkbox on />)

storiesOf('@css/.render() Decorator', module)
  .add('Checkbox', () => checkbox)
  .add('Basic', () => <Story4thGenRender1 />)
  .add('From props', () => <Story4thGenRender2 color='blue' />)
  .add('Button', () => <ExampleButton />)
  .add('Input', () => <Input />)
