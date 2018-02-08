import {createElement as h, Component} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');
import Example1 from './styleit/Example1';
import Example2 from './styleit/Example2';
import StyleitExample1 from './styleit/StyleitExample1';
import StyleitExample2 from './styleit/StyleitExample2';
import StyleitExample3 from './styleit/StyleitExample3';
import StyleitButton from './styleit/StyleitButton';

storiesOf('styleit()', module)
  .add('With JSX', () => <Example1 />)
  .add('With FaCC', () => <Example2 />)


storiesOf('<Styleit>', module)
  .add('With JSX', () => <StyleitExample1 />)
  .add('With FaCC', () => <StyleitExample2 />)
  .add('With JSX, props', () => <StyleitExample3 />)
  .add('Button', () => <StyleitButton />)
