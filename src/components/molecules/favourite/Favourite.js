import React, { Component } from 'react';
import s from './Favourite.css';

class Favourite extends Component {
    
    render() {
        return (
            <li className={s.root}>
                <span>{this.props.name}</span>
                <button type="button" onClick={() => this.props.onRemoveButtonClick(this.props.id) }>x</button>
            </li>
        );
    }
}

export default Favourite;
