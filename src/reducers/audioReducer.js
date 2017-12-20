import { START_PREVIEW, STOP_PREVIEW, CLEAR_EVENT_QUEUE, PREVIEW_STARTED, PREVIEW_STOPPED } from '../actions/audioActions';

const initialState = {
    events: [],
    isPlaying: false,
    soundID: null,
    positionNormalized: 0,
    duration: 1
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case START_PREVIEW:
            return Object.assign({}, state, {
                events: [ ...state.events, {
                    type: action.type,
                    soundID: action.soundID,
                    soundPreviewURL: action.soundPreviewURL,
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
            return Object.assign({}, state, {
                isPlaying: true,
                soundID: action.soundID || state.soundID,
                positionNormalized: action.positionNormalized,
                duration: action.duration
            });
        case PREVIEW_STOPPED:
            return Object.assign({}, state, {
                isPlaying: false,
                soundID: action.soundID || state.soundID
            });
        default:
            return state;
    }
}
