import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cN from 'classnames';

import s from './Col.css'; // eslint-disable-line css-modules/no-unused-class

@withStyles(s)
class Col extends Component {
  static propTypes = {
    centerBlock: PropTypes.bool,

    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,

    // TODO: to be implemented
    // xsHidden: PropTypes.bool,
    // smHidden: PropTypes.bool,
    // mdHidden: PropTypes.bool,
    // lgHidden: PropTypes.bool,
    // xlHidden: PropTypes.bool,

    xsOffset: PropTypes.number,
    smOffset: PropTypes.number,
    mdOffset: PropTypes.number,
    lgOffset: PropTypes.number,
    xlOffset: PropTypes.number,

    xsPush: PropTypes.number,
    smPush: PropTypes.number,
    mdPush: PropTypes.number,
    lgPush: PropTypes.number,
    xlPush: PropTypes.number,

    xsPull: PropTypes.number,
    smPull: PropTypes.number,
    mdPull: PropTypes.number,
    lgPull: PropTypes.number,
    xlPull: PropTypes.number,

    xsVertical: PropTypes.string,
    smVertical: PropTypes.string,
    mdVertical: PropTypes.string,
    lgVertical: PropTypes.string,
    xlVertical: PropTypes.string,

    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    className: PropTypes.string,
  };

  static defaultProps = {
    centerBlock: false,

    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,

    // TODO: to be implemented
    // xsHidden: false,
    // smHidden: false,
    // mdHidden: false,
    // lgHidden: false,
    // xlHidden: false,

    xsOffset: null,
    smOffset: null,
    mdOffset: null,
    lgOffset: null,
    xlOffset: null,

    xsPush: null,
    smPush: null,
    mdPush: null,
    lgPush: null,
    xlPush: null,

    xsPull: null,
    smPull: null,
    mdPull: null,
    lgPull: null,
    xlPull: null,

    xsVertical: null,
    smVertical: null,
    mdVertical: null,
    lgVertical: null,
    xlVertical: null,

    children: null,
    className: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      classList: this.getClasses(),
    };
  }

  getClasses() {
    const classList = [];
    const {
      xs,
      sm,
      md,
      lg,
      xl,
      xsOffset,
      smOffset,
      mdOffset,
      lgOffset,
      xlOffset,
      xsPush,
      smPush,
      mdPush,
      lgPush,
      xlPush,
      xsPull,
      smPull,
      mdPull,
      lgPull,
      xlPull,
      xsVertical,
      smVertical,
      mdVertical,
      lgVertical,
      xlVertical,
      centerBlock,
    } = this.props;

    if (centerBlock) {
      classList.push(s.centerBlock);
    }

    if (xs) classList.push(s[`colXS${xs}`]);
    if (sm) classList.push(s[`colSM${sm}`]);
    if (md) classList.push(s[`colMD${md}`]);
    if (lg) classList.push(s[`colLG${lg}`]);
    if (xl) classList.push(s[`colXL${xl}`]);

    if (xsOffset) classList.push(s[`colXSoffset${xsOffset}`]);
    if (smOffset) classList.push(s[`colSMoffset${smOffset}`]);
    if (mdOffset) classList.push(s[`colMDoffset${mdOffset}`]);
    if (lgOffset) classList.push(s[`colLGoffset${lgOffset}`]);
    if (xlOffset) classList.push(s[`colXLoffset${xlOffset}`]);

    if (xsPush) classList.push(s[`colXSpush${xsPush}`]);
    if (smPush) classList.push(s[`colSMpush${smPush}`]);
    if (mdPush) classList.push(s[`colMDpush${mdPush}`]);
    if (lgPush) classList.push(s[`colLGpush${lgPush}`]);
    if (xlPush) classList.push(s[`colXLpush${xlPush}`]);

    if (xsPull) classList.push(s[`colXSpull${xsPull}`]);
    if (smPull) classList.push(s[`colSMpull${smPull}`]);
    if (mdPull) classList.push(s[`colMDpull${mdPull}`]);
    if (lgPull) classList.push(s[`colLGpull${lgPull}`]);
    if (xlPull) classList.push(s[`colXLpull${xlPull}`]);

    if (xsVertical) classList.push(s[`colXSvertical${xsVertical}`]);
    if (smVertical) classList.push(s[`colSMvertical${smVertical}`]);
    if (mdVertical) classList.push(s[`colMDvertical${mdVertical}`]);
    if (lgVertical) classList.push(s[`colLGvertical${lgVertical}`]);
    if (xlVertical) classList.push(s[`colXLvertical${xlVertical}`]);

    return classList;
  }

  render() {
    return (
      <div className={cN(this.props.className, s.root, this.state.classList)}>
        {this.props.children}
      </div>
    );
  }
}

export default Col;
