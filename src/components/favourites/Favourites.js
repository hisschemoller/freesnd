import React, { Component } from 'react';
import { connect } from 'react-redux';
import Favourite from './Favourite';
import s from './Favourites.css';

class Favourites extends Component {
    
    render() {
        return (
            <div className={s.root}>
                <h4 className={s.header}>F</h4>
                <ul className={s.list}>
                    {this.props.favourites.map((sound, i) => (
                        <Favourite 
                            {...sound} 
                            key={sound.id} 
                            active={i === this.props.favIndex} />
                    ))}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        favourites: state.favsState.favourites,
        favIndex: state.favsState.favIndex
    };
}

export default connect(mapStateToProps)(Favourites);