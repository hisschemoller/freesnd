import React, { Component } from 'react';
import History from './History';
import Results from './Results/Results';
import Search from './Search';
import WebAudio from './WebAudio';


class App extends Component {
    
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

export default App;
