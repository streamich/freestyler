import {createElement as h, Component} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');
import Button from './styled/Example1';

storiesOf('styled()()', module)
  .add('Button', () => <Button>Click me!</Button>)
