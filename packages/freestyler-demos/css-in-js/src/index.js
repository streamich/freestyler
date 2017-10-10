import React, {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import {createFreestyler} from 'freestyler';

const css = createFreestyler(React);

class App extends Component {
    @css({
        bd: '1px solid red'
    })
    render() {
        return <div>Test</div>;
    }
}

const el = document.createElement('div');
document.body.appendChild(el);
render(<App/>, el);
