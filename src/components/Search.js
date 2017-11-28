import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increaseSearchCount, addToSearchHistory, setQuery, fetchSounds } from '../actions/searchActions';

class Search extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
        
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(increaseSearchCount());
        this.props.dispatch(addToSearchHistory(this.state.value));
        this.props.dispatch(setQuery(this.state.value));
        this.props.dispatch(fetchSounds());
    }
    
    render() {
        return (
            <form className="search" onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <input type="submit" />
                <span>Counter: {this.props.count}</span>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        count: state.searchState.count
    };
}

export default connect(mapStateToProps)(Search);
