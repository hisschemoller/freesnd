/**
 * Action types
 */
export const START_PREVIEW = 'START_PREVIEW';
export const STOP_PREVIEW = 'STOP_PREVIEW';
export const STORE_PREVIEW_BUFFER = 'STORE_PREVIEW_BUFFER';
export const CLEAR_PREVIEW_BUFFER = 'CLEAR_PREVIEW_BUFFER';
export const CLEAR_EVENT_QUEUE = 'CLEAR_EVENT_QUEUE';

/**
 * Action creators
 */
export function startPreview(src) {
    return { type: START_PREVIEW, src };
}

export function stopPreview(src) {
    return { type: STOP_PREVIEW, src };
}

export function storePreviewBuffer(srcUrl, bufferNode) {
    return { type: STORE_PREVIEW_BUFFER, srcUrl, bufferNode };
}

export function clearPreviewBuffer(srcUrl, bufferNode) {
    return { type: CLEAR_PREVIEW_BUFFER, srcUrl, bufferNode };
}

export function clearEventQueue() {
   return { type: CLEAR_EVENT_QUEUE };
}