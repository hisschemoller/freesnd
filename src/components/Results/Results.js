import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startPreview, stopPreview } from '../../actions/audioActions';
import { nextPage, previousPage, nextSound, previousSound, fetchSounds } from '../../actions/searchActions';
import Result from './Result';
import s from './Results.css';

class Results extends Component {
    
    componentDidMount() {
        document.addEventListener('keyup', this.onDocumentKeyup);
    }
    
    componentWillUnmount() {
        document.removeEventListener('keyup', this.onDocumentKeyup);
    }
    
    componentWillUpdate(nextProps, nextState) {
        // if selected sound changes then play its preview 
        const hasResults = nextProps.results && nextProps.results.length > 0;
        const hasChangedIndex = nextProps.selectedIndex !== this.props.selectedIndex && nextProps.selectedIndex !== null;
        if (hasResults && hasChangedIndex) {
            const previewUrl = nextProps.results[nextProps.selectedIndex].previews['preview-lq-mp3'];
            this.props.dispatch(startPreview(previewUrl));
        }
    }
        
    onDocumentKeyup = (e) => {
        switch (e.keyCode) {
            case 37: // left arrow
                this.gotoPreviousPage();
                break;
            case 38: // up arrow
                this.props.dispatch(previousSound());
                break;
            case 39: // right arrow
                this.gotoNextPage();
                break;
            case 40: // down arrow
                this.props.dispatch(nextSound());
                break;
            default:
                break;
        }
    } 

    gotoNextPage = () => {
        this.props.dispatch(nextPage());
        this.props.dispatch(fetchSounds());
    }
    
    gotoPreviousPage = () => {
        this.props.dispatch(previousPage());
        this.props.dispatch(fetchSounds());
    }
    
    startPreview = (previewUrl) => {
        this.props.dispatch(startPreview(previewUrl));
    }
    
    stopPreview = () => {
        this.props.dispatch(stopPreview());
    }
    
    render() {
        const previousClassNames = `${s.previous} ${this.props.previous ? s.active : ''}`;
        const nextClassNames = `${s.next} ${this.props.next ? s.active : ''}`;
        
        return (
            <div className={s.root}>
                <h4 className={s.header}>Search results</h4>
                <ul className={s.list}>
                    {this.props.results.map((result, i) => (
                        <Result 
                            key={result.id} 
                            name={result.name} 
                            img={result.images.waveform_m}
                            previewUrl={result.previews['preview-lq-mp3']}
                            onPreviewButtonDown={this.startPreview}
                            onPreviewButtonUp={this.stopPreview}
                            active={i === this.props.selectedIndex} />
                    ))}
                </ul>
                <div className={s.pagination}>
                    <button type="button" className={previousClassNames} onClick={this.gotoPreviousPage}>Previous</button>
                    <span>{this.props.page}/{Math.ceil(this.props.count / this.props.pageSize)}</span>
                    <button type="button" className={nextClassNames} onClick={this.gotoNextPage}>Next</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        page: state.searchState.page,
        pageSize: state.searchState.pageSize,
        count: state.searchState.count,
        results: state.searchState.results,
        selectedIndex: state.searchState.selectedIndex
    };
}

export default connect(mapStateToProps)(Results);
