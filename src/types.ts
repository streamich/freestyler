import {Component} from 'react';

export type TComponent = Component;
export type TComponentConstructor = new (...args) => TComponent;

export type TCssTemplateObject = {[rule: string]: any};
export type TCssTemplateCallback = (...args) => TCssTemplateObject;
export type TCssTemplate = TCssTemplateObject | TCssTemplateCallback;
