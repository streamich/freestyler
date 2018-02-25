import {createElement as h, Component} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');
import Example1 from './rule/Example1';
import {Sidebar} from './rule/Sidebar';

storiesOf('rule()', module)
    .add('Button', () => <Example1 />)
    .add('Sidebar', () =>
        <Sidebar open>
            Content
        </Sidebar>
    )
