/**
 * Action types
 */
export const START_PREVIEW = 'START_PREVIEW';
export const STOP_PREVIEW = 'STOP_PREVIEW';
export const CLEAR_EVENT_QUEUE = 'CLEAR_EVENT_QUEUE';
export const PREVIEW_STARTED = 'PREVIEW_STARTED';
export const PREVIEW_STOPPED = 'PREVIEW_STOPPED';

/**
 * Action creators
 */
export function startPreview(soundID, soundPreviewURL, startNormalized) {
    return { type: START_PREVIEW, soundID, soundPreviewURL, startNormalized };
}

export function stopPreview() {
    return { type: STOP_PREVIEW };
}

export function clearEventQueue() {
   return { type: CLEAR_EVENT_QUEUE };
}

export function previewStarted(soundID, positionNormalized, duration) {
   return { type: PREVIEW_STARTED, soundID, positionNormalized, duration };
}

export function previewStopped(soundID) {
   return { type: PREVIEW_STOPPED, soundID };
}