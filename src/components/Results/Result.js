import React, { Component } from 'react';
import s from './Result.css';

class Result extends Component {

    onPreviewClick = (e) => {
        this.props.onPreviewClick(this.props.previewUrl);
    }

    render() {
        return (
            <li className={s.listItem}>
                <img src={this.props.img} alt={this.props.name} className={s.waveform}/>
                <button onClick={this.onPreviewClick}>p</button>
                <span className={s.name}>{this.props.name}</span>
            </li>);
    }
}

export default Result;