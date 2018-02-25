import {createElement as h, Component} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');
import CssFadeInAnimations from '../src/globals/CssFadeInAnimations';
import CssFadeOutAnimations from '../src/globals/CssFadeOutAnimations';

const Card = () => <div style={{
    width: 200,
    height: 200,
    background: 'red',
    margin: '40px',
}} />;

storiesOf('Globals/CssFadeInAnimations', module)
    .add('fiOpacity', () =>
        <div>
            <CssFadeInAnimations />
            <div style={{animation: 'fiOpacity 2s'}}>
                <Card />
            </div>
        </div>
    )
    .add('fiScale', () =>
        <div>
            <CssFadeInAnimations />
            <div style={{animation: 'fiScale 2s'}}>
                <Card />
            </div>
        </div>
    )
    .add('fiOpacity + fiScale', () =>
        <div>
            <CssFadeInAnimations />
            <div style={{animation: 'fiScale .3s, fiOpacity .3s'}}>
                <Card />
            </div>
        </div>
    )
    .add('fiDrop', () =>
        <div>
            <CssFadeInAnimations />
            <div style={{animation: 'fiDrop .3s'}}>
                <Card />
            </div>
        </div>
    )
    .add('fiAll', () =>
        <div>
            <CssFadeInAnimations />
            <div style={{animation: 'fiAll .3s'}}>
                <Card />
            </div>
        </div>
    )
    .add('class="fiAll"', () =>
        <div>
            <CssFadeInAnimations />
            <div className="fiAll">
                <Card />
            </div>
        </div>
    )
    .add('class="fiOpacity"', () =>
        <div>
            <CssFadeInAnimations />
            <div className="fiOpacity">
                <Card />
            </div>
        </div>
    )

storiesOf('Globals/CssFadeOutAnimations', module)
    .add('foOpacity', () =>
        <div>
            <CssFadeOutAnimations />
            <div className='foOpacity'>
                <Card />
            </div>
        </div>
    )
    .add('foAll', () =>
        <div>
            <CssFadeOutAnimations />
            <div className='foAll'>
                <Card />
            </div>
        </div>
    )
