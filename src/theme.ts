import {Component} from "react";

const observable = (state) => {
    let listeners = [];
    let currentState = state;

    const getState = () => currentState;

    const setState = state => {
        currentState = state;
        for (const listener of listeners) listener(currentState);
    };

    const subscribe = listener => {
        listeners.push(listener);

        return () => listeners = listeners.filter(item => item !== listener);
    };

    return {
        getState,
        setState,
        subscribe,
    };
};

export class Theme extends Component {

}



