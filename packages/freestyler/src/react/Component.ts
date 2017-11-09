import {Component, createElement as h} from 'react';
import transformCssComponent from './transform/cssComponent';

export abstract class CssComponent<TProps, TState> extends Component<TProps, TState> {
    constructor(props, context) {
        super(props, context);
        transformCssComponent(this);
    }
}

export default CssComponent;
