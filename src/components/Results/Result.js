import React, { Component } from 'react';
import s from './Result.css';

class Result extends Component {
    render() {
        return (
            <li className={s.listItem}>
                <img src={this.props.img} alt={this.props.name}/>
                <span className={s.name}>{this.props.name}</span>
            </li>);
    }
}

export default Result;