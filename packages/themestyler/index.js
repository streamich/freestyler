"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var freestyler_context_1 = require("freestyler-context");
var Theme = /** @class */ (function (_super) {
    __extends(Theme, _super);
    function Theme() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Theme.prototype.render = function () {
        var _a = this.props, _b = _a.name, name = _b === void 0 ? 'theme' : _b, value = _a.value, children = _a.children;
        return react_1.createElement(freestyler_context_1.Provider, { name: name, value: value }, children);
    };
    return Theme;
}(react_1.Component));
exports.Theme = Theme;
var Themed = /** @class */ (function (_super) {
    __extends(Themed, _super);
    function Themed() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Themed.prototype.render = function () {
        var _a = this.props, _b = _a.name, name = _b === void 0 ? 'theme' : _b, children = _a.children;
        return react_1.createElement(freestyler_context_1.Consumer, { name: name }, children);
    };
    return Themed;
}(react_1.Component));
exports.Themed = Themed;
exports.themed = function (Element, name) {
    if (name === void 0) { name = 'theme'; }
    return function (props) {
        return react_1.createElement(freestyler_context_1.Consumer, { name: name }, function (value) {
            return react_1.createElement(Element, __assign({}, props, (_a = {}, _a[name] = value, _a)));
            var _a;
        });
    };
};
