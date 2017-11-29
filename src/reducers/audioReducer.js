import { PLAY_PREVIEW, CLEAR_EVENT_QUEUE } from '../actions/audioActions';

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
        case CLEAR_EVENT_QUEUE:
            return Object.assign({}, state, {
                events: []
            });
        default:
            return state;
    }
}