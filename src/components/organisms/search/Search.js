import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToSearchHistory, setQuery, setSort, fetchSounds } from '../../../actions/searchActions';

class Search extends Component {
    
    handleQueryChange = (e) => {
        this.props.dispatch(setQuery(e.target.value));
    }
    
    handleSortChange = (e) => {
        this.props.dispatch(setSort(e.target.value));
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        e.target.querySelector('input[type=text]').blur();
        this.props.dispatch(addToSearchHistory());
        this.props.dispatch(fetchSounds());
    }
    
    render() {
        return (
            <form className="search" onSubmit={this.handleSubmit}>
                <input type="text" value={this.props.query} onChange={this.handleQueryChange} />
                <select value={this.props.sort} onChange={this.handleSortChange}>
                    <option value="score">Relevance</option>
                    <option value="duration_desc">Duration, longest first</option>
                    <option value="duration_asc">Duration, shortest first</option>
                    <option value="created_desc">Date, newest first</option>
                    <option value="downloads_desc">Downloads, most downloads first</option>
                    <option value="downloads_asc">Downloads, least first</option>
                    <option value="rating_desc">Ratings, highest first</option>
                    <option value="rating_asc">Ratings, lowest first</option>
                </select>
                <input type="submit" />
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        query: state.searchState.query,
        sort: state.searchState.sort
    };
}

export default connect(mapStateToProps)(Search);
