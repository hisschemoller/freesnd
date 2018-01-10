/**
 * Action types
 */
export const START_PREVIEW = 'START_PREVIEW';
export const STOP_PREVIEW = 'STOP_PREVIEW';
export const CLEAR_EVENT_QUEUE = 'CLEAR_EVENT_QUEUE';
export const PREVIEW_STARTED = 'PREVIEW_STARTED';
export const PREVIEW_STOPPED = 'PREVIEW_STOPPED';
export const TICK = 'TICK';

/**
 * Action creators
 */

/**
 * Get data from the selected sound to start preview playback.
 * That data is available in another reducer's state.
 * @param {Number} startNormalized Start offset within preview audio.
 */
export function startPreview(startNormalized = 0) {
    return function(dispatch, getState) {
        const state = getState();
        const sound = state.searchState.results[state.searchState.selectedIndex];
        if (sound) {
            dispatch(startPreviewWithData(sound.id, sound.previews['preview-lq-mp3'], startNormalized));
        }
    };
}

export function startPreviewWithData(soundID, soundPreviewURL, startNormalized) {
    return { type: START_PREVIEW, soundID, soundPreviewURL, startNormalized };
}

export function stopPreview() {
    return { type: STOP_PREVIEW };
}

export function clearEventQueue() {
   return { type: CLEAR_EVENT_QUEUE };
}

let timer = null;

export function previewTimerStarted(soundID) {
    return function(dispatch, getState) {
        clearInterval(timer);
        timer = setInterval(() => dispatch(tick()), 100);
        dispatch(previewStarted(soundID));
        dispatch(tick());
    }
}

export function previewStarted(soundID) {
   return { type: PREVIEW_STARTED, soundID };
}

export function previewStopped(soundID) {
    if (timer) {
        clearInterval(timer);
    }
    return { type: PREVIEW_STOPPED, soundID };
}

export function tick() {
   return { type: TICK };
}
