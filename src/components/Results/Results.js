import React, { Component } from 'react';
import { connect } from 'react-redux';
import Result from './Result';
import s from './Results.css';

class Results extends Component {
    
    render() {
        return (
            <div className={s.root}>
                <h4 className={s.header}>Search results</h4>
                <ul className={s.list}>
                    {this.props.results.map(result => (
                        <Result key={result.id} name={result.name} img={result.images.waveform_m}  />
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