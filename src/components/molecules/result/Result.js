import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './Result.css';
import ResultDetail from '../resultdetail/ResultDetail';

class Result extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            showDetails: false
        };
        
        this.startTimeNormalized = 0;
        this.locatorStartTime = 0;
        this.locatorAreaWidth = 0;
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.isPlayingSoundID === nextProps.id || 
            this.state.showDetails !== nextState.showDetails;
    }
    
    toggleDetail = (e) => {
        if (!this.state.showDetails) {
            this.props.onDetailButtonClick(this.props.id);
        }
        this.setState(Object.assign({}, this.state, {
            showDetails: !this.state.showDetails
        }));
    }
    
    onPreviewAreaMouseDown = (e) => {
        this.locatorAreaWidth = e.target.offsetWidth;
        this.locatorStartTime = Date.now();
        this.startTimeNormalized = (e.pageX - this.getPosition(e.target).x) / this.locatorAreaWidth;
        this.props.onPreviewAreaMouseDown(this.props.index, this.startTimeNormalized);
    }
    
    onPreviewAreaMouseUp = (e) => {
        this.props.onPreviewAreaMouseUp();
    }
    
    /**
     * Get mouse position relative to DOM element.
     * @see https://www.kirupa.com/html5/get_element_position_using_javascript.htm
     * @param  {Object} el DOM element.
     * @return {Object} x, y coordinate object.
     */
    getPosition = (el) => {
        let xPos = 0, yPos = 0;

        while (el) {
            if (el.tagName === 'BODY') {
                // deal with browser quirks with body/window/document and page scroll
                const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                const yScroll = el.scrollTop || document.documentElement.scrollTop;
                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);
            } else {
                // for all other non-BODY elements
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }

            el = el.offsetParent;
        }
        
        return { x: xPos, y: yPos };
    }

    render() {
        const elapsedNormalized = Math.min(1, this.startTimeNormalized + (((Date.now() - this.locatorStartTime) / 1000) / this.props.duration));
        
        const locatorStyle = {
            display: this.props.isPlaying ? 'block' : 'none',
            left: elapsedNormalized * this.locatorAreaWidth
        };
        
        const classNames = `${s.listitem} ${this.props.active ? s['listitem--active'] : ''}`;
        
        return (
            <li className={classNames}>
                <div className={s.row}>
                    <div className={s.waveform} 
                        onMouseDown={(e) => this.onPreviewAreaMouseDown(e)}
                        onMouseUp={() => this.onPreviewAreaMouseUp()}>
                        <img src={this.props.images.waveform_m} alt={this.props.name} />
                        <div className={s.locator}  style={locatorStyle}></div>
                    </div>
                    <button 
                        onMouseDown={() => this.props.onPreviewButtonDown(this.props.index)} 
                        onMouseUp={() => this.props.onPreviewButtonUp()}>p</button>
                    <button type="button" onClick={this.toggleDetail}>d</button>
                    <button type="button" onClick={() => this.props.onFavouritesButtonClick(this.props.id)}>f</button>
                    <span>{this.props.counter}</span>
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
                </div>
                { this.state.showDetails ? <ResultDetail {...this.props} /> : null }
            </li>);
    }
}

function mapStateToProps(state, props) {
    return {
        counter: state.audioState.counter,
        isPlaying: state.audioState.isPlaying,
        isPlayingSoundID: state.audioState.soundID
    };
}

export default connect(mapStateToProps)(Result);
