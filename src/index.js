import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import searchReducer from './reducers/searchReducer';

const reducer = combineReducers({
	searchState: searchReducer
});

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
