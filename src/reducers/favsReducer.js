import { ADD_FAVOURITE } from '../actions/favsActions';

const initialState = {
    favourites: [],
    favIndex: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FAVOURITE:
            return Object.assign({}, state, {
                favourites: [ ...state.favourites, Object.assign({}, action.sound)]
            });
        default:
            return state;
    }
}
