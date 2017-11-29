import { PLAY_PREVIEW } from '../actions/audioActions';

const initialState = {
    events: []
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case PLAY_PREVIEW:
            return Object.assign({}, state, {
                events: [ ...state.events, {
                    type: action.type,
                    src: action.src
                }]
            });
        default:
            return state;
    }
}