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

// const initialState = {
//     count: 0,
//     value: ''
// };
// 
// function reducer(state = initialState, action) {
//     switch (action.type) {
//         case 'COUNT':
//             return Object.assign({}, state, {
//                 count: state.count + 1
//             });
//         default:
//             return state;
//     }
// }

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
