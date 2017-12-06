import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stopPreview } from '../actions/audioActions';
import { nextPage, previousPage, fetchSounds } from '../actions/searchActions';
import s from './Pagination.css';

class Pagination extends Component {

    gotoNextPage = () => {
        this.props.dispatch(nextPage());
        this.props.dispatch(fetchSounds());
        this.props.dispatch(stopPreview());
    }

    gotoPreviousPage = () => {
        this.props.dispatch(previousPage());
        this.props.dispatch(fetchSounds());
        this.props.dispatch(stopPreview());
    }
    
    render() {
        const previousClassNames = `${s.previous} ${this.props.previous ? s.active : ''}`;
        const nextClassNames = `${s.next} ${this.props.next ? s.active : ''}`;
        
        return (
            <div className={s.pagination}>
                <button type="button" className={previousClassNames} onClick={this.gotoPreviousPage}>&lt;</button>
                <span>{this.props.page}/{Math.ceil(this.props.count / this.props.pageSize)}</span>
                <button type="button" className={nextClassNames} onClick={this.gotoNextPage}>&gt;</button>
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