import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cN from 'classnames';

import s from './Row.css'; // eslint-disable-line css-modules/no-unused-class

@withStyles(s)
class Row extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    children: null,
  };

  render() {
    return (
      <div className={cN(this.props.className, s.root)}>
        {this.props.children}
      </div>
    );
  }
}

export default Row;
