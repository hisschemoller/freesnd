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
    
    onPreviewAreaMouseDown = (e) => {
        const localMouseXNormalized = (e.pageX - this.getPosition(e.target).x) / e.target.offsetWidth;
        this.props.onPreviewAreaMouseDown(this.props.index, localMouseXNormalized);
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
        const classNames = `${s.listitem} ${this.props.active ? s['listitem--active'] : ''}`;
        return (
            <li className={classNames}>
                <div className={s.row}>
                    <div 
                        className={s.waveform} 
                        onMouseDown={(e) => this.onPreviewAreaMouseDown(e)}
                        onMouseUp={() => this.props.onPreviewAreaMouseUp()}>
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
                    <button type="button" onClick={() => this.props.onFavouritesButtonClick(this.props.id)}>f</button>
                </div>
                { this.state.showDetails ? <ResultDetail {...this.props} /> : null }
            </li>);
    }
}

export default Result;
