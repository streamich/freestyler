import {createElement as h, Component} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');
import CssFadeInAnimations from '../src/globals/CssFadeInAnimations';

const Card = () => <div style={{
    width: 200,
    height: 200,
    background: 'red',
    margin: '40px',
}} />;

storiesOf('Globals/CssFadeInAnimations', module)
    .add('fi-opacity', () =>
        <div>
            <CssFadeInAnimations />
            <div style={{animation: 'fi-opacity 2s'}}>
                <Card />
            </div>
        </div>
    )
    .add('fi-scale', () =>
        <div>
            <CssFadeInAnimations />
            <div style={{animation: 'fi-scale 2s'}}>
                <Card />
            </div>
        </div>
    )
    .add('fi-opacity + fi-scale', () =>
        <div>
            <CssFadeInAnimations />
            <div style={{animation: 'fi-scale .3s, fi-opacity .3s'}}>
                <Card />
            </div>
        </div>
    )
    .add('fi-drop', () =>
        <div>
            <CssFadeInAnimations />
            <div style={{animation: 'fi-drop 2s'}}>
                <Card />
            </div>
        </div>
    )
    .add('fi-all', () =>
        <div>
            <CssFadeInAnimations />
            <div style={{animation: 'fi-all 2s'}}>
                <Card />
            </div>
        </div>
    )
