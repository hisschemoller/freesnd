import { ADD_FAVOURITE } from '../actions/favsActions';

const initialState = {
    favourites: [],
    favIndex: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FAVOURITE:
            if (state.favourites.find(sound => sound.id === action.sound.id)) {
                return state;
            } else {
                return Object.assign({}, state, {
                    favourites: [ ...state.favourites, Object.assign({}, action.sound)]
                });
            }
        default:
            return state;
    }
}
