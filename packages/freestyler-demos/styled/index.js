import React, {Component} from 'react';
import {render} from 'react-dom';
import {createFreestyler} from '../../freestyler/';

const css = createFreestyler(React);

class App extends Component {
    @css({
        bd: '1px solid red'
    })
    render() {
        return <div>Test</div>;
    }
}


render(<App/>, document.body);
