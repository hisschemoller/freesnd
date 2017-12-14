import { ADD_SEARCH_HISTORY, RECEIVE_SOUNDS, RECEIVE_SOUND, SET_QUERY, SET_SORT, GOTO_PAGE, SELECT_SOUND, NEXT_SOUND, PREVIOUS_SOUND } from '../actions/searchActions';

const initialState = {
    query: '',
    sort: 'score',
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
                history: [ {
                    value: state.query
                }, ...state.history ].slice(0, 10)
            });
        case SET_QUERY:
            return Object.assign({}, state, {
                query: action.query,
                page: 1
            });
        case SET_SORT:
            return Object.assign({}, state, {
                sort: action.sort,
                page: 1
            });
        case GOTO_PAGE:
            return Object.assign({}, state, {
                page: Math.max(1, Math.min(action.page, Math.ceil(state.count / state.pageSize)))
            });
        case SELECT_SOUND:
            return Object.assign({}, state, {
                selectedIndex: action.index
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
        case RECEIVE_SOUND:
            return Object.assign({}, state, {
                results: state.results.map(sound => sound.id === action.sound.id ? action.sound : sound)
            });
            
            
            // const newState = Object.assign({}, state);
            // newState.sounds[action.soundID] = action.sound;
            // return newState;
        default:
            return state;
    }
}