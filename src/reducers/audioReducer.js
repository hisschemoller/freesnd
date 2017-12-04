import { START_PREVIEW, 
    STOP_PREVIEW, 
    CLEAR_EVENT_QUEUE, 
    STORE_PREVIEW_BUFFER, 
    CLEAR_PREVIEW_BUFFER } from '../actions/audioActions';

const initialState = {
    events: [],
    previews: {}
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case START_PREVIEW:
            return Object.assign({}, state, {
                events: [ ...state.events, {
                    type: action.type,
                    src: action.src
                }]
            });
        case STOP_PREVIEW:
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
        case STORE_PREVIEW_BUFFER:
            return state;
        case CLEAR_PREVIEW_BUFFER:
            return state;
        default:
            return state;
    }
}