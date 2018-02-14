import {createElement as h, Component} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');
import hot from '../src/react/hot';
import Button from './hot/Button';
import ChangingColor from './hot/ChangingColor';

const BorderedButton = hot('button', {
  border: '1px solid tomato'
});

storiesOf('HOT', module)
  .add('Basic example', () => {
    const BorderedBlueButton = BorderedButton({color: 'blue'});
    return <BorderedBlueButton>Click me!</BorderedBlueButton>;
  })
  .add('Button', () => <Button color='pink' />)
  .add('Changing color', () => <ChangingColor />)
