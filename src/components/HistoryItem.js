import React, { Component } from 'react';

class HistoryItem extends Component {
    render() {
        return (<li>{this.props.value}</li>);
    }
}

export default HistoryItem;