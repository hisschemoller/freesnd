import React, { Component } from 'react';
import Favourites from './favourites/Favourites';
import History from './History';
import Pagination from './Pagination';
import Results from './results/Results';
import Search from './Search';
import WebAudio from './WebAudio';


class App extends Component {
    
    render() {
        return (
            <div className="app">
                <WebAudio />
                <div className="lib">
                    <Favourites />
                </div>
                <div className="main">
                    <Search />
                    <Results />
                    <Pagination />
                    <History />
                </div>
            </div>
        );
    }
}

export default App;
