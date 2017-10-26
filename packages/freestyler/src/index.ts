import wrap from './react/wrap';
import styled from './react/styled';
import styleit from './react/styleit';
import hoc from './react/hoc';
import facc from './react/facc';
import css_ from './react/css';

const div = styled('div');
const span = styled('span');

const css = css_ as any;

export {css, wrap, styled, styleit, hoc, facc, div, span};

css.css = css;
css.wrap = wrap;
css.styled = styled;
css.styleit = styleit;
css.hoc = hoc;
css.facc = facc;
css.div = div;
css.span = span;

export default css;
