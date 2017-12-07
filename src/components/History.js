import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToSearchHistory, setQuery, fetchSounds } from '../actions/searchActions';

class History extends Component {
    
    performQuery = (query) => {
        this.props.dispatch(addToSearchHistory(query));
        this.props.dispatch(setQuery(query));
        this.props.dispatch(fetchSounds());
    }
    
    render() {
        return (
            <div className="results">
                <h4>History</h4>
                <div className="history">
                    {
                        this.props.history.map((item, i) => (
                            // <HistoryItem key={i} value={item.value} onClick={} />
                            <button type="button" onClick={ () => this.performQuery(item.value) } >{item.value}</button>
                        ))
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        history: state.searchState.history
    };
}

export default connect(mapStateToProps)(History);
