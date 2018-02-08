import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');
import Button from './StyleSheet/Button';


storiesOf('StyleSheet', module)
  .add('Button', () => <Button />)
