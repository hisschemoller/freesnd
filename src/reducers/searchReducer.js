import { INCREASE_SEARCH_COUNT, ADD_SEARCH_HISTORY } from '../actions/searchActions';

const initialState = {
    count: 0,
    history: []
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
        default:
            return state;
    }
}