/**
 * Action types
 */
export const PLAY_PREVIEW = 'PLAY_PREVIEW';
export const CLEAR_EVENT_QUEUE = 'CLEAR_EVENT_QUEUE';

/**
 * Action creators
 */
export function playPreview(src) {
    return { type: PLAY_PREVIEW, src };
}

export function clearEventQueue() {
   return { type: CLEAR_EVENT_QUEUE };
}