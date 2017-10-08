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
var PropTypes = require("prop-types");
var freestyler_observable_1 = require("freestyler-observable");
var freestyler_util_1 = require("freestyler-util");
var $$context = freestyler_util_1.sym('context');
var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.parentUnsub = freestyler_util_1.noop;
        _this.parentValue = null;
        return _this;
    }
    Provider.prototype.componentWillMount = function () {
        var _this = this;
        var parentObservable = (this.context[$$context] || {})[this.props.name];
        if (parentObservable) {
            this.parentValue = parentObservable.get();
            this.parentUnsub = parentObservable.sub(function (value) {
                _this.parentValue = value;
                _this.observable.set(_this.mergeValues(_this.props.value));
            });
        }
        this.observable = freestyler_observable_1.observable(this.mergeValues(this.props.value));
    };
    Provider.prototype.getChildContext = function () {
        return __assign({}, this.context, (_a = {}, _a[$$context] = __assign({}, (this.context[$$context] || {}), (_b = {}, _b[this.props.name] = this.observable, _b)), _a));
        var _a, _b;
    };
    Provider.prototype.componentWillReceiveProps = function (props) {
        if (this.props.value !== props.value)
            this.observable.set(this.mergeValues(props.value));
    };
    Provider.prototype.componentWillUnmount = function () {
        this.parentUnsub();
    };
    Provider.prototype.mergeValues = function (value) {
        return __assign({}, this.parentValue, value);
    };
    Provider.prototype.render = function () {
        return this.props.children || null;
    };
    Provider.propTypes = {
        name: PropTypes.string,
        value: PropTypes.object.isRequired,
    };
    Provider.defaultProps = {
        name: 'default',
    };
    Provider.childContextTypes = (_a = {},
        _a[$$context] = PropTypes.object,
        _a);
    Provider.contextTypes = (_b = {},
        _b[$$context] = PropTypes.object,
        _b);
    return Provider;
}(react_1.Component));
exports.Provider = Provider;
var Consumer = /** @class */ (function (_super) {
    __extends(Consumer, _super);
    function Consumer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: null,
        };
        _this.unsub = freestyler_util_1.noop;
        return _this;
    }
    Consumer.prototype.observable = function () {
        var observable = this.context[$$context][this.props.name];
        if (process.env.NODE_ENV !== 'production') {
            if (!observable) {
                throw new Error("Context observable \"" + this.props.name + "\" not found.");
            }
        }
        return observable;
    };
    Consumer.prototype.componentWillMount = function () {
        this.setState({
            value: this.observable().get(),
        });
    };
    Consumer.prototype.componentDidMount = function () {
        var _this = this;
        this.unsub = this.observable().sub(function (value) {
            _this.setState({ value: value });
        });
    };
    Consumer.prototype.componentWillUnmount = function () {
        this.unsub();
    };
    Consumer.prototype.render = function () {
        return this.props.children(this.state.value);
    };
    Consumer.propTypes = {
        name: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    };
    Consumer.contextTypes = (_a = {},
        _a[$$context] = PropTypes.object,
        _a);
    return Consumer;
}(react_1.Component));
exports.Consumer = Consumer;
var _a, _b, _a;
