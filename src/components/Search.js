import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToSearchHistory, setQuery, fetchSounds } from '../actions/searchActions';

class Search extends Component {
    
    handleChange = (e) => {
        this.props.dispatch(setQuery(e.target.value));
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(addToSearchHistory());
        this.props.dispatch(fetchSounds());
    }
    
    render() {
        return (
            <form className="search" onSubmit={this.handleSubmit}>
                <input type="text" value={this.props.query} onChange={this.handleChange} />
                <input type="submit" />
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        query: state.searchState.query
    };
}

export default connect(mapStateToProps)(Search);
