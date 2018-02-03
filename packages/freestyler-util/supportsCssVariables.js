"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var supportsCssVariables = function () { return (typeof window === 'object') && window.CSS && CSS.supports && CSS.supports('--a', '0'); };
exports.default = supportsCssVariables();
