import {Component, createElement as h} from 'react';
import {styleit} from './styleit';
import * as extend from 'fast-extend';

const jsxstyle = (Comp, defaultStyles) => {
    return props => {
        let {
            component,
            props: customProps = null,
            children,
            mediaQueries,
            className,
            style,
            ref,
            ...customStyles,
        } = props;

        if (process.env.FREESTYLER_JSXSTYLE_MEDIA_QUERIES) {
            for (let prefix in mediaQueries) {
                const prefixLength = prefix.length;
                const mediaQuery = mediaQueries[prefix];
                const mediaQueryStyles = {};
                let mediaQueryHasStyles = false;
                for (let styleName in customStyles) {
                    if (styleName.indexOf(prefix) === 0) {
                        mediaQueryHasStyles = true;
                        const styleNameSansPrefix =
                            styleName[prefixLength].toLowerCase() + styleName.substr(prefixLength + 1);
                        mediaQueryStyles[styleNameSansPrefix] = customStyles[styleName];
                        delete customStyles[styleName];
                    }
                }
                if (mediaQueryHasStyles) {
                    const mediaQueryPrelude = mediaQueries[prefix];
                    customStyles[mediaQueryPrelude] = mediaQueryStyles;
                }
            }
        }

        const styles = extend({}, defaultStyles, customStyles);

        return styleit(
            styles,
            h(
                component || Comp,
                {
                    ...customProps,
                    className,
                    style,
                    ref,
                },
                children
            )
        );
    };
};

export default jsxstyle;

const DIV = 'div';
const SPAN = 'span';

export const Box = jsxstyle(DIV, null);
export const Block = jsxstyle(DIV, {d: 'block'});
export const Inline = jsxstyle(SPAN, {d: 'inline'});
export const InlineBlock = jsxstyle(DIV, {d: 'inline-block'});
export const Row = jsxstyle(DIV, {d: 'flex', flexDirection: 'row'});
export const Column = jsxstyle(DIV, {d: 'flex', flexDirection: 'column'});
export const Grid = jsxstyle(DIV, {d: 'grid'});

// Deprecated?
export const Flex = jsxstyle(DIV, {d: 'flex'});
export const InlineFlex = jsxstyle(SPAN, {d: 'inline-flex'});
export const Table = jsxstyle('table', {d: 'table'});
export const TableRow = jsxstyle('tr', {d: 'table-row'});
export const TableCell = jsxstyle('td', {d: 'table-cell'});
