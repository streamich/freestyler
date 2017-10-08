"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = function () { };
exports.sym = function (name) { return "@@freestyler/" + name; };
exports.$$cn = exports.sym('cn');
exports.$$cnt = exports.sym('cnt');
exports.hidden = function (obj, key, value) {
    return Object.defineProperty(obj, key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: value,
    });
};
