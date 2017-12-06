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
        const numButtons = 4,
            numPages = Math.ceil(this.props.count / this.props.pageSize),
            pagesBefore = [],
            pagesAfter = [];
        
        let firstPageButton = '',
            lastPageButton = '',
            separatorBefore = '',
            separatorAfter = '';
        
        if (this.props.page > numButtons + 1) {
            firstPageButton = <button type="button" onClick={() => this.gotoPage(1)} disabled={numPages === 0}>1</button>;
        }
        
        if (this.props.page < numPages - numButtons - 1) {
            lastPageButton = <button type="button" onClick={() => this.gotoPage(numPages)} disabled={numPages === 0}>{numPages}</button>;
        }
        
        if (this.props.page > numButtons + 2) {
            separatorBefore = <span>...</span>;
        }
        
        if (this.props.page < numPages - numButtons - 2) {
            separatorAfter = <span>...</span>;
        }
        
        for (let i = Math.max(1, this.props.page - numButtons), n = this.props.page; i < n; i++) {
            pagesBefore.push(<button type="button" onClick={() => this.gotoPage(i)} disabled={numPages === 0} key={i}>{i}</button>);
        }
        
        for (let i = Math.min(i + 1, numPages), n = Math.min(i + 1 + numButtons, numPages); i < n; i++) {
            pagesAfter.push(<button type="button" onClick={() => this.gotoPage(i)} disabled={numPages === 0} key={i}>{i}</button>);
        }
        
        return (
            <div className={s.pagination}>
                <button type="button" onClick={() => this.gotoPage(this.props.page - 1)} disabled={this.props.page <= 1}>&lt;</button>
                {firstPageButton}
                {separatorBefore}
                {pagesBefore}
                <span>{this.props.page}</span>
                {pagesAfter}
                {separatorAfter}
                {lastPageButton}
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