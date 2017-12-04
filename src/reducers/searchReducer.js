import { ADD_SEARCH_HISTORY, RECEIVE_SOUNDS, SET_QUERY, NEXT_PAGE, PREVIOUS_PAGE, NEXT_SOUND, PREVIOUS_SOUND } from '../actions/searchActions';

const initialState = {
    query: '',
    page: 0,
    pageSize: 15,
    count: 0,
    history: [],
    results: [],
    selectedIndex: null
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
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
        case NEXT_SOUND:
            return Object.assign({}, state, {
                selectedIndex: (state.selectedIndex === null) ? 0 : (state.selectedIndex + 1) % state.results.length
            });
        case PREVIOUS_SOUND:
            let index = (state.selectedIndex === null) ? state.results.length - 1 : state.selectedIndex - 1;
            index = (index < 0) ? index += state.results.length : index;
            return Object.assign({}, state, {
                selectedIndex: index
            });
        case RECEIVE_SOUNDS:
            return Object.assign({}, state, {
                count: action.sounds.count,
                results: action.sounds.results,
                selectedIndex: null
            });
        default:
            return state;
    }
}