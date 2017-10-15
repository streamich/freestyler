"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observable = function (state) {
    var listeners = [];
    var currentState = state;
    var get = function () { return currentState; };
    var set = function (state) {
        currentState = state;
        for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
            var listener = listeners_1[_i];
            listener(currentState);
        }
    };
    var sub = function (listener) {
        listeners.push(listener);
        return function () { return (listeners = listeners.filter(function (item) { return item !== listener; })); };
    };
    return {
        get: get,
        set: set,
        sub: sub,
    };
};
