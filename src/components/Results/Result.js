import React, { Component } from 'react';
import s from './Result.css';
import ResultDetail from './ResultDetail';

class Result extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        };
    }
    
    toggleDetail = (e) => {
        if (!this.state.showDetails) {
            this.props.onDetailButtonClick(this.props.id);
        }
        this.setState({
            showDetails: !this.state.showDetails
        });
    }

    render() {
        const classNames = `${s.listitem} ${this.props.active ? s['listitem--active'] : ''}`;
        return (
            <li className={classNames}>
                <div className={s.row}>
                    <div className={s.waveform}>
                        <img src={this.props.img} alt={this.props.name} />
                    </div>
                    <button onMouseDown={() => this.props.onPreviewButtonDown(this.props.index)} onMouseUp={() => this.props.onPreviewButtonUp()}>p</button>
                    <div className={s.info}>
                        <div>
                            <span className={s.name}>{this.props.name}</span>
                            <button className={s.username} onClick={() => this.props.onUserOrTagClick(this.props.username)}>{this.props.username}</button>
                            <span>{this.props.duration.toFixed(2)}, {this.props.avg_rating.toFixed(1)}, {this.props.downloads}, {this.props.created}</span>
                        </div>
                        <div className={s.tags}>
                            {this.props.tags.map((tag, i) => (
                                <button key={tag} className={s.tag} onClick={() => this.props.onUserOrTagClick(tag)}>{tag}</button>
                            ))}
                        </div>
                    </div>
                    <button type="button" onClick={this.toggleDetail}>d</button>
                    <button type="button">f</button>
                </div>
                { this.state.showDetails ? <ResultDetail description={this.props.description} /> : null }
            </li>);
    }
}

export default Result;
