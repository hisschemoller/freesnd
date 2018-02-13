import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/es/integration/react'
import queryString from 'query-string';
import router from './router';
import { updateMeta } from './DOMUtils';
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

const context = {};


// Re-render the app when window.location changes
async function onLocationChange(location, action) {
    try {
        const route = await router.resolve({
            ...context,
            pathname: location.pathname,
            query: queryString.parse(location.search)
        });

        ReactDOM.render(
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <App context={context}>{route.component}</App>
                </PersistGate>
            </Provider>,
            document.getElementById('root'),
            () => {
                document.title = route.title;
                updateMeta('description', route.description);
            }
        );
    } catch (error) {
        console.error(error);
    }
}

let currentLocation = window.location;
onLocationChange(currentLocation);