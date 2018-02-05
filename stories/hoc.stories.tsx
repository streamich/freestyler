import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');
import hoc from '../packages/freestyler/src/react/hoc';

const withOrangeBroder = hoc({
    border: '1px solid orange'
});

const DivWithRedBorder = withOrangeBroder('div');

storiesOf('hoc', module)
  .add('Basic', () => <DivWithRedBorder>Hello world</DivWithRedBorder>)
