import React from 'react';
import s from './Layout.css';

class Layout extends React.Component {
    render() {
        return (
            <div className={s.layout}>
                {this.props.children}
            </div>
        );
    }
}

export default Layout;
