import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSound } from '../../actions/searchActions';
import s from './ResultDetail.css';

class ResultDetail extends Component {
    
    componentWillMount() {
        this.props.dispatch(fetchSound(this.props.soundID));
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.searchState.sounds[nextProps.soundID];
    }
    
    render() {
        console.log(this.props.sounds, this.props.soundID);
        for(let prop in this.props.sounds) {
            console.log(prop, this.props.sounds[prop]);
        }
        
        const sound = this.props.sounds[this.props.soundID];
        console.log(sound);
        return ( <div className={s.root}>ResultDetail</div> );
    }
}

function mapStateToProps(state) {
    return {
        sounds: state.searchState.sounds
    };
}

export default connect(mapStateToProps)(ResultDetail);