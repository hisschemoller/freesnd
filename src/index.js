import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './components/App';
import audioReducer from './reducers/audioReducer';
import searchReducer from './reducers/searchReducer';
// import { fetchSounds } from './actions/searchActions'; 

const reducer = combineReducers({
    audioState: audioReducer,
	searchState: searchReducer
});

const loggerMiddleware = createLogger();

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();

// store
//   .dispatch(fetchSounds('wouter'))
//   .then(() => console.log(store.getState()));
