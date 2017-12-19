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
export function startPreview(startNormalized) {
    return { type: START_PREVIEW, startNormalized };
}

export function stopPreview() {
    return { type: STOP_PREVIEW };
}

export function clearEventQueue() {
   return { type: CLEAR_EVENT_QUEUE };
}

export function previewStarted(startNormalized, duration) {
   return { type: PREVIEW_STARTED, startNormalized, duration };
}

export function previewStopped() {
   return { type: PREVIEW_STOPPED };
}