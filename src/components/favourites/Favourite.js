import React, { Component } from 'react';
import s from './Favourite.css';

class Favourite extends Component {
    
    render() {
        return (
            <li className={s.root}>{this.props.name}</li>
        );
    }
}

export default Favourite;