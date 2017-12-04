import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nextSound, previousSound } from '../actions/searchActions';
import History from './History';
import Results from './Results/Results';
import Search from './Search';
import WebAudio from './WebAudio';


class App extends Component {
    
    componentDidMount() {
        document.addEventListener('keyup', this.onDocumentKeyup);
    }
    
    componentWillUnmount() {
        document.removeEventListener('keyup', this.onDocumentKeyup);
    }
    
    onDocumentKeyup = (e) => {
        switch (e.keyCode) {
            case 38: // up arrow
                this.props.dispatch(previousSound());
                break;
            case 40: // down arrow
                this.props.dispatch(nextSound());
                break;
            default:
                break;
        }
    } 
    
    render() {
        return (
            <div className="app">
                <WebAudio />
                <Search />
                <Results />
                <History />
            </div>
        );
    }
}

export default connect()(App);
