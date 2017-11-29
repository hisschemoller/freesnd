/**
 * Action types
 */
export const PLAY_PREVIEW = 'PLAY_PREVIEW';

/**
 * Action creators
 */
export function playPreview(src) {
    return { type: PLAY_PREVIEW, src };
}