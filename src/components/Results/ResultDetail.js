import React, { Component } from 'react';
import s from './ResultDetail.css';

class ResultDetail extends Component {
    
    render() {
        return ( <div className={s.root}>{this.props.description}</div> );
    }
}

export default ResultDetail;