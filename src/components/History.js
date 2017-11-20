import React, { Component } from 'react';
import { connect } from 'react-redux';
import HistoryItem from './HistoryItem';

class History extends Component {
    
    render() {
        
        return (
            <div className="results">
                <h4>History</h4>
                <ul className="history">
                    {
                        this.props.history.map(item => (
                            <HistoryItem key={item.id} value={item.value} />
                        ))
                    }
                </ul>
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
