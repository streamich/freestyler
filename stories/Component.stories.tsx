import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
const {action} = require('@storybook/addon-actions');
const {linkTo} = require('@storybook/addon-links');
import Component from '../packages/freestyler/src/react/Component';
import {Container as ExampleButton} from './Component/Button';

class Example1 extends Component<any, any> {
    static css = {
        bd: '1px solid tomato'
    };

    css() {
        return {
            color: this.props.color
        };
    }

    render () {
        return <button>Hello world</button>;
    }
}

storiesOf('Component', module)
  .add('Basic', () => <Example1 color='orange' />)
  .add('Button', () => <ExampleButton />)
