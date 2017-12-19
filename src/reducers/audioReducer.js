import { START_PREVIEW, STOP_PREVIEW, CLEAR_EVENT_QUEUE, PREVIEW_STARTED, PREVIEW_STOPPED } from '../actions/audioActions';

const initialState = {
    events: [],
    isPlaying: false,
    
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case START_PREVIEW:
            return Object.assign({}, state, {
                events: [ ...state.events, {
                    type: action.type,
                    startNormalized: action.startNormalized
                }]
            });
        case STOP_PREVIEW:
            return Object.assign({}, state, {
                events: [ ...state.events, {
                    type: action.type
                }]
            });
        case CLEAR_EVENT_QUEUE:
            return Object.assign({}, state, {
                events: []
            });
        case PREVIEW_STARTED:
            return state;
        case PREVIEW_STOPPED:
            return state;
        default:
            return state;
    }
}
