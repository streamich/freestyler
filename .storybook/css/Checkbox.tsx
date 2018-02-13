import {Component, createElement as h} from 'react';
import css from '../../src/react/css';

const theme = {
    positive: 'green',
    smoke: ['#eee', '#ddd'],
    snow: ['#ccc', '#bbb'],
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
  '&> span': {
    pos: 'absolute',
    top: '3px',
    d: 'inline-block',
    bdrad: '12px',
    trs: 'all 0.2s',
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

  @css(({props: {small, on}, state: {active, hover}}) => ({
    width: (small ? 40 : 50) + 'px',
    height: (small ? 20 : 30) + 'px',
    bg: on ? theme.positive : theme.smoke[1],
    '&> span': {
      left: on ? (active ? '17px' : '23px') : '3px',
      width: (small ? (active ? 20 : 14) : (active ? 30 : 24)) + 'px',
      height: (small ? 14 : 24) + 'px',
      bg: hover ? '#fff' : theme.snow[0],
      'box-shadow': hover ? '0 0 3px rgba(0,0,0,.4)' : 'none',
    }
  }))
  render() {
    return h('span', {onClick: this.props.onChange, ...this.events},
        h('span', null, ' '),
    );
  }
}
