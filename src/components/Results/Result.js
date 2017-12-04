import React, { Component } from 'react';
import s from './Result.css';

class Result extends Component {

    onPreviewClick = (e) => {
        this.props.onPreviewClick(this.props.previewUrl);
    }

    render() {
        const classNames = `${s.listitem} ${this.props.active ? s['listitem--active'] : ''}`;
        return (
            <li className={classNames}>
                <img src={this.props.img} alt={this.props.name} className={s.waveform}/>
                <button onClick={this.onPreviewClick}>p</button>
                <span className={s.name}>{this.props.name}</span>
            </li>);
    }
}

export default Result;