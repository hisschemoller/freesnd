import { INCREASE_SEARCH_COUNT, ADD_SEARCH_HISTORY, RECEIVE_SOUNDS, SET_QUERY, NEXT_PAGE, PREVIOUS_PAGE } from '../actions/searchActions';

const initialState = {
    query: '',
    page: 0,
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
                    value: action.query
                }]
            });
        case SET_QUERY:
            return Object.assign({}, state, {
                query: action.query,
                page: 1
            });
        case NEXT_PAGE:
            return Object.assign({}, state, {
                page: state.page + 1
            });
        case PREVIOUS_PAGE:
            return Object.assign({}, state, {
                page: Math.max(1, state.page - 1)
            });
        case RECEIVE_SOUNDS:
            return Object.assign({}, state, {
                results: action.sounds.results
            });
        default:
            return state;
    }
}