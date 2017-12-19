/**
 * Action types
 */
export const START_PREVIEW = 'START_PREVIEW';
export const STOP_PREVIEW = 'STOP_PREVIEW';
export const CLEAR_EVENT_QUEUE = 'CLEAR_EVENT_QUEUE';

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