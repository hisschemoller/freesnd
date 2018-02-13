import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    };
    
    render() {
        return React.Children.only(this.props.children);
    }
}

export default App;
