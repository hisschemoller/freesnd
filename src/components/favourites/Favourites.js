import React, { Component } from 'react';
import { connect } from 'react-redux';
import Favourite from './Favourite';
import s from './Favourites.css';
import { removeFavourite } from '../../actions/favsActions';

class Favourites extends Component {
    
    removeFromFavourites = (id) => {
        this.props.dispatch(removeFavourite(id));
    }
    
    render() {
        return (
            <div className={s.root}>
                <h4 className={s.header}>F</h4>
                <ul className={s.list}>
                    {this.props.favourites.map((sound, i) => (
                        <Favourite 
                            {...sound} 
                            key={sound.id} 
                            active={i === this.props.favIndex} 
                            onRemoveButtonClick={this.removeFromFavourites}/>
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
