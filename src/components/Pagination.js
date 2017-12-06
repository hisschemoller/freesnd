import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stopPreview } from '../actions/audioActions';
import { gotoPage, fetchSounds } from '../actions/searchActions';
import s from './Pagination.css';

class Pagination extends Component {

    gotoPage = (page) => {
        this.props.dispatch(gotoPage(page));
        this.props.dispatch(fetchSounds());
        this.props.dispatch(stopPreview());
    }
    
    render() {
        const numPages = Math.ceil(this.props.count / this.props.pageSize);
        
        return (
            <div className={s.pagination}>
                <button type="button" onClick={() => this.gotoPage(this.props.page - 1)} disabled={this.props.page <= 1}>&lt;</button>
                <button type="button" onClick={() => this.gotoPage(1)} disabled={numPages === 0}>1</button>
                <span>...</span>
                <span>{this.props.page}</span>
                <span>...</span>
                <button type="button" onClick={() => this.gotoPage(numPages)} disabled={numPages === 0}>{numPages}</button>
                <button type="button" onClick={() => this.gotoPage(this.props.page + 1)} disabled={this.props.page === numPages}>&gt;</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        page: state.searchState.page,
        pageSize: state.searchState.pageSize,
        count: state.searchState.count
    };
}

export default connect(mapStateToProps)(Pagination);