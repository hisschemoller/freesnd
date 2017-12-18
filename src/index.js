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
import favsReducer from './reducers/favsReducer';
import searchReducer from './reducers/searchReducer';

const reducer = combineReducers({
    audioState: audioReducer,
    favsState: favsReducer,
	searchState: searchReducer
});

const loggerMiddleware = createLogger({
    collapsed: true
});

const api = {
    url: 'https://freesound.org/apiv2/',
    token: '97fXJpalkrThSLwam15I5FZBSqYOHvk3DUbwCj65'
}

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware.withExtraArgument(api),
        loggerMiddleware
    ));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
