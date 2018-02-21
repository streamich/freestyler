import {createElement as h, Component} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');
import Example1 from './jsxstyle/Example1';
import Example2 from './jsxstyle/Example2';
import Example3 from './jsxstyle/Example3';

storiesOf('jsxstyle', module)
  .add('Button', () => <Example1 />)
  .add('Custom blocks', () => <Example2 />)
  .add('Spinner', () => <Example3 w='20px' h='20px' />)
