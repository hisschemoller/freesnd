import React, { Component } from 'react';
import s from './ResultDetail.css';

class ResultDetail extends Component {
    
    render() {
        return ( <div className={s.root}>
            <div>License: {this.props.license}, channels: {this.props.channels}, type: {this.props.type}</div>
            <p>{this.props.description}</p>
            <a href={this.props.url} target="_blank">{this.props.url}</a>
        </div> );
    }
}

export default ResultDetail;