import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './Result.css';
import ResultDetail from './ResultDetail';
import { startPreview, stopPreview } from '../../actions/audioActions';

class Result extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            showDetails: false
        };
        
        this.locatorTimerID = null;
        this.locatorStartTime = 0;
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.isPlayingSoundID === nextProps.id || this.state.showDetails !== nextState.showDetails;
    }
    
    componentWillUpdate(nextProps, nextState) {
        if (this.locatorTimerID) {
            clearInterval(this.locatorTimerID);
        }
        
        if (!this.props.isPlaying && nextProps.isPlaying) {
            const self = this;
            this.locatorStartTime = Date.now();
            this.locatorTimerID = setInterval(function() {
                let elapsed = nextProps.positionNormalized + (((Date.now() - self.locatorStartTime) / 1000) / nextProps.duration);
                console.log(elapsed.toFixed(2));
            }, 100);
        }
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
        const localMouseXNormalized = (e.pageX - this.getPosition(e.target).x) / e.target.offsetWidth;
        this.props.onPreviewAreaMouseDown(this.props.index, localMouseXNormalized);
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
        
        return {
            x: xPos,
            y: yPos
        };
    }

    render() {
        console.log(this.props.isPlaying, this.props.positionNormalized, this.props.duration);
        
        const locatorStyle = {
            display: this.props.isPlaying ? 'block' : 'none',
            left: this.props.positionNormalized * 100
        };
        
        const classNames = `${s.listitem} ${this.props.active ? s['listitem--active'] : ''}`;
        
        return (
            <li className={classNames}>
                <div className={s.row}>
                    <div 
                        className={s.waveform} 
                        onMouseDown={(e) => this.onPreviewAreaMouseDown(e)}
                        onMouseUp={() => this.onPreviewAreaMouseUp()}>
                        <img src={this.props.img} alt={this.props.name} />
                        <div className={s.locator}  style={locatorStyle}></div>
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
                    <button type="button" onClick={() => this.props.onFavouritesButtonClick(this.props.id)}>f</button>
                </div>
                { this.state.showDetails ? <ResultDetail {...this.props} /> : null }
            </li>);
    }
}

function mapStateToProps(state, props) {
    return {
        isPlaying: state.audioState.isPlaying,
        isPlayingSoundID: state.audioState.soundID,
        positionNormalized: state.audioState.positionNormalized,
        duration: state.audioState.duration
    };
}

export default connect(mapStateToProps)(Result);
