import React, { Component } from 'react';
import History from './History';
import Results from './Results';
import Search from './Search';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Search />
                    <Results />
                <History />
            </div>
        );
    }
}

export default App;
