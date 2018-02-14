import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cN from 'classnames';

import Row from './Row';
import Col from './Col';

import s from './Grid.css';

@withStyles(s)
class Grid extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    className: null,
  };

  render() {
    const { className, children, ...props } = this.props;

    return (
      <div {...props} className={cN(className, s.root)}>
        <div className={s.container}>{children}</div>
      </div>
    );
  }
}

Grid.Row = Row;
Grid.Col = Col;

export default Grid;
