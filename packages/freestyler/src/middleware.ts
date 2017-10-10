import {TStyles, TStyleSheet} from './ast';

export interface IMiddleware {
    styles: (TStyles) => TStyles;
    stylesheet: (TStyleSheet) => TStyleSheet;
}
