import {createElement as h} from 'react';
import rule from '../../src/rule';

const className = rule({
    zIndex: 1e4,
    pos: 'fixed',
    h: '100%',
    bg: 'black',
    top: 0,
    left: 0,
    trs: 'left 0.2s',
    bdRad: 0,
});

export interface ISidebarProps {
    open?: boolean;
}

export const Sidebar = ({children, open, width = open ? 300 : 0}) => {
    return h('div', {
        className,
        style: {
            width,
        }
    },
        children
    );
};
