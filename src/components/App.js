import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Favourites from './organisms/favourites/Favourites';
// import History from './organisms/history/History';
// import Pagination from './organisms/pagination/Pagination';
// import Results from './organisms/resultslist/ResultsList';
// import Search from './organisms/search/Search';
// import WebAudio from './WebAudio';



class App extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    };
    
    render() {
        console.log('this.props', this.props);
        return React.Children.only(this.props.children);
        // return (
            // <div className="app">
            //     <WebAudio />
            //     <div className="lib">
            //         <Favourites />
            //     </div>
            //     <div className="main">
            //         <Search />
            //         <Results />
            //         <Pagination />
            //         <History />
            //     </div>
            // </div>
        // );
    }
}

export default App;
