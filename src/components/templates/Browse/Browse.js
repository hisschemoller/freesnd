import React from 'react';
import Grid from '../../atoms/Grid/Grid';
import Favourites from '../../organisms/favourites/Favourites';
import History from '../../organisms/history/History';
import Pagination from '../../organisms/pagination/Pagination';
import Results from '../../organisms/resultslist/ResultsList';
import Search from '../../organisms/search/Search';
import WebAudio from '../../WebAudio';
import s from './Browse.css';

class Browse extends React.Component {
    
    render() {
        // return (<span>App goes here</span>);
        return (
            <Grid className={s.root}>
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
            </Grid>
        );
    }
}

export default Browse;