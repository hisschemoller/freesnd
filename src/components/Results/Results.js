import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startPreview, stopPreview } from '../../actions/audioActions';
import { addToSearchHistory, setQuery, gotoPage, nextSound, previousSound, fetchSounds } from '../../actions/searchActions';
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
            case 37: // left arrow, go to previous page
                this.props.dispatch(gotoPage(this.props.page - 1));
                this.props.dispatch(fetchSounds());
                this.props.dispatch(stopPreview());
                break;
            case 38: // up arrow
                this.props.dispatch(previousSound());
                break;
            case 39: // right arrow, go to next page
                this.props.dispatch(gotoPage(this.props.page + 1));
                this.props.dispatch(fetchSounds());
                this.props.dispatch(stopPreview());
                break;
            case 40: // down arrow
                this.props.dispatch(nextSound());
                break;
            default:
                break;
        }
    }
    
    startPreview = (previewUrl) => {
        this.props.dispatch(startPreview(previewUrl));
    }
    
    stopPreview = () => {
        this.props.dispatch(stopPreview());
    }
    
    performQuery = (query) => {
        this.props.dispatch(addToSearchHistory(query));
        this.props.dispatch(setQuery(query));
        this.props.dispatch(fetchSounds());
    }
    
    render() {
        return (
            <div className={s.root}>
                <h4 className={s.header}>Search results</h4>
                <ul className={s.list}>
                    {this.props.results.map((result, i) => (
                        <Result 
                            key={result.id} 
                            name={result.name} 
                            img={result.images.waveform_m}
                            username={result.username}
                            rating={result.avg_rating}
                            downloads={result.num_downloads}
                            created={result.created}
                            duration={result.duration}
                            tags={result.tags}
                            previewUrl={result.previews['preview-lq-mp3']}
                            onPreviewButtonDown={this.startPreview}
                            onPreviewButtonUp={this.stopPreview}
                            onUserOrTagClick={this.performQuery}
                            active={i === this.props.selectedIndex} />
                    ))}
                </ul>
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
