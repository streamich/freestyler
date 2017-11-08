import {Component, createElement as h} from 'react';
import transform from './transform';
import {sym, hidden} from 'freestyler-util';

const sCssComponent = sym('CssComponent');

export abstract class CssComponent<TProps, TState> extends Component<TProps, TState> {
    constructor(props, context) {
        super(props, context);

        const Comp = this.constructor;
        if (!Comp[sCssComponent]) {
            hidden(Comp, sCssComponent, 1);

            const template = this.css.bind(this);
            transform(Comp, template);
        }
    }

    abstract css();
}

export default CssComponent;
