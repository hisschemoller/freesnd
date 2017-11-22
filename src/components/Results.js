import React, { Component } from 'react';
import { connect } from 'react-redux';
import Result from './Result';

class Results extends Component {
    
    render() {
        return (
            <div className="results">
                <h4>Search results</h4>
                <ul className="results__list">
                    {this.props.results.map(result => (
                        <Result key={result.id} name={result.name}  />
                    ))}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.searchState.results
    };
}

export default connect(mapStateToProps)(Results);