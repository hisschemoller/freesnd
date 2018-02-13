import React from 'react';
import Favourites from '../../organisms/favourites/Favourites';
import History from '../../organisms/history/History';
import Pagination from '../../organisms/pagination/Pagination';
import Results from '../../organisms/resultslist/ResultsList';
import Search from '../../organisms/search/Search';
import WebAudio from '../../WebAudio';

class Browse extends React.Component {
    
    render() {
        // return (<span>App goes here</span>);
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

export default Browse;