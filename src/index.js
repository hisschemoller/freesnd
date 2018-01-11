import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/es/integration/react'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './components/App';
import audioReducer from './reducers/audioReducer';
import favsReducer from './reducers/favsReducer';
import searchReducer from './reducers/searchReducer';

const loggerMiddleware = createLogger({
    collapsed: true
});

const api = {
    url: 'https://freesound.org/apiv2/',
    token: '97fXJpalkrThSLwam15I5FZBSqYOHvk3DUbwCj65'
}

const configureStore = compose(
    applyMiddleware(
        thunkMiddleware.withExtraArgument(api),
        loggerMiddleware),
)(createStore);

const config = {
    key: 'root',
    storage,
}

const combinedReducer = persistCombineReducers(config, {
    audioState: audioReducer,
    favsState: favsReducer,
    searchState: searchReducer
});

const store = configureStore(combinedReducer);

const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
