import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startPreview, stopPreview } from '../../actions/audioActions';
import { addToSearchHistory, setQuery, gotoPage, selectSound, nextSound, previousSound, fetchSounds, fetchSound } from '../../actions/searchActions';
import Result from './Result';
import s from './Results.css';

class Results extends Component {
    
    componentDidMount() {
        document.addEventListener('keyup', this.onDocumentKeyup);
    }
    
    componentWillUnmount() {
        document.removeEventListener('keyup', this.onDocumentKeyup);
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
                this.props.dispatch(startPreview());
                break;
            case 39: // right arrow, go to next page
                this.props.dispatch(gotoPage(this.props.page + 1));
                this.props.dispatch(fetchSounds());
                this.props.dispatch(stopPreview());
                break;
            case 40: // down arrow
                this.props.dispatch(nextSound());
                this.props.dispatch(startPreview());
                break;
            case 13: // enter
                this.props.dispatch(startPreview());
                break;
            case 8: // backspace
                this.props.dispatch(stopPreview());
                break;
            default:
                break;
        }
    }
    
    startPreview = (index) => {
        this.props.dispatch(selectSound(index));
        this.props.dispatch(startPreview());
    }
    
    stopPreview = () => {
        this.props.dispatch(stopPreview());
    }
    
    performQuery = (query) => {
        this.props.dispatch(addToSearchHistory(query));
        this.props.dispatch(setQuery(query));
        this.props.dispatch(fetchSounds());
    }
    
    fetchSoundDetails = (id) => {
        this.props.dispatch(fetchSound(id));
    }
    
    render() {
        return (
            <div className={s.root}>
                <h4 className={s.header}>Search results</h4>
                <ul className={s.list}>
                    {this.props.results.map((result, i) => (
                        <Result 
                            {...result}
                            key={result.id} 
                            onPreviewButtonDown={this.startPreview}
                            onPreviewButtonUp={this.stopPreview}
                            onUserOrTagClick={this.performQuery}
                            onDetailButtonClick={this.fetchSoundDetails}
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
        results: state.searchState.results,
        selectedIndex: state.searchState.selectedIndex
    };
}

export default connect(mapStateToProps)(Results);
