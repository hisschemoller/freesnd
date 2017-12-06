import React, { Component } from 'react';
import s from './Result.css';

class Result extends Component {

    render() {
        const classNames = `${s.listitem} ${this.props.active ? s['listitem--active'] : ''}`;
        return (
            <li className={classNames}>
                <img src={this.props.img} alt={this.props.name} className={s.waveform}/>
                <button onMouseDown={() => this.props.onPreviewButtonDown(this.props.previewUrl)} onMouseUp={() => this.props.onPreviewButtonUp()}>p</button>
                <span className={s.name}>{this.props.name}</span>
                <button className={s.username} onClick={() => this.props.onUserOrTagClick(this.props.username)}>{this.props.username}</button>
                <div className={s.tags}>
                    {this.props.tags.map((tag, i) => (
                        <button key={tag} className={s.tag} onClick={() => this.props.onUserOrTagClick(tag)}>{tag}</button>
                    ))}
                </div>
            </li>);
    }
}

export default Result;