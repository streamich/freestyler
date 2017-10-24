import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import Renderer from 'freestyler-renderer/src/Renderer';
import Classy from 'freestyler/src/react/Classy';

@Classy
class Input extends Component<any, any> {
    static style = {
        border: 0,
        col: '#000',
        out: 'none',
        '&:focus': {
            bdb: '1px solid #ddd',
        },
    };

    render() {
        return h('input', {
            onChange: e => this.props.onChange(e.target.value),
            value: this.props.value,
        });
    }
}

@Classy
class Close extends Component<any, any> {
    static style = {
        color: 'red',
        d: 'inline-block',
        bd: '1px solid red',
        pad: '0 3px',
        cur: 'pointer',
        bdrad: '3px',
    };

    render() {
        return h('span', {onClick: this.props.onClick}, 'close');
    }
}

@Classy
class ListItem extends Component<any, any> {
    static style = {
        color: 'blue',
        pad: '10px',
    };

    render() {
        return h(
            'li',
            {},
            h(Input, {value: this.props.value, onChange: this.props.onChange}),
            h(Close, {onClick: this.props.onClose}, 'close')
        );
    }
}

@Classy
class Button extends Component<any, any> {
    static style = {
        bg: '#07f',
        bdrad: '4px',
        col: '#fff',
        bd: 0,
        pad: '16px',
        'min-width': '200px',
        cur: 'pointer',
    };

    render() {
        return h('button', {onClick: this.props.onClick}, this.props.children);
    }
}

let key = 1;

class TodoApp extends Component<any, any> {
    state = {
        todos: [
            {
                value: 'Help',
                key: 1,
            },
        ],
    };

    render() {
        // prettier-ignore
        return h('div', {
                style: {}
            },
            'App...',

            h('ul', {},
                this.state.todos.map((todo, index) => h(ListItem, {
                    ...todo,
                    onChange: (value) => {
                        const todo = this.state.todos[index];
                        todo.value = value;
                        let todos = [...this.state.todos];
                        todos[index] = todo;
                        this.setState({todos});
                    },
                    onClose: () => {
                        const todos = [...this.state.todos.slice(0, index), ...this.state.todos.slice(index + 1)];
                        this.setState({todos});
                    },
                })),
            ),

            h(Button, {onClick: () => {
                key++;
                const todos = [...this.state.todos, {
                    value: '',
                    key,
                }];
                this.setState({todos});
            }}, 'Add'),
        );
    }
}

render(h(TodoApp), document.body);
