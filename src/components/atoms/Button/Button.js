import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Button.css';

class Button extends Component {

    static propTypes = {
        disabled: PropTypes.bool
    };

    static defaultProps = {
        disabled: null
    };

    static renderButton({ ...elementProps }, children) {
        const ComponentElem = 'button';
        const elmType = 'button';

        return (
            <ComponentElem {...elementProps} type={elmType}>
                {children ? <span className={s.text}>{children}</span> : null}
            </ComponentElem>
        );
    }

    render() {
        const { ...props } = this.props;
        return Button.renderButton(props, props.children);
    }
}

export default Button;