import React, { Component } from 'react';

class Result extends Component {
    render() {
        return (<li>
            <img src={this.props.img} alt={this.props.name}/>
            <p>{this.props.name}</p>
        </li>);
    }
}

export default Result;