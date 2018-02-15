import {createElement as h} from 'react';
import styled from '../src/react/styled';
import {render} from 'react-dom';
import {Component} from 'react';
import css from '../src/react/css';
import {Toggle} from 'libreact/lib/Toggle';

export const theme = {
  // Main site colors.
  smoke: ['#E0E6ED', '#D3DCE6', '#C0CCDA'],
  snow: ['#F9FAFC', '#EFF2F7', '#E5E9F2'],
  positive: '#13CE66',
};

interface ICheckboxProps {
  on: boolean,
  small?: boolean,
  onChange?: (e?) => void,
}

interface ICheckboxState {
  hover?: boolean,
  active?: boolean,
}

@css({
  pos: 'relative',
  cur: 'pointer',
  d: 'inline-block',
  pad: 0,
  mar: 0,
  bdrad: '20px',
  trs: 'all 0.3s',
  boxShadow: 'inset 0 0 2px rgba(0,0,0,.25)',
  '&:hover': {
    '& > span': {
      bg: theme.snow[0],
      'box-shadow': '0 0 3px rgba(0,0,0,.4)',
    }
  },
  '& > span': {
    pos: 'absolute',
    top: '3px',
    d: 'inline-block',
    bdrad: '12px',
    trs: 'all 0.2s',
    bg: '#fff',
  }
})
export class Checkbox extends Component<ICheckboxProps, ICheckboxState> {

  state = {
      hover: false,
      active: false,
  };

  events = {
    onMouseEnter: () => this.setState({hover: true}),
    onMouseLeave: () => this.setState({hover: false, active: false}),
    onMouseDown: () => this.setState({active: true}),
    onMouseUp: () => this.setState({active: false}),
  };

  @css(({props: {small, on}, state: {active, hover}}) => {
    const style = {
      w: (small ? 40 : 50) + 'px',
      h: (small ? 20 : 30) + 'px',
      bg: on ? theme.positive : theme.smoke[1],
      '& > span': {
        left: on ? (active ? '17px' : '23px') : '3px',
        w: (small ? (active ? 20 : 14) : (active ? 30 : 24)) + 'px',
        h: (small ? 14 : 24) + 'px',
      }
    };

    return style;
  })
  render() {
    return h('span', {onClick: this.props.onChange, ...this.events},
        h('span', null, ' '),
    );
  }
}


const el = document.createElement('div');
document.body.appendChild(el);

const element = (
    <Toggle>{({on, toggle}) =>
        <Checkbox on={on} onChange={toggle} />
    }</Toggle>
);

render(element, el);
