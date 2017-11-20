import React, { Component } from 'react';
import { connect } from 'react-redux';
import { count } from '../actions/searchActions'

class Search extends Component {
    
    // constructor(props) {
    //     super(props);
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }
    
    handleChange = (e) => {
        // this.setState({
        //     value: e.target.value
        // });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(count());
    }
    
    render() {
        return (
            <form className="search" onSubmit={this.handleSubmit}>
                <input type="text" value={this.props.value} onChange={this.handleChange} />
                <input type="submit" />
                <span>Counter: {this.props.count}</span>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        value: state.searchState.value,
        count: state.searchState.count
    };
}

export default connect(mapStateToProps)(Search);
