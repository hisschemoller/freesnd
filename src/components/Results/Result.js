import React, { Component } from 'react';
import s from './Result.css';

class Result extends Component {

    onPreviewButtonDown = (e) => {
        this.props.onPreviewButtonDown(this.props.previewUrl);
    }
    
    onPreviewButtonUp = (e) => {
        this.props.onPreviewButtonUp(this.props.previewUrl);
    }

    render() {
        const classNames = `${s.listitem} ${this.props.active ? s['listitem--active'] : ''}`;
        return (
            <li className={classNames}>
                <img src={this.props.img} alt={this.props.name} className={s.waveform}/>
                <button onMouseDown={this.onPreviewButtonDown} onMouseUp={this.onPreviewButtonUp}>p</button>
                <span className={s.name}>{this.props.name}</span>
            </li>);
    }
}

export default Result;