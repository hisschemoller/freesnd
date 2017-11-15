import React, { Component } from 'react';
import Results from './Results';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div className="app">
          <Search />
          <Results />
      </div>
    );
  }
}

export default App;
