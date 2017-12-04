import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playPreview } from '../../actions/audioActions';
import { nextPage, previousPage, fetchSounds } from '../../actions/searchActions';
import Result from './Result';
import s from './Results.css';

class Results extends Component {

    handleNextPage = () => {
        this.props.dispatch(nextPage());
        this.props.dispatch(fetchSounds());
    }
    
    handlePreviousPage = () => {
        this.props.dispatch(previousPage());
        this.props.dispatch(fetchSounds());
    }
    
    onPreviewClick = (previewUrl) => {
        this.props.dispatch(playPreview(previewUrl));
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
                            onPreviewClick={this.onPreviewClick}
                            active={i === this.props.selectedIndex} />
                    ))}
                </ul>
                <div className={s.pagination}>
                    <button type="button" className={previousClassNames} onClick={this.handlePreviousPage}>Previous</button>
                    <span>{this.props.page}/{Math.ceil(this.props.count / this.props.pageSize)}</span>
                    <button type="button" className={nextClassNames} onClick={this.handleNextPage}>Next</button>
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
