import {createElement as h, Component} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');
import Example1 from './styleit/Example1';
import Example2 from './styleit/Example2';

storiesOf('styleit()', module)
  .add('styleit() with JSX', () => <Example1 />)
  .add('styleit() with FaCC', () => <Example2 />)
