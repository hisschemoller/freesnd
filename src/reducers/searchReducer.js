import { INCREASE_SEARCH_COUNT, ADD_SEARCH_HISTORY, RECEIVE_SOUNDS } from '../actions/searchActions';

const initialState = {
    count: 0,
    history: [],
    results: []
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case INCREASE_SEARCH_COUNT:
            return Object.assign({}, state, {
                count: state.count + 1
            });
        case ADD_SEARCH_HISTORY:
            return Object.assign({}, state, {
                history: [ ...state.history, {
                    id: state.count,
                    value: action.queryString
                }]
            });
        case RECEIVE_SOUNDS:
            return Object.assign({}, state, {
                results: action.sounds.results
            });
        default:
            return state;
    }
}